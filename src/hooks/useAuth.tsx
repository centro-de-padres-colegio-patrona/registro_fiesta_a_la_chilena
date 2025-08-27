import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface Student {
  name: string;
  grade: string;
  rut: string;
  schedule?: string;
}

interface GuardianData {
  guardianName: string;
  students: Student[];
}

interface User {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [guardianData, setGuardianData] = useState<GuardianData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          setUser(session.user as User);
          await fetchGuardianData(session.user.email!);
        }
      } catch (err) {
        console.error('Error checking session:', err);
        setError('Error verificando sesión');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session?.user) {
          setUser(session.user as User);
          await fetchGuardianData(session.user.email!);
        } else {
          setUser(null);
          setGuardianData(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Obtener datos del apoderado desde la API
  const fetchGuardianData = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10e29ee3/guardian/${encodeURIComponent(email)}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGuardianData(data);
        console.log('Guardian data loaded:', data);
      } else {
        console.log('Guardian not found, user may need to be registered in the system');
        setGuardianData(null);
      }
    } catch (err) {
      console.error('Error fetching guardian data:', err);
      setError('Error cargando datos del apoderado');
    } finally {
      setLoading(false);
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
      
      console.log('Google sign in initiated');
      return data;
    } catch (err) {
      console.error('Error signing in with Google:', err);
      setError('Error iniciando sesión con Google');
      setLoading(false);
      throw err;
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setGuardianData(null);
      console.log('User signed out');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Error cerrando sesión');
      throw err;
    }
  };

  // Obtener token de acceso
  const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  };

  // Procesar pago
  const processPayment = async (paymentData: any) => {
    try {
      setError(null);
      const token = await getAccessToken();
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10e29ee3/process-payment`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error procesando pago');
      }

      const result = await response.json();
      console.log('Payment processed successfully:', result.paymentId);
      return result;
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Error procesando el pago');
      throw err;
    }
  };

  return {
    user,
    guardianData,
    loading,
    error,
    signInWithGoogle,
    signOut,
    processPayment,
    getAccessToken
  };
}
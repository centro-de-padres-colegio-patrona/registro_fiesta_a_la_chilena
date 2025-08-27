import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'registration' | 'confirmation'>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  
  const { 
    user, 
    guardianData, 
    loading, 
    error, 
    signInWithGoogle, 
    signOut, 
    processPayment 
  } = useAuth();

  // Inicializar datos de ejemplo al cargar la aplicación
  useEffect(() => {
    const initializeData = async () => {
      try {
        const response = await fetch(
          `https://${await import('./utils/supabase/info').then(m => m.projectId)}.supabase.co/functions/v1/make-server-10e29ee3/init-data`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${await import('./utils/supabase/info').then(m => m.publicAnonKey)}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('Sample data initialized');
      } catch (error) {
        console.log('Error initializing data (may already exist):', error);
      }
    };

    initializeData();
  }, []);

  // Redirigir automáticamente si está autenticado
  useEffect(() => {
    if (user && guardianData && currentScreen === 'login') {
      navigateToScreen('registration');
    }
  }, [user, guardianData, currentScreen]);

  const navigateToScreen = (screen: 'login' | 'registration' | 'confirmation') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 200);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // La navegación se manejará automáticamente en el useEffect
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const handleProceedToPayment = async (purchaseData: any) => {
    try {
      if (!user || !guardianData) {
        throw new Error('Usuario no autenticado o datos faltantes');
      }

      // Preparar datos del pago con información completa
      const paymentData = {
        email: user.email,
        students: guardianData.students,
        quantity: purchaseData.quantity,
        total: purchaseData.total,
        selectedSchedules: guardianData.students.map(student => student.schedule).filter(Boolean),
        hasPendingDebt: purchaseData.hasPendingDebt,
        pendingDebt: purchaseData.pendingDebt
      };

      const result = await processPayment(paymentData);
      setPaymentResult(result);
      navigateToScreen('confirmation');
    } catch (error) {
      console.error('Error procesando pago:', error);
      alert('Error procesando el pago. Por favor intenta nuevamente.');
    }
  };

  const handleBackToLogin = async () => {
    await signOut();
    setPaymentResult(null);
    navigateToScreen('login');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onGoogleLogin={handleGoogleLogin}
            error={error}
            loading={loading}
          />
        );
      case 'registration':
        if (!user || !guardianData) {
          return (
            <LoginScreen 
              onGoogleLogin={handleGoogleLogin}
              error="Por favor inicia sesión para continuar"
              loading={loading}
            />
          );
        }
        return (
          <RegistrationScreen 
            userInfo={{
              guardianName: guardianData.guardianName,
              students: guardianData.students
            }}
            onProceedToPayment={handleProceedToPayment}
            onSignOut={handleBackToLogin}
          />
        );
      case 'confirmation':
        if (!paymentResult) {
          navigateToScreen('login');
          return null;
        }
        return (
          <ConfirmationScreen 
            paymentResult={paymentResult}
            guardianData={guardianData}
            onBackToLogin={handleBackToLogin}
          />
        );
      default:
        return <LoginScreen onGoogleLogin={handleGoogleLogin} error={error} loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen bg-background montserrat-regular">
      <div 
        className={`page-transition ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100 fade-in'}`}
        style={{
          transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
        }}
      >
        {renderCurrentScreen()}
      </div>
    </div>
  );
}
import React from 'react';
import { Button } from './ui/button';
import backgroundImage from 'figma:asset/2b69842406b081642813ed9577f3a813aa11c3f8.png';
import centroPadresLogo from 'figma:asset/429226a720cfb4705d813cb886704ec2bdce1d00.png';

interface LoginScreenProps {
  onGoogleLogin: () => void;
}

export function LoginScreen({ onGoogleLogin }: LoginScreenProps) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative slide-in-up"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay reducido para mostrar mejor el fondo */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Logo y título */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src={centroPadresLogo} 
              alt="Centro de Padres Colegio Patrona de Lourdes" 
              className="w-24 h-24 md:w-28 md:h-28 drop-shadow-xl smooth-transition hover:scale-105"
            />
          </div>
          <div className="space-y-3">
            <h1 className="montserrat-black text-red-600 drop-shadow-lg">
              Fiesta a la Chilena
            </h1>
            <p className="montserrat-semibold text-blue-600 drop-shadow-md">
              Colegio Patrona de Lourdes 2025
            </p>
            <p className="montserrat-light secondary-text text-gray-800 drop-shadow-sm">
              Sistema de registro para el evento
            </p>
          </div>
        </div>

        {/* Información del evento */}
        <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-2xl border-0 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="montserrat-semibold text-gray-800">
              Información del Evento
            </h3>
            <div className="space-y-1 montserrat-regular text-gray-600">
              <p>📅 <span className="montserrat-medium">Viernes 6 de Septiembre, 2025</span></p>
              <p>📍 <span className="montserrat-medium">Alicahue # 7370, La Florida</span></p>
              <p>🎉 <span className="montserrat-medium">Celebración de Fiestas Patrias</span></p>
            </div>
          </div>
        </div>

        {/* Botón de login */}
        <div className="space-y-4">
          <Button
            onClick={onGoogleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg shadow-xl hover:shadow-2xl smooth-transition montserrat-semibold"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Ingresar con Google</span>
            </div>
          </Button>
          
          <p className="text-center montserrat-light help-text text-gray-800 drop-shadow-sm">
            Inicia sesión para acceder al sistema de registro
          </p>
        </div>

        {/* Información adicional */}
        <div className="text-center space-y-2">
          <p className="montserrat-light help-text text-gray-800">
            ¿Necesitas ayuda? Contacta a la secretaría del colegio
          </p>
          <p className="montserrat-medium text-blue-600 drop-shadow-sm">
            📞 +56 2 1234 5678
          </p>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import backgroundImage from 'figma:asset/2b69842406b081642813ed9577f3a813aa11c3f8.png';
import centroPadresLogo from 'figma:asset/429226a720cfb4705d813cb886704ec2bdce1d00.png';

export function LoadingScreen() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 text-center space-y-6">
        {/* Logo animado */}
        <div className="flex justify-center">
          <img 
            src={centroPadresLogo} 
            alt="Centro de Padres Colegio Patrona de Lourdes" 
            className="w-24 h-24 md:w-28 md:h-28 drop-shadow-xl animate-pulse"
          />
        </div>
        
        {/* Título */}
        <div className="space-y-2">
          <h1 className="montserrat-black text-red-600 drop-shadow-lg">
            Fiesta a la Chilena
          </h1>
          <p className="montserrat-semibold text-blue-600 drop-shadow-md">
            Colegio Patrona de Lourdes 2025
          </p>
        </div>

        {/* Spinner de carga */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        
        <p className="montserrat-light text-gray-800 drop-shadow-sm">
          Cargando sistema de registro...
        </p>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'registration' | 'confirmation'>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userInfo, setUserInfo] = useState({
    guardianName: 'María González',
    studentName: 'Sofía González'
  });
  const [purchaseData, setPurchaseData] = useState({
    quantity: 1,
    pricePerTicket: 15000,
    hasPendingDebt: false,
    pendingDebt: 5000,
    selectedSchedule: undefined as string | undefined
  });

  const navigateToScreen = (screen: 'login' | 'registration' | 'confirmation') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 200);
  };

  const handleGoogleLogin = () => {
    navigateToScreen('registration');
  };

  const handleProceedToPayment = (data: any) => {
    setPurchaseData(data);
    navigateToScreen('confirmation');
  };

  const handleBackToLogin = () => {
    navigateToScreen('login');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onGoogleLogin={handleGoogleLogin} />;
      case 'registration':
        return (
          <RegistrationScreen 
            userInfo={userInfo}
            onProceedToPayment={handleProceedToPayment}
            initialData={purchaseData}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen 
            purchaseData={purchaseData}
            onBackToLogin={handleBackToLogin}
          />
        );
      default:
        return <LoginScreen onGoogleLogin={handleGoogleLogin} />;
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
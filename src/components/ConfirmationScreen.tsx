import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle, QrCode } from 'lucide-react';
import backgroundImage from 'figma:asset/2b69842406b081642813ed9577f3a813aa11c3f8.png';
import centroPadresLogo from 'figma:asset/429226a720cfb4705d813cb886704ec2bdce1d00.png';

interface PurchaseData {
  quantity: number;
  pricePerTicket: number;
  hasPendingDebt: boolean;
  pendingDebt: number;
  selectedSchedule?: string;
}

interface ConfirmationScreenProps {
  purchaseData: PurchaseData;
  onBackToLogin: () => void;
}

export function ConfirmationScreen({ purchaseData, onBackToLogin }: ConfirmationScreenProps) {
  const total = purchaseData.hasPendingDebt 
    ? (purchaseData.quantity * purchaseData.pricePerTicket) + purchaseData.pendingDebt
    : purchaseData.quantity * purchaseData.pricePerTicket;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Simulated QR Code - En una implementación real, esto sería generado dinámicamente
  const qrCodeData = `FIESTA-CHILENA-${Date.now()}-${purchaseData.selectedSchedule || 'NO-SCHEDULE'}`;

  return (
    <div 
      className="min-h-screen p-4 md:p-6 relative slide-in-up"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay reducido para mostrar mejor el fondo */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-md mx-auto space-y-8">
        {/* Ícono de éxito */}
        <div className="text-center fade-in">
          <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto mb-6 smooth-transition drop-shadow-lg" />
          <h1 className="montserrat-black text-green-600 mb-2 drop-shadow-lg">
            ¡Listo! Tu compra fue exitosa
          </h1>
          <p className="montserrat-medium text-gray-800 drop-shadow-sm">
            Has adquirido <span className="montserrat-bold data-numbers">{purchaseData.quantity}</span> entrada{purchaseData.quantity !== 1 ? 's' : ''} por <span className="montserrat-bold data-numbers text-green-600">{formatCurrency(total)}</span>
          </p>
        </div>

        {/* Código QR */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="montserrat-semibold text-gray-800">
              Tu código de acceso
            </h2>
            
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 mx-auto bg-gray-100/90 border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center smooth-transition hover:bg-gray-50/90 backdrop-blur-sm">
              <QrCode className="w-16 h-16 text-gray-400 mb-2" />
              <div className="text-xs text-gray-500 font-mono px-4 text-center break-all montserrat-light">
                {qrCodeData}
              </div>
            </div>

            {/* Horario seleccionado */}
            {purchaseData.selectedSchedule && (
              <div className="p-3 bg-blue-50/90 border border-blue-200 rounded-lg fade-in backdrop-blur-sm">
                <p className="montserrat-medium text-blue-700 mb-1">Tu horario asignado:</p>
                <p className="montserrat-bold text-blue-800 data-numbers">
                  {purchaseData.selectedSchedule.replace('-', ' - ')}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="montserrat-semibold text-gray-800">Instrucciones importantes:</p>
              <ul className="text-left space-y-1 max-w-xs mx-auto montserrat-regular secondary-text">
                <li>• Presenta este código QR en la entrada del evento</li>
                <li>• Guarda una captura de pantalla como respaldo</li>
                <li>• El código es válido por una sola entrada</li>
                <li>• Llega 15 min antes del horario de tu curso</li>
                {purchaseData.selectedSchedule && (
                  <li className="text-blue-600 montserrat-medium">
                    • Tu horario: <span className="montserrat-semibold">{purchaseData.selectedSchedule.replace('-', ' - ')}</span>
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card className="shadow-2xl border-0 bg-red-50/85 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardContent className="p-4 text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src={centroPadresLogo} 
                alt="Centro de Padres Colegio Patrona de Lourdes" 
                className="w-12 h-12 drop-shadow-md smooth-transition hover:scale-105"
              />
            </div>
            <div>
              <h3 className="montserrat-bold text-red-700 mb-2 drop-shadow-sm">Fiesta a la Chilena</h3>
              <p className="montserrat-semibold text-red-600 drop-shadow-sm">
                Colegio Patrona de Lourdes 2025
              </p>
              <div className="montserrat-medium text-red-600 mt-2 space-y-1">
                <p>📅 <span className="montserrat-semibold">Viernes 6 de Septiembre, 2025</span></p>
                <p>📍 <span className="montserrat-semibold">Alicahue # 7370, La Florida</span></p>
                <p>🕘 <span className="montserrat-semibold">Consulta el itinerario por curso</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón para volver */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onBackToLogin}
            className="border-blue-600 text-blue-600 hover:bg-blue-50/80 bg-white/90 shadow-xl smooth-transition hover:shadow-2xl montserrat-semibold backdrop-blur-sm"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
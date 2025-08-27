import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, QrCode, Download, Users, Clock, CreditCard } from 'lucide-react';
import backgroundImage from 'figma:asset/2b69842406b081642813ed9577f3a813aa11c3f8.png';
import centroPadresLogo from 'figma:asset/429226a720cfb4705d813cb886704ec2bdce1d00.png';

interface Student {
  name: string;
  grade: string;
  schedule?: string;
}

interface GuardianData {
  guardianName: string;
  students: Student[];
}

interface PaymentResult {
  success: boolean;
  paymentId: string;
  qrData: {
    paymentId: string;
    guardianEmail: string;
    students: Student[];
    quantity: number;
    total: number;
    eventDate: string;
    venue: string;
    timestamp: string;
  };
  paymentIntegrationNote: string;
}

interface ConfirmationScreenProps {
  paymentResult: PaymentResult;
  guardianData: GuardianData | null;
  onBackToLogin: () => void;
}

export function ConfirmationScreen({ paymentResult, guardianData, onBackToLogin }: ConfirmationScreenProps) {
  const [showIntegrationInfo, setShowIntegrationInfo] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generar string para QR con toda la información
  const qrCodeString = JSON.stringify({
    id: paymentResult.qrData.paymentId,
    guardian: paymentResult.qrData.guardianEmail,
    students: paymentResult.qrData.students.map(s => ({
      name: s.name,
      grade: s.grade,
      schedule: s.schedule
    })),
    tickets: paymentResult.qrData.quantity,
    total: paymentResult.qrData.total,
    event: 'Fiesta a la Chilena 2025',
    date: paymentResult.qrData.eventDate,
    venue: paymentResult.qrData.venue,
    issued: paymentResult.qrData.timestamp
  });

  const downloadQR = () => {
    // En una implementación real, aquí generarías un QR code real
    const element = document.createElement('a');
    const file = new Blob([qrCodeString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `entrada-fiesta-chilena-${paymentResult.qrData.paymentId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
      
      <div className="relative z-10 max-w-lg mx-auto space-y-6">
        {/* Ícono de éxito */}
        <div className="text-center fade-in">
          <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto mb-6 smooth-transition drop-shadow-lg" />
          <h1 className="montserrat-black text-green-600 mb-2 drop-shadow-lg">
            ¡Pago Exitoso!
          </h1>
          <p className="montserrat-medium text-gray-800 drop-shadow-sm">
            Has adquirido <span className="montserrat-bold data-numbers">{paymentResult.qrData.quantity}</span> entrada{paymentResult.qrData.quantity !== 1 ? 's' : ''} por <span className="montserrat-bold data-numbers text-green-600">{formatCurrency(paymentResult.qrData.total)}</span>
          </p>
          <p className="montserrat-light text-gray-600 mt-2">
            ID de Pago: <span className="montserrat-medium">{paymentResult.qrData.paymentId}</span>
          </p>
        </div>

        {/* Información del apoderado y estudiantes */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader>
            <CardTitle className="montserrat-semibold text-gray-800 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Información de Entrada</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="montserrat-light secondary-text">Apoderado:</p>
                <p className="montserrat-semibold">{guardianData?.guardianName}</p>
                <p className="montserrat-light text-gray-500">{paymentResult.qrData.guardianEmail}</p>
              </div>
              
              <div>
                <p className="montserrat-light secondary-text mb-2">Estudiantes y Horarios:</p>
                {paymentResult.qrData.students.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50/80 rounded border">
                    <div>
                      <p className="montserrat-medium">{student.name}</p>
                      <p className="montserrat-light text-gray-600">{student.grade}</p>
                    </div>
                    {student.schedule && (
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <p className="montserrat-light text-blue-600 text-sm">
                            {student.schedule.replace('-', ' - ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Código QR */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader>
            <CardTitle className="montserrat-semibold text-gray-800 flex items-center space-x-2">
              <QrCode className="w-5 h-5" />
              <span>Tu Código de Acceso</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {/* QR Code Placeholder */}
            <div className="w-56 h-56 mx-auto bg-gray-100/90 border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center smooth-transition hover:bg-gray-50/90 backdrop-blur-sm">
              <QrCode className="w-20 h-20 text-gray-400 mb-3" />
              <div className="text-xs text-gray-500 font-mono px-4 text-center break-all montserrat-light max-h-16 overflow-hidden">
                {paymentResult.qrData.paymentId}
              </div>
            </div>

            <div className="space-y-3">
              <p className="montserrat-semibold text-gray-800">Instrucciones importantes:</p>
              <ul className="text-left space-y-2 montserrat-regular secondary-text">
                <li>• Presenta este código QR en la entrada del evento</li>
                <li>• Guarda una captura de pantalla como respaldo</li>
                <li>• El código incluye información de todos tus estudiantes</li>
                <li>• Válido para {paymentResult.qrData.quantity} entrada{paymentResult.qrData.quantity !== 1 ? 's' : ''}</li>
                <li className="text-blue-600 montserrat-medium">
                  • Múltiples horarios: Podrás acceder en cualquiera de los horarios asignados
                </li>
              </ul>
              
              <Button
                onClick={downloadQR}
                variant="outline"
                className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50/80 montserrat-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar información del QR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Información del evento */}
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
                <p>📍 <span className="montserrat-semibold">{paymentResult.qrData.venue}</span></p>
                <p>🎫 <span className="montserrat-semibold">Compra realizada: {formatDate(paymentResult.qrData.timestamp)}</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información sobre integración de pagos */}
        <Card className="shadow-2xl border-0 bg-blue-50/85 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader>
            <Button
              variant="ghost"
              onClick={() => setShowIntegrationInfo(!showIntegrationInfo)}
              className="w-full justify-between p-0 h-auto text-left"
            >
              <CardTitle className="montserrat-semibold text-blue-700 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Información para Desarrolladores</span>
              </CardTitle>
              <span className="text-blue-600">{showIntegrationInfo ? '−' : '+'}</span>
            </Button>
          </CardHeader>
          {showIntegrationInfo && (
            <CardContent className="pt-0 fade-in">
              <div className="bg-white/80 p-4 rounded-lg border border-blue-200">
                <p className="montserrat-semibold text-blue-800 mb-2">Integración de Pasarela de Pagos:</p>
                <div className="text-xs montserrat-light text-blue-700 space-y-2">
                  <p><strong>WebPay Plus (Transbank):</strong></p>
                  <code className="block bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    POST https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions
                  </code>
                  
                  <p><strong>Flow:</strong></p>
                  <code className="block bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    POST https://www.flow.cl/api/payment/create
                  </code>
                  
                  <p><strong>Mercado Pago:</strong></p>
                  <code className="block bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    POST https://api.mercadopago.com/checkout/preferences
                  </code>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Botón para volver */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onBackToLogin}
            className="border-blue-600 text-blue-600 hover:bg-blue-50/80 bg-white/90 shadow-xl smooth-transition hover:shadow-2xl montserrat-semibold backdrop-blur-sm"
          >
            Finalizar y Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
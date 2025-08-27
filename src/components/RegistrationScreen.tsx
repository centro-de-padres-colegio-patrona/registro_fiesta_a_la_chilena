import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Minus, Plus, User, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { EventSchedule } from './EventSchedule';
import backgroundImage from 'figma:asset/2b69842406b081642813ed9577f3a813aa11c3f8.png';
import centroPadresLogo from 'figma:asset/429226a720cfb4705d813cb886704ec2bdce1d00.png';

interface UserInfo {
  guardianName: string;
  studentName: string;
}

interface PurchaseData {
  quantity: number;
  pricePerTicket: number;
  hasPendingDebt: boolean;
  pendingDebt: number;
  selectedSchedule?: string;
}

interface RegistrationScreenProps {
  userInfo: UserInfo;
  onProceedToPayment: (data: PurchaseData) => void;
  initialData: PurchaseData;
}

export function RegistrationScreen({ userInfo, onProceedToPayment, initialData }: RegistrationScreenProps) {
  const [quantity, setQuantity] = useState(initialData.quantity);
  const [hasPendingDebt, setHasPendingDebt] = useState(initialData.hasPendingDebt);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<string | undefined>(initialData.selectedSchedule);
  
  const pricePerTicket = 15000;
  const pendingDebt = 5000;
  const subtotal = quantity * pricePerTicket;
  const total = hasPendingDebt ? subtotal + pendingDebt : subtotal;

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
  };

  const handleProceedToPayment = () => {
    if (!selectedSchedule) {
      alert('Por favor selecciona un horario antes de proceder al pago.');
      setShowSchedule(true);
      return;
    }
    
    onProceedToPayment({
      quantity,
      pricePerTicket,
      hasPendingDebt,
      pendingDebt,
      selectedSchedule
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
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
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        {/* Header con datos del usuario */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader className="pb-4">
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={centroPadresLogo} 
                alt="Centro de Padres Colegio Patrona de Lourdes" 
                className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg smooth-transition hover:scale-105"
              />
              <div className="text-center">
                <CardTitle className="text-red-600 montserrat-black drop-shadow-lg">
                  Fiesta a la Chilena
                </CardTitle>
                <p className="montserrat-semibold text-blue-600 drop-shadow-md">
                  Colegio Patrona de Lourdes 2025
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50/90 rounded-lg smooth-transition hover:bg-gray-100/90">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="montserrat-light secondary-text">Curso</p>
                  <p className="montserrat-semibold">{userInfo.guardianName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50/90 rounded-lg smooth-transition hover:bg-gray-100/90">
                <GraduationCap className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="montserrat-light secondary-text">Seccion</p>
                  <p className="montserrat-semibold">{userInfo.studentName}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección del itinerario (expandible) */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader className="pb-2">
            <Button
              variant="ghost"
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full justify-between p-0 h-auto text-left smooth-transition hover:bg-blue-50/80"
            >
              <CardTitle className="montserrat-semibold text-blue-600 drop-shadow-sm">
                Ver Itinerario del Evento
              </CardTitle>
              {showSchedule ? (
                <ChevronUp className="w-5 h-5 text-blue-600 smooth-transition" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600 smooth-transition" />
              )}
            </Button>
          </CardHeader>
          {showSchedule && (
            <CardContent className="pt-0 fade-in">
              <EventSchedule 
                selectedSchedule={selectedSchedule}
                onScheduleSelect={setSelectedSchedule}
              />
            </CardContent>
          )}
        </Card>

        {/* Selector de entradas */}
        {/*
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader>
            
            <p className="montserrat-light secondary-text">
              Adquiere tus entradas para participar en la celebración patria
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {// Contador de entradas }
            <div className="flex items-center justify-between p-4 bg-gray-50/90 rounded-lg smooth-transition hover:bg-gray-100/90">
              <div>
                <h3 className="montserrat-semibold">Entrada General</h3>
                <p className="montserrat-medium price-display text-blue-600">{formatCurrency(pricePerTicket)} c/u</p>
                <p className="montserrat-light help-text">Incluye acceso a todas las actividades</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 0}
                  className="w-8 h-8 p-0 border-blue-600 text-blue-600 hover:bg-blue-50/80 smooth-transition montserrat-semibold"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="montserrat-bold data-numbers text-xl w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 p-0 border-blue-600 text-blue-600 hover:bg-blue-50/80 smooth-transition montserrat-semibold"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {// Toggle para deuda pendiente //}
            <div className="flex items-center justify-between">
              <span className="montserrat-regular">¿Tienes deuda pendiente?</span>
              <Button
                variant={hasPendingDebt ? "default" : "outline"}
                size="sm"
                onClick={() => setHasPendingDebt(!hasPendingDebt)}
                className={`smooth-transition montserrat-semibold ${
                  hasPendingDebt 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "border-blue-600 text-blue-600 hover:bg-blue-50/80"
                }`}
              >
                {hasPendingDebt ? "Sí" : "No"}
              </Button>
            </div>

            <Separator />

            {// Desglose de costos }
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="montserrat-regular">Subtotal ({quantity} entrada{quantity !== 1 ? 's' : ''})</span>
                <span className="montserrat-semibold">{formatCurrency(subtotal)}</span>
              </div>
              
              {hasPendingDebt && (
                <div className="flex justify-between items-center text-blue-600">
                  <span className="montserrat-regular">Deuda Pendiente</span>
                  <span className="montserrat-semibold">{formatCurrency(pendingDebt)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg">
                <span className="montserrat-semibold">Total</span>
                <span className="montserrat-black data-numbers text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {// Estado del horario seleccionado }
            {selectedSchedule && (
              <div className="p-3 bg-green-50/90 border border-green-200 rounded-lg fade-in backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="montserrat-medium text-green-700">
                    Horario seleccionado: <span className="montserrat-semibold">{selectedSchedule.replace('-', ' - ')}</span>
                  </span>
                </div>
              </div>
            )}

            {//* Botón de pago }
            <Button
              onClick={handleProceedToPayment}
              disabled={quantity <= 0}
              className={`w-full py-3 text-lg shadow-xl hover:shadow-2xl smooth-transition montserrat-semibold ${
                !selectedSchedule 
                  ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {!selectedSchedule ? 'Selecciona un horario primero' : `Ir a Pagar ${formatCurrency(total)}`}
            </Button>
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  );
}
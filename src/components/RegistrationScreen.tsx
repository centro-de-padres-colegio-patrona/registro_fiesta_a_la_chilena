import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Minus, Plus, User, GraduationCap, ChevronDown, ChevronUp, LogOut, Clock } from 'lucide-react';
import { EventSchedule } from './EventSchedule';
import backgroundImage from 'figma:asset/2b69842406b081642813ed9577f3a813aa11c3f8.png';
import centroPadresLogo from 'figma:asset/429226a720cfb4705d813cb886704ec2bdce1d00.png';

interface Student {
  name: string;
  grade: string;
  rut: string;
  schedule?: string;
}

interface UserInfo {
  guardianName: string;
  students: Student[];
}

interface PurchaseData {
  quantity: number;
  total: number;
  hasPendingDebt: boolean;
  pendingDebt: number;
}

interface RegistrationScreenProps {
  userInfo: UserInfo;
  onProceedToPayment: (data: PurchaseData) => void;
  onSignOut: () => void;
}

export function RegistrationScreen({ userInfo, onProceedToPayment, onSignOut }: RegistrationScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [hasPendingDebt, setHasPendingDebt] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  
  const pricePerTicket = 15000;
  const pendingDebt = 5000;
  const subtotal = quantity * pricePerTicket;
  const total = hasPendingDebt ? subtotal + pendingDebt : subtotal;

  // Obtener horarios únicos de todos los estudiantes
  const uniqueSchedules = [...new Set(userInfo.students.map(s => s.schedule).filter(Boolean))];

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleProceedToPayment = () => {
    onProceedToPayment({
      quantity,
      total,
      hasPendingDebt,
      pendingDebt
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
              <div className="flex items-center justify-between w-full">
                <img 
                  src={centroPadresLogo} 
                  alt="Centro de Padres Colegio Patrona de Lourdes" 
                  className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg smooth-transition hover:scale-105"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSignOut}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 smooth-transition montserrat-regular"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </div>
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
            <div className="space-y-4">
              {/* Información del apoderado */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50/90 rounded-lg smooth-transition hover:bg-gray-100/90">
                <User className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="montserrat-light secondary-text">Apoderado</p>
                  <p className="montserrat-semibold">{userInfo.guardianName}</p>
                </div>
              </div>
              
              {/* Lista de estudiantes */}
              <div className="space-y-2">
                <p className="montserrat-medium text-gray-700">Estudiantes:</p>
                {userInfo.students.map((student, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50/90 rounded-lg border border-blue-200 smooth-transition hover:bg-blue-100/90">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="montserrat-semibold text-blue-800">{student.name}</p>
                      <p className="montserrat-regular text-blue-600">{student.grade}</p>
                      {student.schedule && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <p className="montserrat-light text-blue-500 text-sm">
                            {student.schedule.replace('-', ' - ')}
                          </p>
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="montserrat-light">
                      {student.rut}
                    </Badge>
                  </div>
                ))}
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
                Ver Itinerario Completo del Evento
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
                selectedSchedules={uniqueSchedules}
                readOnly={true}
              />
            </CardContent>
          )}
        </Card>

        {/* Horarios asignados automáticamente */}
        {uniqueSchedules.length > 0 && (
          <Card className="shadow-2xl border-0 bg-green-50/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
            <CardHeader>
              <CardTitle className="montserrat-semibold text-green-700">
                Horarios Asignados Automáticamente
              </CardTitle>
              <p className="montserrat-light text-green-600">
                Basado en los cursos de tus estudiantes
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {uniqueSchedules.map((schedule, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="montserrat-medium text-green-800">
                    {schedule?.replace('-', ' - ')}
                  </span>
                </div>
              ))}
              <p className="montserrat-light text-green-600 text-sm">
                ✓ No necesitas seleccionar horarios manualmente
              </p>
            </CardContent>
          </Card>
        )}

        {/* Selector de entradas */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md smooth-transition hover:shadow-3xl">
          <CardHeader>
            <CardTitle className="montserrat-semibold">Seleccionar Entradas</CardTitle>
            <p className="montserrat-light secondary-text">
              Adquiere tus entradas para participar en la celebración patria
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contador de entradas */}
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
                  disabled={quantity <= 1}
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

            {/* Toggle para deuda pendiente */}
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

            {/* Desglose de costos */}
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

            {/* Botón de pago */}
            <Button
              onClick={handleProceedToPayment}
              className="w-full py-3 text-lg shadow-xl hover:shadow-2xl smooth-transition montserrat-semibold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Proceder al Pago {formatCurrency(total)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
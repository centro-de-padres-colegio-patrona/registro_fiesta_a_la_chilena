import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Calendar } from 'lucide-react';

function ScheduleItem({ 
  time, 
  grade, 
  details, 
  isSelected, 
  onClick 
}: { 
  time: string; 
  grade: string; 
  details?: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-1 p-4 rounded-lg smooth-transition text-left w-full backdrop-blur-sm ${
        isSelected 
          ? 'bg-blue-600 text-white shadow-xl scale-105' 
          : 'bg-white/85 border-2 border-blue-200 text-blue-600 hover:bg-blue-50/90 hover:border-blue-300'
      }`}
    >
      <div className="montserrat-semibold leading-tight">
        <span className="montserrat-bold data-numbers">{time}</span> {grade}
      </div>
      {details && (
        <div className={`montserrat-light ${isSelected ? 'opacity-90' : 'opacity-70'}`}>
          • {details}
        </div>
      )}
    </button>
  );
}

interface EventScheduleProps {
  selectedSchedule?: string;
  onScheduleSelect: (schedule: string) => void;
}

export function EventSchedule({ selectedSchedule, onScheduleSelect }: EventScheduleProps) {
  const scheduleItems = [
    { time: "9:30", grade: "Pre-Kinder y Kinder", details: "Receso a las 10:00" },
    { time: "10:20", grade: "3° y 4° Básicos", details: "10:50 Receso" },
    { time: "11:10", grade: "1° a 3° Medio A", details: "Receso a las 11:40" },
    { time: "12:00", grade: "1° y 2° Básicos", details: "Cierre de colegio de 12:30 hasta las 14:00" },
    { time: "14:10", grade: "5° y 6° Básicos", details: "Receso a las 16:40" },
    { time: "14:30", grade: "1° a 3° Medio B", details: "Receso a las 15:00" },
    { time: "15:20", grade: "7° y 8° Básicos", details: "Receso a las 15:50" },
    { time: "17:00", grade: "4° Medio A y 4° Medio B" }
  ];

  return (
    <div className="space-y-6">
      {/* Información del evento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-gray-50/85 rounded-lg smooth-transition hover:bg-gray-100/90 backdrop-blur-sm">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div>
            <p className="montserrat-light secondary-text">Lugar:</p>
            <p className="montserrat-semibold">Alicahue # 7370, La Florida</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50/85 rounded-lg smooth-transition hover:bg-gray-100/90 backdrop-blur-sm">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div>
            <p className="montserrat-light secondary-text">Fecha:</p>
            <p className="montserrat-semibold">6 de Septiembre, 2025</p>
          </div>
        </div>
      </div>

      {/* Horarios */}
      <div className="space-y-4">
        <div className="grid gap-3">
          {scheduleItems.map((item, index) => {
            const scheduleId = `${item.time}-${item.grade}`;
            return (
              <ScheduleItem
                key={index}
                time={item.time}
                grade={item.grade}
                details={item.details}
                isSelected={selectedSchedule === scheduleId}
                onClick={() => onScheduleSelect(scheduleId)}
              />
            );
          })}
        </div>
      </div>

      {/* Nota importante */}
      <div className="bg-blue-50/85 border-l-4 border-blue-400 p-4 rounded smooth-transition hover:bg-blue-100/90 backdrop-blur-sm">
        <p className="montserrat-regular text-blue-700">
          <span className="montserrat-bold">Importante:</span> Por favor, llegue 15 minutos antes del horario asignado a su curso.
          En caso de duda sobre el horario, consulte con la secretaría del colegio.
        </p>
      </div>
    </div>
  );
}
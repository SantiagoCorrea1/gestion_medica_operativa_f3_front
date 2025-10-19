'use client';

import { useState, useEffect } from 'react';
import { TimeSlotManager } from "@/app/modules/horario/components/TimeSlotManager";
import { mockTimeSlots, TimeSlot } from '@/app/modules/horario/components/data';


export default function HorarioPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDemoData(false);
      try {
        // --- GUÍA DE INTEGRACIÓN BACKEND ---
        // El endpoint '/api/timeslots' debe devolver un array de objetos `TimeSlot`.
        // Cada objeto debe coincidir con la nueva estructura de props:
        // {
        //   "idDisponibilidad": number, "idProfesional": number, "nombreProfesional": string,
        //   "nombreEspecialidad": string, "horaFranja": string, "numeroConsultorio": number | string,
        //   "activa": boolean, "date": string (YYYY-MM-DD)
        // }
        // const response = await fetch('/api/timeslots');
        // const data = await response.json(); // data: TimeSlot[]
        // setTimeSlots(data);

        // Por ahora, simulamos un fallo para mostrar los datos de prueba.
        throw new Error("Backend no disponible, usando datos de prueba.");
      } catch (error) {
        console.warn(error);
        setTimeSlots(mockTimeSlots);
        setIsDemoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TimeSlotManager timeSlots={timeSlots} setTimeSlots={setTimeSlots} isLoading={isLoading} isDemoData={isDemoData} />
  );
}
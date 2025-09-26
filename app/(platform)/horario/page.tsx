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
        // --- SIMULACIÓN DE FETCH ---
        // Aquí iría la llamada real al backend, por ejemplo:
        // const response = await fetch('/api/timeslots');
        // if (!response.ok) throw new Error('Fallo al cargar las franjas horarias');
        // const data = await response.json();
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
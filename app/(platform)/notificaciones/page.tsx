'use client';

import { useState, useEffect } from 'react';
import { NotificationCenter } from "@/app/modules/notificaciones/components/NotificationCenter";
import { mockNotificationLogs, NotificationLog } from '@/app/modules/notificaciones/components/data';

export default function NotificacionesPage() {
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDemoData(false);
      try {
        // --- SIMULACIÓN DE FETCH ---
        // Aquí iría la llamada real al backend, por ejemplo:
        // const response = await fetch('/api/notifications/logs');
        // if (!response.ok) throw new Error('Fallo al cargar el historial de notificaciones');
        // const data = await response.json();
        // setNotificationLogs(data);

        // Por ahora, simulamos un fallo para mostrar los datos de prueba.
        throw new Error("Backend no disponible, usando datos de prueba.");
      } catch (error) {
        console.warn(error);
        setNotificationLogs(mockNotificationLogs);
        setIsDemoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NotificationCenter
      notificationLogs={notificationLogs}
      setNotificationLogs={setNotificationLogs}
      isLoading={isLoading}
      isDemoData={isDemoData} timeSlots={[]}    />
  );
}
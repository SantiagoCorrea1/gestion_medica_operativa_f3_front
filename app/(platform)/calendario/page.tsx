'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { TimeSlot } from '@/app/modules/horario/components/data';
import { CalendarFilters } from '@/app/modules/calendario/components/CalendarFilters';
import { CalendarGrid } from '@/app/modules/calendario/components/CalendarGrid';
import { TodaysSchedule } from '@/app/modules/calendario/components/TodaysSchedule';
import { getDaysInMonth, getEventsForDate, getMonthName, demoEvents } from '@/app/modules/calendario/components/data';


export default function CalendarPage() {
  // Estado y Hooks
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [filterOffice, setFilterOffice] = useState<string>('all');
  const [allEvents, setAllEvents] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    // Simula la carga de datos y el montaje del componente en el cliente
    const fetchData = async () => {
      setIsLoading(true);
      setIsDemoData(false);
      try {
        // --- GUÍA DE INTEGRACIÓN BACKEND ---
        // El endpoint '/api/calendar/events' debe devolver un array de objetos `TimeSlot`.
        // Cada objeto debe coincidir con la interfaz `TimeSlot` definida en `app/modules/horario/components/data.ts`.
        //
        // Ejemplo de llamada:
        //   const response = await fetch('/api/calendar/events');
        //   if (!response.ok) throw new Error('Fallo al cargar los eventos');
        //   const data = await response.json(); // data: TimeSlot[]
        //   setAllEvents(data);

        // Por ahora, simulamos un fallo para mostrar los datos de prueba.
        throw new Error('Backend no disponible, usando datos de prueba.');

      } catch (error) {
        console.warn(error);
        setAllEvents(demoEvents);
        setIsDemoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().then(() => setHasMounted(true));
  }, []);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  const filteredEvents = allEvents.filter(event => {
    const matchesSpecialty = filterSpecialty === 'all' || event.nombreEspecialidad === filterSpecialty;
    const matchesOffice = filterOffice === 'all' || event.numeroConsultorio === filterOffice;
    return matchesSpecialty && matchesOffice;
  });
  const todaysEvents = hasMounted ? getEventsForDate(new Date(), filteredEvents, filterSpecialty, filterOffice) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Vista de Calendario</h1>
          <p className="text-muted-foreground">
            Visualice todas las franjas horarias en formato calendario
          </p>
        </div>

        <CalendarFilters
          filterSpecialty={filterSpecialty}
          onSpecialtyChange={setFilterSpecialty}
          filterOffice={filterOffice}
          onOfficeChange={setFilterOffice}
        />
      </div>

      {isDemoData && !isLoading && (
        <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 flex-shrink-0 !text-blue-600 dark:!text-blue-400 mt-0.5" />
            <div>
              <AlertTitle className="font-semibold">Modo de Demostración</AlertTitle>
              <AlertDescription>Estás viendo datos de prueba. La información real se mostrará cuando el backend esté conectado.</AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span suppressHydrationWarning>
                {getMonthName(currentDate)}
              </span>
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                aria-label="Mes anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                aria-label="Mes siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
              {Array.from({ length: 35 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
            </div>
          ) : (
            <CalendarGrid
              days={days}
              currentDate={currentDate}
              allEvents={filteredEvents}
              filterSpecialty={filterSpecialty}
              filterOffice={filterOffice}
              hasMounted={hasMounted}
            />
          )}

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white hover:bg-green-500/80">Disponible</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 text-white">Bloqueado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      {hasMounted && (
        isLoading ? <Skeleton className="h-48" /> : <TodaysSchedule events={todaysEvents} />
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarEvent, events, getDaysInMonth, getEventsForDate, getMonthName } from '../../modules/calendario/components/data';
import { CalendarFilters } from '@/app/modules/calendario/components/CalendarFilters';
import { CalendarGrid } from '@/app/modules/calendario/components/CalendarGrid';
import { TodaysSchedule } from '@/app/modules/calendario/components/TodaysSchedule';
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [filterOffice, setFilterOffice] = useState<string>('all');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const todaysEvents = hasMounted ? getEventsForDate(new Date(), events, filterSpecialty, filterOffice) : [];

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
          <CalendarGrid
            days={days}
            currentDate={currentDate}
            allEvents={events}
            filterSpecialty={filterSpecialty}
            filterOffice={filterOffice}
            hasMounted={hasMounted}
          />

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white">Disponible</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 text-white">Ocupado</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 text-white">Bloqueado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      {hasMounted && (
        <TodaysSchedule events={todaysEvents} />
      )}
    </div>
  );
}
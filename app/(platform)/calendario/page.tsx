'use client';

import { useState, useEffect } from 'react';
import { Badge, Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CalendarEvent {
  id: string;
  title: string;
  specialty: string;
  office: string;
  time: string;
  doctor: string;
  status: 'available' | 'booked' | 'blocked';
  date: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [filterOffice, setFilterOffice] = useState<string>('all');

  // Eventos del calendario - sincronizado con timeslots cada 5 min
  const events: CalendarEvent[] = [
    {
      id: 'evt_001',
      title: 'Cardiología - García',
      specialty: 'Cardiología',
      office: 'Cons. A-1',
      time: '09:00-09:45',
      doctor: 'Dr. García Mendoza',
      status: 'available',
      date: '2024-01-15'
    },
    {
      id: 'evt_002',
      title: 'Neurología - Martínez',
      specialty: 'Neurología', 
      office: 'Cons. B-2',
      time: '10:30-11:30',
      doctor: 'Dra. Martínez Silva',
      status: 'booked',
      date: '2024-01-15'
    },
    {
      id: 'evt_003', 
      title: 'Pediatría - Rodríguez',
      specialty: 'Pediatría',
      office: 'Pediátrico',
      time: '14:00-14:30',
      doctor: 'Dr. Rodríguez',
      status: 'available', 
      date: '2024-01-16'
    },
    {
      id: 'evt_004',
      title: 'BLOQUEADO - Mantenimiento',
      specialty: 'Medicina General',
      office: 'Cons. A-3',
      time: '08:00-12:00', // mantenimiento largo
      doctor: 'Dr. López Herrera',
      status: 'blocked',
      date: '2024-01-16'
    },
    {
      id: 'evt_005',
      title: 'Ginecología - Santos',
      specialty: 'Ginecología',
      office: 'Cons. C-1', 
      time: '15:30-16:00',
      doctor: 'Dra. Santos López',
      status: 'booked',
      date: '2024-01-17'
    }
  ];

  const specialties = ['Cardiología', 'Neurología', 'Pediatría', 'Dermatología', 'Oftalmología'];
  const offices = ['Consultorio 1', 'Consultorio 2', 'Consultorio 3', 'Consultorio 4', 'Consultorio 5'];

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => {
      const matchesDate = event.date === dateString;
      const matchesSpecialty = filterSpecialty === 'all' || event.specialty === filterSpecialty;
      const matchesOffice = filterOffice === 'all' || event.office === filterOffice;
      
      return matchesDate && matchesSpecialty && matchesOffice;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 text-white';
      case 'booked':
        return 'bg-blue-500 text-white';
      case 'blocked':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Vista de Calendario</h1>
          <p className="text-muted-foreground">
            Visualice todas las franjas horarias en formato calendario
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <label htmlFor="specialty-filter" className="text-sm font-medium">
                  Especialidad
                </label>
                <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                  <SelectTrigger id="specialty-filter" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las especialidades</SelectItem>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="office-filter" className="text-sm font-medium">
                  Consultorio
                </label>
                <Select value={filterOffice} onValueChange={setFilterOffice}>
                  <SelectTrigger id="office-filter" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los consultorios</SelectItem>
                    {offices.map(office => (
                      <SelectItem key={office} value={office}>
                        {office}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-muted-foreground border-b"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonthDay = hasMounted && isCurrentMonth(day);
              const isTodayDay = hasMounted && isToday(day);

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-border ${
                    isCurrentMonthDay ? 'bg-background' : 'bg-muted/30'
                  } ${isTodayDay ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className={`text-sm mb-2 ${
                    isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground'
                  } ${isTodayDay ? 'font-bold' : ''}`}>
                    {day.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: `var(--color-${event.status === 'available' ? 'green' : event.status === 'booked' ? 'blue' : 'red'}-500)`, color: 'white' }}
                        title={`${event.doctor} - ${event.specialty} - ${event.time}`}
                      >
                        <div className="font-medium truncate">{event.doctor}</div>
                        <div className="truncate">{event.time}</div>
                      </div>
                    ))}

                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{dayEvents.length - 3} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

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
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getEventsForDate(new Date()).length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No hay eventos programados para hoy.
                </p>
              ) : (
                getEventsForDate(new Date()).map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{event.doctor}</span>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status === 'available' ? 'Disponible' : 
                           event.status === 'booked' ? 'Ocupado' : 'Bloqueado'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.specialty} • {event.office}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {event.time}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
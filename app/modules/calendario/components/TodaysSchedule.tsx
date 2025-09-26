'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarEvent, getStatusColorClass } from './data';

interface TodaysScheduleProps {
  events: CalendarEvent[];
}

export function TodaysSchedule({ events }: TodaysScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda de Hoy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No hay eventos programados para hoy.
            </p>
          ) : (
            events.map(event => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{event.doctor}</span>
                    <Badge className={getStatusColorClass(event.status)}>
                      {event.status === 'available' ? 'Disponible' : event.status === 'booked' ? 'Ocupado' : 'Bloqueado'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{event.specialty} • {event.office}</div>
                </div>
                <div className="text-sm font-medium">{event.time}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
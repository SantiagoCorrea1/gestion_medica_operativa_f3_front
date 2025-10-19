'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeSlot } from '../../horario/components/data';
import { getStatusColorClass } from './data';

interface TodaysScheduleProps {
  events: TimeSlot[];
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
            events.map((event) => (
              <div
                key={event.idDisponibilidad}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{event.nombreProfesional}</span>
                    <Badge className={getStatusColorClass(event.activa)}>
                      {event.activa ? 'Disponible' : 'Bloqueado'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{event.nombreEspecialidad} • {event.numeroConsultorio}</div>
                </div>
                <div className="text-sm font-medium">{event.horaFranja}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
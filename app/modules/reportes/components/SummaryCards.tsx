'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryCardsProps {
  occupationRate: string;
  attendanceRate: string;
  totalAppointments: number;
  totalNoShow: number;
}

export function SummaryCards({ occupationRate, attendanceRate, totalAppointments, totalNoShow }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Tasa de Ocupación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{occupationRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">Promedio general</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Tasa de Asistencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{attendanceRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">Pacientes que asistieron</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Total Citas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAppointments}</div>
          <p className="text-xs text-muted-foreground mt-1">En el período seleccionado</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Inasistencias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{totalNoShow.toFixed(0)}</div>
          <p className="text-xs text-muted-foreground mt-1">Pacientes que no asistieron</p>
        </CardContent>
      </Card>
    </div>
  );
}
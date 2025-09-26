'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { WeeklyTrendData } from './data';

interface WeeklyTrendChartProps {
  data: WeeklyTrendData[];
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Tendencia Semanal de Citas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={3} name="Citas Programadas" />
            <Line type="monotone" dataKey="attended" stroke="#10b981" strokeWidth={3} name="Asistieron" />
            <Line type="monotone" dataKey="noShow" stroke="#ef4444" strokeWidth={3} name="No Asistieron" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
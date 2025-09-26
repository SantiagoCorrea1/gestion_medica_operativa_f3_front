'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OccupationData } from './data';

interface OccupationChartProps {
  data: OccupationData[];
}

export function OccupationChart({ data }: OccupationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasa de Ocupación por Especialidad</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="specialty"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip formatter={(value) => [value, 'Citas']} />
            <Bar dataKey="occupied" fill="#3b82f6" name="Ocupadas" stackId="a" />
            <Bar dataKey="available" fill="#e5e7eb" name="Disponibles" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
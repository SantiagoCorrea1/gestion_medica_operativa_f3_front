'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // PieLabelRenderProps is not directly exported from recharts, so we define it here for type safety.
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AttendanceData, pieColors } from './data';

interface AttendanceChartProps {
  data: AttendanceData[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Asistencia</CardTitle>
        <CardDescription>Porcentaje de asistencia por especialidad</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.map(item => ({
                name: item.specialty,
                value: item.attended,
                noShow: item.noShow,
              }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={false}
              label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Pie
              data={data.map(item => ({
                name: item.specialty,
                value: item.noShow,
              }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={110}
            >
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Asistencia']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
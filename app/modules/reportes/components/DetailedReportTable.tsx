'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OccupationData, AttendanceData } from './data';

interface DetailedReportTableProps {
  occupationData: OccupationData[];
  attendanceData: AttendanceData[];
}

export function DetailedReportTable({ occupationData, attendanceData }: DetailedReportTableProps) {
  const getRateClass = (rate: number) => {
    if (rate >= 90) return 'bg-green-100 text-green-800';
    if (rate >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporte Detallado por Especialidad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Especialidad</th>
                <th className="text-right p-2 font-medium">Total Citas</th>
                <th className="text-right p-2 font-medium">Ocupadas</th>
                <th className="text-right p-2 font-medium">Tasa Ocupación</th>
                <th className="text-right p-2 font-medium">Asistencias (%)</th>
                <th className="text-right p-2 font-medium">Inasistencias (%)</th>
                <th className="text-right p-2 font-medium">Tasa Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {occupationData.map((item) => {
                const attendanceItem = attendanceData.find(a => a.specialty === item.specialty);
                const occupationRate = item.total > 0 ? (item.occupied / item.total) * 100 : 0;
                const totalAttendance = attendanceItem ? attendanceItem.attended + attendanceItem.noShow : 0;
                const attendanceRate = totalAttendance > 0 ? (attendanceItem!.attended / totalAttendance) * 100 : 0;

                return (
                  <tr key={item.specialty} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.specialty}</td>
                    <td className="p-2 text-right">{item.total}</td>
                    <td className="p-2 text-right">{item.occupied}</td>
                    <td className="p-2 text-right">
                      <span className={`px-2 py-1 rounded text-sm ${getRateClass(occupationRate)}`}>{occupationRate.toFixed(1)}%</span>
                    </td>
                    <td className="p-2 text-right">{attendanceItem?.attended.toFixed(1) || 'N/A'}%</td>
                    <td className="p-2 text-right">{attendanceItem?.noShow.toFixed(1) || 'N/A'}%</td>
                    <td className="p-2 text-right">
                      <span className={`px-2 py-1 rounded text-sm ${getRateClass(attendanceRate)}`}>{attendanceRate.toFixed(1)}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
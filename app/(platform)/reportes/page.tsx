'use client';

import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { AttendanceChart } from '@/app/modules/reportes/components/AttendanceChart';
import { 
  // attendanceData as mockAttendanceData, 
  calculateAttendanceRate, 
  calculateOccupationRate, 
  // occupationData as mockOccupationData, 
  // weeklyTrendData as mockWeeklyTrendData,
  OccupationData,
  AttendanceData,
  WeeklyTrendData
} from '@/app/modules/reportes/components/data';
import { DetailedReportTable } from '@/app/modules/reportes/components/DetailedReportTable';
import { OccupationChart } from '@/app/modules/reportes/components/OccupationChart';
import { ReportsHeader } from '@/app/modules/reportes/components/ReportsHeader';
import { SummaryCards } from '@/app/modules/reportes/components/SummaryCards';
import { WeeklyTrendChart } from '@/app/modules/reportes/components/WeeklyTrendChart';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('last30days');

  const [occupationData, setOccupationData] = useState<OccupationData[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [weeklyTrendData, setWeeklyTrendData] = useState<WeeklyTrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsDemoData(false);
      try {
        // --- SIMULACIÓN DE FETCH ---
        // Aquí irían las llamadas reales al backend
        // const [occupationRes, attendanceRes, trendRes] = await Promise.all([
        //   fetch(`/api/reports/occupation?range=${dateRange}`),
        //   fetch(`/api/reports/attendance?range=${dateRange}`),
        //   fetch(`/api/reports/weekly-trend?range=${dateRange}`),
        // ]);
        // if (!occupationRes.ok || !attendanceRes.ok || !trendRes.ok) throw new Error('Fallo al cargar los reportes');
        // setOccupationData(await occupationRes.json());
        // setAttendanceData(await attendanceRes.json());
        // setWeeklyTrendData(await trendRes.json());
        throw new Error("Backend no disponible, usando datos de prueba.");
      } catch (error) {
        console.warn(error);
        // setOccupationData(mockOccupationData);
        // setAttendanceData(mockAttendanceData);
        // setWeeklyTrendData(mockWeeklyTrendData);
        setIsDemoData(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  const filteredOccupationData = selectedSpecialty === 'all' 
    ? occupationData 
    : occupationData.filter(item => item.specialty === selectedSpecialty);

  const filteredAttendanceData = selectedSpecialty === 'all'
    ? attendanceData
    : attendanceData.filter(item => item.specialty === selectedSpecialty);

  return (
    <div className="space-y-6">
      <ReportsHeader
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={setSelectedSpecialty}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {isDemoData && !isLoading && (
        <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
          <Info className="h-4 w-4 !text-blue-800" />
          <AlertDescription>
            Estás viendo datos de prueba. La información real se mostrará cuando el backend esté conectado.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-[350px]" />
            <Skeleton className="h-[350px]" />
            <Skeleton className="h-[350px] lg:col-span-2" />
          </div>
          <Skeleton className="h-64" />
        </div>
      ) : (
        <>
          <SummaryCards
            occupationRate={calculateOccupationRate(filteredOccupationData)}
            attendanceRate={calculateAttendanceRate(filteredAttendanceData)}
            totalAppointments={filteredOccupationData.reduce((sum, item) => sum + item.total, 0)}
            totalNoShow={filteredAttendanceData.reduce((sum, item) => sum + item.noShow, 0)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OccupationChart data={filteredOccupationData} />
            <AttendanceChart data={filteredAttendanceData} />
            <WeeklyTrendChart data={weeklyTrendData} />
          </div>
          <DetailedReportTable
            occupationData={filteredOccupationData}
            attendanceData={filteredAttendanceData}
          />
        </>
      )}
    </div>
  );
}
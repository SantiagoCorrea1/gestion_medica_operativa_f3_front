'use client';

import { AttendanceChart } from '@/app/modules/reportes/components/AttendanceChart';
import { attendanceData, calculateAttendanceRate, calculateOccupationRate, occupationData, weeklyTrendData } from '@/app/modules/reportes/components/data';
import { DetailedReportTable } from '@/app/modules/reportes/components/DetailedReportTable';
import { OccupationChart } from '@/app/modules/reportes/components/OccupationChart';
import { ReportsHeader } from '@/app/modules/reportes/components/ReportsHeader';
import { SummaryCards } from '@/app/modules/reportes/components/SummaryCards';
import { WeeklyTrendChart } from '@/app/modules/reportes/components/WeeklyTrendChart';
import { useState } from 'react';


export default function ReportesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('last30days');

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

      {/* Summary Cards */}
      <SummaryCards
        occupationRate={calculateOccupationRate(filteredOccupationData)}
        attendanceRate={calculateAttendanceRate(filteredAttendanceData)}
        totalAppointments={filteredOccupationData.reduce((sum, item) => sum + item.total, 0)}
        totalNoShow={filteredAttendanceData.reduce((sum, item) => sum + item.noShow, 0)}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupationChart data={filteredOccupationData} />
        <AttendanceChart data={filteredAttendanceData} />
        <WeeklyTrendChart data={weeklyTrendData} />
      </div>

      {/* Detailed Table */}
      <DetailedReportTable
        occupationData={filteredOccupationData}
        attendanceData={filteredAttendanceData}
      />
    </div>
  );
}
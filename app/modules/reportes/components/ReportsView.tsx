'use client';

import { useState } from 'react';
import { occupationData, attendanceData, weeklyTrendData, calculateOccupationRate, calculateAttendanceRate } from '../data';
import { ReportsHeader } from './ReportsHeader';
import { SummaryCards } from './SummaryCards';
import { OccupationChart } from './OccupationChart';
import { AttendanceChart } from './AttendanceChart';
import { WeeklyTrendChart } from './WeeklyTrendChart';
import { DetailedReportTable } from './DetailedReportTable';

export function ReportsView() {
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
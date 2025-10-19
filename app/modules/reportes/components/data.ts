import { TimeSlot } from '../../horario/components/data';
import { specialties as allSpecialties } from '../../horario/components/data';

export interface OccupationData {
  specialty: string;
  occupied: number;
  available: number;
  total: number;
}

export interface AttendanceData {
  specialty: string;
  attended: number;
  noShow: number;
}

export interface WeeklyTrendData {
  week: string;
  appointments: number;
  attended: number;
  noShow: number;
}

export const mockOccupationData: OccupationData[] = [
  { specialty: 'Cardiología', occupied: 127, available: 23, total: 150 },
  { specialty: 'Neurología', occupied: 84, available: 31, total: 115 },
  { specialty: 'Pediatría', occupied: 156, available: 19, total: 175 },
  { specialty: 'Medicina General', occupied: 203, available: 47, total: 250 },
  { specialty: 'Dermatología', occupied: 61, available: 29, total: 90 },
  { specialty: 'Oftalmología', occupied: 78, available: 22, total: 100 },
  { specialty: 'Ginecología', occupied: 45, available: 15, total: 60 },
];

export const mockAttendanceData: AttendanceData[] = [
  { specialty: 'Cardiología', attended: 89.2, noShow: 10.8 },
  { specialty: 'Neurología', attended: 91.5, noShow: 8.5 },
  { specialty: 'Pediatría', attended: 87.3, noShow: 12.7 },
  { specialty: 'Medicina General', attended: 93.1, noShow: 6.9 },
  { specialty: 'Dermatología', attended: 82.4, noShow: 17.6 },
  { specialty: 'Oftalmología', attended: 94.8, noShow: 5.2 },
  { specialty: 'Ginecología', attended: 88.7, noShow: 11.3 }
];

export const mockWeeklyTrendData: WeeklyTrendData[] = [
  { week: '1-7 Ene', appointments: 189, attended: 167, noShow: 22 },
  { week: '8-14 Ene', appointments: 267, attended: 241, noShow: 26 },
  { week: '15-21 Ene', appointments: 298, attended: 263, noShow: 35 },
  { week: '22-28 Ene', appointments: 312, attended: 285, noShow: 27 },
  { week: '29-31 Ene', appointments: 134, attended: 119, noShow: 15 }
];

export const pieColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'];

export const specialties = allSpecialties;

export const calculateOccupationRate = (data: OccupationData[]) => {
  if (data.length === 0) return '0.0';
  const totalOccupied = data.reduce((sum, item) => sum + item.occupied, 0);
  const totalSlots = data.reduce((sum, item) => sum + item.total, 0);
  return totalSlots > 0 ? ((totalOccupied / totalSlots) * 100).toFixed(1) : '0.0';
};

export const calculateAttendanceRate = (data: AttendanceData[]) => {
  if (data.length === 0) return '0.0';
  // This calculation is tricky with percentages. A better approach is to use absolute numbers if available.
  // For this simulation, we'll average the attendance rates.
  const totalAttendedRate = data.reduce((sum, item) => sum + item.attended, 0);
  return data.length > 0 ? (totalAttendedRate / data.length).toFixed(1) : '0.0';
};

export const generateOccupationData = (timeSlots: TimeSlot[]): OccupationData[] => {
  const statsBySpecialty: { [key: string]: OccupationData } = {};

  timeSlots.forEach(slot => {
    if (!statsBySpecialty[slot.nombreEspecialidad]) {
      statsBySpecialty[slot.nombreEspecialidad] = {
        specialty: slot.nombreEspecialidad,
        occupied: 0,
        available: 0,
        total: 0,
      };
    }
    const stats = statsBySpecialty[slot.nombreEspecialidad];
    stats.total++;
    if (slot.activa) {
      stats.available++;
    } else {
      stats.occupied++;
    }
  });

  return Object.values(statsBySpecialty);
};

export const generateAttendanceData = (occupationData: OccupationData[]): AttendanceData[] => {
  // Esto es una simulación, ya que no tenemos datos reales de asistencia.
  // Se basa en los datos de ocupación generados.
  return occupationData.map(occ => {
    const attended = Math.floor(occ.occupied * (Math.random() * (0.95 - 0.85) + 0.85)); // Simula entre 85% y 95% de asistencia
    const noShow = occ.occupied - attended;
    const total = attended + noShow;
    return {
      specialty: occ.specialty,
      attended: total > 0 ? (attended / total) * 100 : 0,
      noShow: total > 0 ? (noShow / total) * 100 : 0,
    };
  });
};
export interface OperationalBlock {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  doctor: string;
  specialty: string;
  status: 'active' | 'upcoming' | 'expired';
  affectedSlots: number;
}

export const initialBlocks: OperationalBlock[] = [
  { id: '1', startDate: '2024-01-20', endDate: '2024-01-25', reason: 'Vacaciones programadas', doctor: 'Dr. García', specialty: 'Cardiología', status: 'upcoming', affectedSlots: 15 },
  { id: '2', startDate: '2024-01-10', endDate: '2024-01-12', reason: 'Capacitación médica', doctor: 'Dr. Martínez', specialty: 'Neurología', status: 'expired', affectedSlots: 8 },
  { id: '3', startDate: '2024-01-15', endDate: '2024-01-15', reason: 'Incapacidad médica', doctor: 'Dr. Rodríguez', specialty: 'Pediatría', status: 'active', affectedSlots: 6 },
];

export const reasonOptions = [
  'Vacaciones programadas',
  'Incapacidad médica',
  'Capacitación médica',
  'Congreso médico',
  'Mantenimiento de consultorio',
  'Emergencia personal',
  'Otro',
];

export const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate).toLocaleDateString('es-ES');
  const end = new Date(endDate).toLocaleDateString('es-ES');
  if (startDate === endDate) return start;
  return `${start} - ${end}`;
};
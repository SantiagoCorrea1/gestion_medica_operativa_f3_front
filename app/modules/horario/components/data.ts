export interface TimeSlot {
    id: string;
    specialty: string;
    office: string;
    date: string;
    startTime: string;
    endTime: string;
    doctorName: string;
    status: 'available' | 'booked' | 'blocked';
}

export const mockTimeSlots: TimeSlot[] = [
    { id: 'ts_001', specialty: 'Cardiología', office: 'Consultorio A-1', date: '2024-01-15', startTime: '09:00', endTime: '09:45', doctorName: 'Dr. García Mendoza', status: 'available' },
    { id: 'ts_002', specialty: 'Neurología', office: 'Consultorio B-2', date: '2024-01-15', startTime: '10:30', endTime: '11:30', doctorName: 'Dra. Martínez Silva', status: 'booked' },
    { id: 'ts_003', specialty: 'Pediatría', office: 'Consultorio Pediátrico', date: '2024-01-16', startTime: '14:00', endTime: '14:30', doctorName: 'Dr. Rodríguez', status: 'available' },
    { id: 'ts_004', specialty: 'Medicina General', office: 'Consultorio A-3', date: '2024-01-16', startTime: '08:00', endTime: '08:20', doctorName: 'Dr. López Herrera', status: 'blocked' }
];

export const specialties = [
    'Cardiología', 
    'Neurología', 
    'Pediatría', 
    'Dermatología', 
    'Oftalmología',
    'Medicina General',
    'Ginecología', 
    'Traumatología'
];

export const offices = [
    'Consultorio 1', 'Consultorio 2', 'Consultorio 3', 'Consultorio 4', 'Consultorio 5', 'Sala de Procedimientos', 'Consultorio VIP'
];
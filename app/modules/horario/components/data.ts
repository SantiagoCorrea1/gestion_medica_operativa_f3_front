export interface TimeSlot {
    idDisponibilidad: string; // o number si el backend lo envía como número
    idProfesional?: number;
    nombreProfesional: string;
    nombreEspecialidad: string;
    horaFranja: string; // Formato "HH:mm - HH:mm"
    numeroConsultorio: string; // o number, ajustado a string por consistencia con el form
    date: string;
    activa: boolean;
}

export const mockTimeSlots: TimeSlot[] = [
    { idDisponibilidad: 'ts_001', idProfesional: 1, nombreEspecialidad: 'Cardiología', numeroConsultorio: 'Consultorio A-1', date: '2024-01-15', horaFranja: '09:00 - 09:45', nombreProfesional: 'Dr. García Mendoza', activa: true },
    { idDisponibilidad: 'ts_002', idProfesional: 2, nombreEspecialidad: 'Neurología', numeroConsultorio: 'Consultorio B-2', date: '2024-01-15', horaFranja: '10:30 - 11:30', nombreProfesional: 'Dra. Martínez Silva', activa: false }, // Asumiendo que 'booked' es !activa
    { idDisponibilidad: 'ts_003', idProfesional: 3, nombreEspecialidad: 'Pediatría', numeroConsultorio: 'Consultorio Pediátrico', date: '2024-01-16', horaFranja: '14:00 - 14:30', nombreProfesional: 'Dr. Rodríguez', activa: true },
    { idDisponibilidad: 'ts_004', idProfesional: 4, nombreEspecialidad: 'Medicina General', numeroConsultorio: 'Consultorio A-3', date: '2024-01-16', horaFranja: '08:00 - 08:20', nombreProfesional: 'Dr. López Herrera', activa: false } // Asumiendo que 'blocked' es !activa
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
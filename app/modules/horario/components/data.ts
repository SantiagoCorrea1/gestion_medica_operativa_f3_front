export interface TimeSlot {
    idDisponibilidad: number; // o number si el backend lo envía como número
    idEspecialidad: number;
    idConsultorio: number;
    idHoraFranja: number;
    idProfesional?: number;
    nombreProfesional: string;
    nombreEspecialidad: string;
    horaFranja: string; // Formato "HH:mm - HH:mm"
    numeroConsultorio: string; // o number, ajustado a string por consistencia con el form
    date: string;
    activa: boolean;
}

export const mockTimeSlots: TimeSlot[] = [
  { idDisponibilidad: 1, idEspecialidad: 1, idConsultorio: 101, idHoraFranja: 1, idProfesional: 1, nombreProfesional: 'Dr. García Mendoza', nombreEspecialidad: 'Cardiología', horaFranja: '09:00 - 09:45', numeroConsultorio: 'Consultorio A-1', date: '2024-01-15', activa: true },
  { idDisponibilidad: 2, idEspecialidad: 2, idConsultorio: 202, idHoraFranja: 2, idProfesional: 2, nombreProfesional: 'Dra. Martínez Silva', nombreEspecialidad: 'Neurología', horaFranja: '10:30 - 11:30', numeroConsultorio: 'Consultorio B-2', date: '2024-01-15', activa: false },
  { idDisponibilidad: 3, idEspecialidad: 3, idConsultorio: 303, idHoraFranja: 3, idProfesional: 3, nombreProfesional: 'Dr. Rodríguez', nombreEspecialidad: 'Pediatría', horaFranja: '14:00 - 14:30', numeroConsultorio: 'Consultorio Pediátrico', date: '2024-01-16', activa: true },
  { idDisponibilidad: 4, idEspecialidad: 4, idConsultorio: 104, idHoraFranja: 4, idProfesional: 4, nombreProfesional: 'Dr. López Herrera', nombreEspecialidad: 'Medicina General', horaFranja: '08:00 - 08:20', numeroConsultorio: 'Consultorio A-3', date: '2024-01-16', activa: false }
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
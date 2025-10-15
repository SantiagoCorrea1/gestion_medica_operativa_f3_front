export interface NotificationLog {
    id: string;
    date: string;
    time: string;
    recipients: number;
    subject: string;
    status: 'sent' | 'failed' | 'pending';
    reason: string;
    affectedDoctors: string[];
}

export const mockTimeSlots = [
    { idDisponibilidad: 'ts_001', idProfesional: 1, nombreEspecialidad: 'Cardiología', numeroConsultorio: 'Consultorio A-1', date: '2024-01-15', horaFranja: '09:00 - 09:45', nombreProfesional: 'Dr. García Mendoza', activa: true },
    { idDisponibilidad: 'ts_002', idProfesional: 2, nombreEspecialidad: 'Neurología', numeroConsultorio: 'Consultorio B-2', date: '2024-01-15', horaFranja: '10:30 - 11:30', nombreProfesional: 'Dra. Martínez Silva', activa: false },
    { idDisponibilidad: 'ts_003', idProfesional: 3, nombreEspecialidad: 'Pediatría', numeroConsultorio: 'Consultorio Pediátrico', date: '2024-01-16', horaFranja: '14:00 - 14:30', nombreProfesional: 'Dr. Rodríguez', activa: true },
    { idDisponibilidad: 'ts_004', idProfesional: 4, nombreEspecialidad: 'Medicina General', numeroConsultorio: 'Consultorio A-3', date: '2024-01-16', horaFranja: '08:00 - 08:20', nombreProfesional: 'Dr. López Herrera', activa: false }
];

export const mockNotificationLogs: NotificationLog[] = [
    { id: 'notif_001', date: '2024-01-12', time: '08:45', recipients: 31, subject: 'Cancelación urgente - Dr. García Mendoza', status: 'sent', reason: 'Incapacidad médica', affectedDoctors: ['Dr. García Mendoza'] },
    { id: 'notif_002', date: '2024-01-10', time: '16:22', recipients: 18, subject: 'Reprogramación citas - Mantenimiento Consultorio B', status: 'sent', reason: 'Mantenimiento de consultorio', affectedDoctors: ['Dra. Martínez Silva', 'Dr. López Herrera'] },
    { id: 'notif_003', date: '2024-01-08', time: '11:20', recipients: 12, subject: 'URGENTE: Cancelación - Corte eléctrico', status: 'failed', reason: 'Problema técnico', affectedDoctors: ['Dr. Rodríguez', 'Dr. Santos'] },
    { id: 'notif_004', date: '2024-01-06', time: '13:15', recipients: 7, subject: 'Reagendamiento - Capacitación COVID-19', status: 'sent', reason: 'Capacitación obligatoria', affectedDoctors: ['Dr. Vargas'] }
];
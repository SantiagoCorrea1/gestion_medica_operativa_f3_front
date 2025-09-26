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

export const mockNotificationLogs: NotificationLog[] = [
    { id: 'notif_001', date: '2024-01-12', time: '08:45', recipients: 31, subject: 'Cancelación urgente - Dr. García Mendoza', status: 'sent', reason: 'Incapacidad médica', affectedDoctors: ['Dr. García Mendoza'] },
    { id: 'notif_002', date: '2024-01-10', time: '16:22', recipients: 18, subject: 'Reprogramación citas - Mantenimiento Consultorio B', status: 'sent', reason: 'Mantenimiento de consultorio', affectedDoctors: ['Dra. Martínez Silva', 'Dr. López Herrera'] },
    { id: 'notif_003', date: '2024-01-08', time: '11:20', recipients: 12, subject: 'URGENTE: Cancelación - Corte eléctrico', status: 'failed', reason: 'Problema técnico', affectedDoctors: ['Dr. Rodríguez', 'Dr. Santos'] },
    { id: 'notif_004', date: '2024-01-06', time: '13:15', recipients: 7, subject: 'Reagendamiento - Capacitación COVID-19', status: 'sent', reason: 'Capacitación obligatoria', affectedDoctors: ['Dr. Vargas'] }
];
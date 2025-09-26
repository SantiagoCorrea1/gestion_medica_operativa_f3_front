import { LucideIcon, Calendar, Clock, Users, AlertTriangle } from 'lucide-react';

export interface User {
  name: string;
  role: 'coordinador' | 'medico' | 'recepcionista';
}

export interface StatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface RecentActivityItem {
  id: number;
  action: string;
  patient: string;
  time: string;
  doctor: string;
  specialty: string;
}

export const getStats = (userRole: User['role']): StatCard[] => [
  {
    title: 'Citas Programadas Hoy',
    value: userRole === 'coordinador' ? '27' : '24',
    icon: Calendar,
    color: 'text-blue-600',
  },
  { title: 'Franjas Disponibles', value: '12', icon: Clock, color: 'text-green-600' },
  { title: 'Pacientes en Espera', value: '7', icon: Users, color: 'text-orange-600' },
  { title: 'Cancelaciones Hoy', value: '4', icon: AlertTriangle, color: 'text-red-600' },
];

export const recentActivity: RecentActivityItem[] = [
  {
    id: 1,
    action: 'Cita programada',
    patient: 'Ana M. García',
    time: '09:30',
    doctor: 'Dr. García',
    specialty: 'Cardiología',
  },
  {
    id: 2,
    action: 'Cita cancelada',
    patient: 'Roberto S.',
    time: '14:00',
    doctor: 'Dr. Martínez',
    specialty: 'Neurología',
  },
  { id: 3, action: 'Reagendada', patient: 'Carmen L.', time: '11:15', doctor: 'Dr. Rodríguez', specialty: 'Pediatría' },
  {
    id: 4,
    action: 'Franja bloqueada',
    patient: 'Capacitación',
    time: '08:00-10:00',
    doctor: 'Dr. Santos',
    specialty: 'Medicina General',
  },
];
import { LucideIcon, Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { TimeSlot } from '../../horario/components/data';
import { OperationalBlock } from '../../bloqueos/components/data';
import { isToday } from '../../calendario/components/data';

declare global {
  interface String {
    hashCode(): number;
  }
}

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

export const getStats = (timeSlots: TimeSlot[]): StatCard[] => {
  const today = new Date();
  const todaysSlots = timeSlots.filter(slot => isToday(new Date(slot.date)));

  const scheduled = todaysSlots.filter(slot => !slot.activa).length;
  const available = todaysSlots.filter(slot => slot.activa).length;

  return [
    {
      title: 'Citas Programadas Hoy',
      value: scheduled.toString(),
      icon: Calendar,
      color: 'text-blue-600',
    },
    { title: 'Franjas Disponibles Hoy', value: available.toString(), icon: Clock, color: 'text-green-600' },
    { title: 'Pacientes en Espera', value: '7', icon: Users, color: 'text-orange-600' }, // Mock
    { title: 'Cancelaciones Hoy', value: '4', icon: AlertTriangle, color: 'text-red-600' }, // Mock
  ];
};

export const getRecentActivity = (timeSlots: TimeSlot[], blocks: OperationalBlock[]): RecentActivityItem[] => {
  const today = new Date();
  const recentSlots = timeSlots
    .filter(slot => !slot.activa && new Date(slot.date) <= today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)
    .map(slot => ({
      id: slot.idDisponibilidad,
      action: 'Cita programada',
      patient: 'Paciente Asignado', // Placeholder
      time: slot.horaFranja,
      doctor: slot.nombreProfesional,
      specialty: slot.nombreEspecialidad,
    }));

  const recentBlocks = blocks
    .filter(block => new Date(block.startDate) <= today)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 2)
    .map(block => ({
      id: block.id.hashCode(),
      action: 'Bloqueo operativo',
      patient: block.reason,
      time: `${block.startDate} - ${block.endDate}`,
      doctor: block.doctor,
      specialty: block.specialty,
    }));

  return [...recentSlots, ...recentBlocks].sort(() => Math.random() - 0.5); // Mezclar para simular un feed
};

// Simple hash function for generating unique-ish IDs from strings
if (!String.prototype.hashCode) {
  String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}
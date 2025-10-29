import { TimeSlot } from '../../horario/components/data';

export const demoEvents: TimeSlot[] = [
  {
    idDisponibilidad: 1, nombreEspecialidad: 'Cardiología', numeroConsultorio: 'Cons. A-1', horaFranja: '09:00 - 09:45', nombreProfesional: 'Dr. García Mendoza', activa: true, date: '2024-01-15',
    idEspecialidad: 0,
    idConsultorio: 0,
    idHoraFranja: 0
  },
  {
    idDisponibilidad: 2, nombreEspecialidad: 'Neurología', numeroConsultorio: 'Cons. B-2', horaFranja: '10:30 - 11:30', nombreProfesional: 'Dra. Martínez Silva', activa: false, date: '2024-01-15',
    idEspecialidad: 0,
    idConsultorio: 0,
    idHoraFranja: 0
  },
  {
    idDisponibilidad: 3, nombreEspecialidad: 'Pediatría', numeroConsultorio: 'Pediátrico', horaFranja: '14:00 - 14:30', nombreProfesional: 'Dr. Rodríguez', activa: true, date: '2024-01-16',
    idEspecialidad: 0,
    idConsultorio: 0,
    idHoraFranja: 0
  },
  {
    idDisponibilidad: 4, nombreEspecialidad: 'Medicina General', numeroConsultorio: 'Cons. A-3', horaFranja: '08:00 - 12:00', nombreProfesional: 'BLOQUEO', activa: false, date: '2024-01-16',
    idEspecialidad: 0,
    idConsultorio: 0,
    idHoraFranja: 0
  },
  {
    idDisponibilidad: 5, nombreEspecialidad: 'Ginecología', numeroConsultorio: 'Cons. C-1', horaFranja: '15:30 - 16:00', nombreProfesional: 'Dra. Santos López', activa: false, date: '2024-01-17',
    idEspecialidad: 0,
    idConsultorio: 0,
    idHoraFranja: 0
  },
];

export const specialties = ['Cardiología', 'Neurología', 'Pediatría', 'Dermatología', 'Oftalmología', 'Ginecología', 'Medicina General'];
export const offices = ['Cons. A-1', 'Cons. B-2', 'Pediátrico', 'Cons. A-3', 'Cons. C-1'];

export const getMonthName = (date: Date) => {
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
};

export const getDaysInMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const currentDay = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  return days;
};

export const getEventsForDate = (
  date: Date,
  allEvents: TimeSlot[],
  filterSpecialty: string,
  filterOffice: string
) => {
  const dateString = date.toISOString().split('T')[0];
  return allEvents.filter(event => {
    const matchesDate = event.date === dateString;
    const matchesSpecialty = filterSpecialty === 'all' || event.nombreEspecialidad === filterSpecialty;
    const matchesOffice = filterOffice === 'all' || event.numeroConsultorio === filterOffice;
    
    return matchesDate && matchesSpecialty && matchesOffice;
  });
};

export const getStatusColorClass = (activa: boolean) => {
  // Simplificamos esto para usar los colores directamente en los componentes
  // o basarnos en la propiedad 'activa'.
  // 'available' -> activa: true
  // 'booked'/'blocked' -> activa: false
  return activa ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isCurrentMonth = (date: Date, currentDisplayDate: Date) => {
  return date.getMonth() === currentDisplayDate.getMonth();
};
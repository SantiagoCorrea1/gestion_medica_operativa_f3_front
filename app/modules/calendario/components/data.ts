export interface CalendarEvent { // Asegúrate de que esta interfaz coincida con la de tu API
  id: string;
  title: string;
  specialty: string;
  office: string;
  time: string;
  doctor: string;
  status: 'available' | 'booked' | 'blocked';
  date: string;
}

export const demoEvents: CalendarEvent[] = [
  { id: 'evt_001', title: 'Cardiología - García', specialty: 'Cardiología', office: 'Cons. A-1', time: '09:00-09:45', doctor: 'Dr. García Mendoza', status: 'available', date: '2024-01-15' },
  { id: 'evt_002', title: 'Neurología - Martínez', specialty: 'Neurología', office: 'Cons. B-2', time: '10:30-11:30', doctor: 'Dra. Martínez Silva', status: 'booked', date: '2024-01-15' },
  { id: 'evt_003', title: 'Pediatría - Rodríguez', specialty: 'Pediatría', office: 'Pediátrico', time: '14:00-14:30', doctor: 'Dr. Rodríguez', status: 'available', date: '2024-01-16' },
  { id: 'evt_004', title: 'BLOQUEADO - Mantenimiento', specialty: 'Medicina General', office: 'Cons. A-3', time: '08:00-12:00', doctor: 'Dr. López Herrera', status: 'blocked', date: '2024-01-16' },
  { id: 'evt_005', title: 'Ginecología - Santos', specialty: 'Ginecología', office: 'Cons. C-1', time: '15:30-16:00', doctor: 'Dra. Santos López', status: 'booked', date: '2024-01-17' },
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
  allEvents: CalendarEvent[],
  filterSpecialty: string,
  filterOffice: string
) => {
  const dateString = date.toISOString().split('T')[0];
  return allEvents.filter(event => {
    const matchesDate = event.date === dateString;
    const matchesSpecialty = filterSpecialty === 'all' || event.specialty === filterSpecialty;
    const matchesOffice = filterOffice === 'all' || event.office === filterOffice;
    
    return matchesDate && matchesSpecialty && matchesOffice;
  });
};

export const getStatusColorClass = (status: CalendarEvent['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-500 text-white';
    case 'booked':
      return 'bg-blue-500 text-white';
    case 'blocked':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isCurrentMonth = (date: Date, currentDisplayDate: Date) => {
  return date.getMonth() === currentDisplayDate.getMonth();
};
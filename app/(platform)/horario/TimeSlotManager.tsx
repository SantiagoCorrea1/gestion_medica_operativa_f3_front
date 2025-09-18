'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Clock, MapPin, Stethoscope, Badge } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { TimeSlotForm } from './TimeSlotForm';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeSlot {
  id: string;
  specialty: string;
  office: string;
  date: string;
  startTime: string;
  endTime: string;
  doctorName: string;
  status: 'available' | 'booked' | 'blocked';
}

export function TimeSlotManager() {
  // const { data: session } = useSession();
  // const user = session?.user;
  // Mock user para pruebas sin sesión
  const user = { name: 'Usuario de Prueba', role: 'coordinador' };

  // Lógica de permisos simple basada en el rol del usuario.
  const hasPermission = (permission: 'create' | 'edit') => {
    if (!user) return false;
    // Asegúrate de que tu sesión de next-auth incluya el 'role'.
    const userRole = (user as any).role;

    // Lógica de ejemplo: Coordinadores y médicos pueden crear/editar.
    if (permission === 'create' || permission === 'edit') {
      return userRole === 'coordinador' || userRole === 'medico';
    }
    return false;
  };

  // Mock data - en producción viene de /api/timeslots
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 'ts_001',
      specialty: 'Cardiología',
      office: 'Consultorio A-1', // cambió la nomenclatura, actualizar
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '09:45', // citas de 45 min en cardio
      doctorName: 'Dr. García Mendoza',
      status: 'available'
    },
    {
      id: 'ts_002', 
      specialty: 'Neurología',
      office: 'Consultorio B-2',
      date: '2024-01-15',
      startTime: '10:30',
      endTime: '11:30',
      doctorName: 'Dra. Martínez Silva', // corregir, es doctora
      status: 'booked'
    },
    {
      id: 'ts_003',
      specialty: 'Pediatría',
      office: 'Consultorio Pediátrico', // tiene nombre especial
      date: '2024-01-16',
      startTime: '14:00',
      endTime: '14:30', // pediatría más corta
      doctorName: 'Dr. Rodríguez',
      status: 'available'
    },
    {
      id: 'ts_004',
      specialty: 'Medicina General',
      office: 'Consultorio A-3',
      date: '2024-01-16', 
      startTime: '08:00',
      endTime: '08:20', // consultas rápidas
      doctorName: 'Dr. López Herrera',
      status: 'blocked' // mantenimiento programado
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'time'>('date');

  // Lista de especialidades - mantener sincronizado con el catálogo de RRHH
  const specialties = [
    'Cardiología', 
    'Neurología', 
    'Pediatría', 
    'Dermatología', 
    'Oftalmología',
    'Medicina General', // agregada por demanda
    'Ginecología', 
    'Traumatología'
    // TODO: agregar Psiquiatría cuando llegue el Dr. Vargas
  ];

  const handleCreateSlot = (slotData: Omit<TimeSlot, 'id' | 'status'>) => {
    // FIXME: validar solapamientos antes de crear
    const newSlot: TimeSlot = {
      ...slotData,
      id: `ts_${Date.now()}`, // mejor formato para ID
      status: 'available'
    };
    
    // Validación básica - mejorar esto
    const hasOverlap = timeSlots.some(slot => 
      slot.date === slotData.date && 
      slot.office === slotData.office &&
      ((slotData.startTime >= slot.startTime && slotData.startTime < slot.endTime) ||
       (slotData.endTime > slot.startTime && slotData.endTime <= slot.endTime))
    );
    
    if (hasOverlap) {
      toast.error('Conflicto de horario detectado', {
        description: 'Ya existe una franja en ese horario y consultorio'
      });
      return;
    }
    
    setTimeSlots([...timeSlots, newSlot]);
    setIsCreateDialogOpen(false);
    console.log('Nueva franja creada:', newSlot); // debug log
    toast.success('Franja horaria creada exitosamente', {
      description: `${slotData.specialty} - ${slotData.startTime} a ${slotData.endTime}`
    });
  };

  const handleUpdateSlot = (slotData: Omit<TimeSlot, 'id' | 'status'>) => {
    if (editingSlot) {
      setTimeSlots(timeSlots.map(slot => 
        slot.id === editingSlot.id 
          ? { ...slot, ...slotData }
          : slot
      ));
      setEditingSlot(null);
      toast.success('Franja horaria actualizada exitosamente');
    }
  };

  const handleDeleteSlot = (slotId: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
    toast.success('Franja horaria eliminada exitosamente');
  };

  const filteredAndSortedSlots = timeSlots
    .filter(slot => filterSpecialty === 'all' || slot.specialty === filterSpecialty)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return a.startTime.localeCompare(b.startTime);
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500 text-white">Disponible</Badge>;
      case 'booked':
        return <Badge className="bg-blue-500 text-white">Ocupado</Badge>;
      case 'blocked':
        return <Badge className="bg-red-500 text-white">Bloqueado</Badge>;
      default:
        return <Badge >Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Gestión de Franjas Horarias</h1>
          <p className="text-muted-foreground">
            Administre la disponibilidad de horarios para consultas médicas
          </p>
        </div>

        {hasPermission('create') && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Crear Franja Horaria
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nueva Franja Horaria</DialogTitle>
              </DialogHeader>
              <TimeSlotForm
                onSubmit={handleCreateSlot}
                onCancel={() => setIsCreateDialogOpen(false)}
                specialties={specialties}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters and Sorting */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="specialty-filter" className="sr-only">
                Filtrar por especialidad
              </label>
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger id="specialty-filter">
                  <SelectValue placeholder="Filtrar por especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las especialidades</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="sort-filter" className="sr-only">
                Ordenar por
              </label>
              <Select value={sortBy} onValueChange={(value: 'date' | 'time') => setSortBy(value)}>
                <SelectTrigger id="sort-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Ordenar por fecha</SelectItem>
                  <SelectItem value="time">Ordenar por hora</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots List */}
      <div className="grid gap-4">
        {filteredAndSortedSlots.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No hay franjas horarias que coincidan con los filtros seleccionados.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedSlots.map((slot) => (
            <Card key={slot.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3>{slot.doctorName}</h3>
                      {getStatusBadge(slot.status)}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" aria-hidden="true" />
                        <span>{slot.specialty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span>{slot.office}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span>
                          {new Date(slot.date).toLocaleDateString('es-ES')} • {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {hasPermission('edit') && (
                    <div className="flex gap-2">
                      <Dialog open={editingSlot?.id === slot.id} onOpenChange={(open) => !open && setEditingSlot(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSlot(slot)}
                            aria-label={`Editar franja horaria de ${slot.doctorName}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Editar Franja Horaria</DialogTitle>
                          </DialogHeader>
                          {editingSlot && (
                            <TimeSlotForm
                              initialData={editingSlot}
                              onSubmit={handleUpdateSlot}
                              onCancel={() => setEditingSlot(null)}
                              specialties={specialties}
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            aria-label={`Eliminar franja horaria de ${slot.doctorName}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Está seguro de que desea eliminar esta franja horaria? 
                              Esta acción no se puede deshacer y puede afectar citas ya programadas.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
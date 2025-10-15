'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { TimeSlot } from './data';

interface TimeSlotFormData {
  nombreEspecialidad: string;
  numeroConsultorio: string;
  date: string;
  startTime: string;
  endTime: string;
  nombreProfesional: string;
}

// Prop que el manager espera al crear/actualizar
export type TimeSlotManagerSubmitData = Omit<TimeSlot, 'idDisponibilidad' | 'activa'>;

interface TimeSlotFormProps {
  initialData?: TimeSlot;
  onSubmit: (data: TimeSlotManagerSubmitData) => void;
  onCancel: () => void;
  specialties: string[];
}

export function TimeSlotForm({ initialData, onSubmit, onCancel, specialties }: TimeSlotFormProps) {
  const [formData, setFormData] = useState<TimeSlotFormData>(
    initialData
      ? {
          nombreEspecialidad: initialData.nombreEspecialidad,
          numeroConsultorio: initialData.numeroConsultorio,
          date: initialData.date,
          startTime: initialData.horaFranja.split(' - ')[0],
          endTime: initialData.horaFranja.split(' - ')[1],
          nombreProfesional: initialData.nombreProfesional,
        }
      : {
          nombreEspecialidad: '',
          numeroConsultorio: '',
          date: '',
          startTime: '',
          endTime: '',
          nombreProfesional: '',
        }
  );

  const [errors, setErrors] = useState<Partial<TimeSlotFormData>>({});

  const offices = [
    'Consultorio 1',
    'Consultorio 2',
    'Consultorio 3',
    'Consultorio 4',
    'Consultorio 5',
    'Sala de Procedimientos',
    'Consultorio VIP'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<TimeSlotFormData> = {};

    if (!formData.nombreEspecialidad) newErrors.nombreEspecialidad = 'La especialidad es requerida';
    if (!formData.numeroConsultorio) newErrors.numeroConsultorio = 'El consultorio es requerido';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.startTime) newErrors.startTime = 'La hora de inicio es requerida';
    if (!formData.endTime) newErrors.endTime = 'La hora de fin es requerida';
    if (!formData.nombreProfesional) newErrors.nombreProfesional = 'El nombre del médico es requerido';

    // Validate time range
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      
      if (start >= end) {
        newErrors.endTime = 'La hora de fin debe ser posterior a la hora de inicio';
      }
    }

    // Validate date is not in the past
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'No se pueden crear franjas en fechas pasadas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        nombreEspecialidad: formData.nombreEspecialidad,
        numeroConsultorio: formData.numeroConsultorio,
        date: formData.date,
        horaFranja: `${formData.startTime} - ${formData.endTime}`,
        nombreProfesional: formData.nombreProfesional,
      });
    } else {
      toast.error('Por favor corrija los errores en el formulario');
    }
  };

  const handleInputChange = (field: keyof TimeSlotFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="specialty">Especialidad *</Label>
        <Select
          value={formData.nombreEspecialidad}
          onValueChange={(value) => handleInputChange('nombreEspecialidad', value)}
        >
          <SelectTrigger id="specialty" aria-describedby={errors.nombreEspecialidad ? 'specialty-error' : undefined}>
            <SelectValue placeholder="Seleccione una especialidad" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map(specialty => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.nombreEspecialidad && (
          <p id="specialty-error" className="text-sm text-destructive" role="alert">
            {errors.nombreEspecialidad}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="office">Consultorio *</Label>
        <Select
          value={formData.numeroConsultorio}
          onValueChange={(value) => handleInputChange('numeroConsultorio', value)}
        >
          <SelectTrigger id="office" aria-describedby={errors.numeroConsultorio ? 'office-error' : undefined}>
            <SelectValue placeholder="Seleccione un consultorio" />
          </SelectTrigger>
          <SelectContent>
            {offices.map(office => (
              <SelectItem key={office} value={office}>
                {office}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.numeroConsultorio && (
          <p id="office-error" className="text-sm text-destructive" role="alert">
            {errors.numeroConsultorio}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="doctorName">Nombre del Médico *</Label>
        <Input
          id="doctorName"
          value={formData.nombreProfesional}
          onChange={(e) => handleInputChange('nombreProfesional', e.target.value)}
          placeholder="Ej: Dr. Juan Pérez"
          aria-describedby={errors.nombreProfesional ? 'doctor-error' : undefined}
        />
        {errors.nombreProfesional && (
          <p id="doctor-error" className="text-sm text-destructive" role="alert">
            {errors.nombreProfesional}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Fecha *</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          aria-describedby={errors.date ? 'date-error' : undefined}
        />
        {errors.date && (
          <p id="date-error" className="text-sm text-destructive" role="alert">
            {errors.date}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Hora de Inicio *</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            aria-describedby={errors.startTime ? 'start-time-error' : undefined}
          />
          {errors.startTime && (
            <p id="start-time-error" className="text-sm text-destructive" role="alert">
              {errors.startTime}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">Hora de Fin *</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
            aria-describedby={errors.endTime ? 'end-time-error' : undefined}
          />
          {errors.endTime && (
            <p id="end-time-error" className="text-sm text-destructive" role="alert">
              {errors.endTime}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {initialData ? 'Actualizar' : 'Crear'} Franja
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
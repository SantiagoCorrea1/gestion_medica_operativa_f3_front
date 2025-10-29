'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { TimeSlot } from './data';
import SelectInput, { SelectData } from '@/components/selectInput';
import { ProfesionalResponse } from '@/services/professionalService';
import { Label } from '@/components/ui/label';

// interface TimeSlotFormData {
//   nombreEspecialidad: string;
//   numeroConsultorio: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   nombreProfesional: string;
// }

export interface TimeSlotFormData {
    idDisponibilidad: number,
    idProfesional: number,
    idEspecialidad: number,
    idFranjaHoraria: number,
    idConsultorio: number,
    activa: boolean,
}

interface TimeSlotFormErrors {
  idEspecialidad?: string;
  idConsultorio?: string;
  idHoraFranja?: string;
  idProfesional?: string;
  activa?: string
}

// Prop que el manager espera al crear/actualizar
// export type TimeSlotManagerSubmitData = Omit<TimeSlot, 'idDisponibilidad' | 'activa'>;
export type TimeSlotManagerSubmitData = TimeSlotFormData;

interface TimeSlotFormProps {
  initialData?: TimeSlotFormData;
  onSubmit: (data: TimeSlotManagerSubmitData) => void;
  onCancel: () => void;
  profesionals: SelectData[];
  offices: SelectData[];
  times: SelectData[];
  specialties: SelectData[];
}

export function TimeSlotForm({ initialData, onSubmit, onCancel, specialties, profesionals, offices, times }: TimeSlotFormProps) {
  const [formData, setFormData] = useState<TimeSlotFormData>(
    initialData
      ? { 
          idDisponibilidad: initialData.idDisponibilidad,
          idEspecialidad: initialData.idEspecialidad,
          idConsultorio: initialData.idConsultorio,
          idFranjaHoraria: initialData.idFranjaHoraria,
          idProfesional: initialData.idProfesional,
          activa: initialData.activa,
        }
      : {
          idDisponibilidad: 0, 
          idEspecialidad: 0,
          idConsultorio: 0,
          idFranjaHoraria: 0,
          idProfesional: 0,
          activa: false,
        }
  );

  const [errors, setErrors] = useState<Partial<TimeSlotFormErrors>>({});

  const handleChangeSelect = (name: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<TimeSlotFormErrors> = {};
    
    if (!formData.idEspecialidad) newErrors.idEspecialidad = 'La especialidad es requerida';
    if (!formData.idConsultorio) newErrors.idConsultorio = 'El consultorio es requerido';
    if (!formData.idFranjaHoraria) newErrors.idHoraFranja = 'La hora es requerida';
    if (!formData.idProfesional) newErrors.idProfesional = 'El nombre del médico es requerido';

    // // Validate time range
    // if (formData.startTime && formData.endTime) {
    //   const start = new Date(`2000-01-01T${formData.startTime}`);
    //   const end = new Date(`2000-01-01T${formData.endTime}`);
      
    //   if (start >= end) {
    //     newErrors.endTime = 'La hora de fin debe ser posterior a la hora de inicio';
    //   }
    // }

    // // Validate date is not in the past
    // if (formData.date) {
    //   const selectedDate = new Date(formData.date);
    //   const today = new Date();
    //   today.setHours(0, 0, 0, 0);
      
    //   if (selectedDate < today) {
    //     newErrors.date = 'No se pueden crear franjas en fechas pasadas';
    //   }
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        idEspecialidad: formData.idEspecialidad,
        idConsultorio: formData.idConsultorio,
        idFranjaHoraria: formData.idFranjaHoraria,
        idProfesional: formData.idProfesional,
        idDisponibilidad: formData.idDisponibilidad,
        activa: formData.activa,
      });

    } else {
      toast.error('Por favor corrija los errores en el formulario');
    }
  };

  // const handleInputChange = (field: keyof TimeSlotFormErrors, value: string) => {
  //   setFormData(prev => ({ ...prev, [field]: value }));
  //   // Clear error when user starts typing
  //   if (errors[field]) {
  //     setErrors(prev => ({ ...prev, [field]: undefined }));
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <SelectInput 
          data={specialties} 
          label={'Especialidad'}
          onChange={(value) => handleChangeSelect('idEspecialidad', value ?? specialties[0].value)}
          selected={formData.idEspecialidad}   
        />
        {errors.idEspecialidad && (
          <p id="specialty-error" className="text-sm text-destructive" role="alert">
            {errors.idEspecialidad}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <SelectInput 
          data={profesionals} 
          label={'Profesional'}
          onChange={(value) => handleChangeSelect('idProfesional', value ?? specialties[0].value)}  
          selected={formData.idProfesional}
        />
        {errors.idProfesional && (
          <p id="office-error" className="text-sm text-destructive" role="alert">
            {errors.idProfesional}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <SelectInput 
          data={times} 
          label={'Franja horaria'}
          onChange={(value) => handleChangeSelect('idFranjaHoraria', value ?? times[0].value)} 
          selected={formData.idFranjaHoraria} 
        />
        {errors.idHoraFranja && (
          <p id="specialty-error" className="text-sm text-destructive" role="alert">
            {errors.idHoraFranja}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <SelectInput 
          data={offices} 
          label="Consultorio"
          onChange={(value) => handleChangeSelect('idConsultorio', value ?? times[0].value)}    
          selected={formData.idConsultorio}
        />
        {errors.idConsultorio && (
          <p id="specialty-error" className="text-sm text-destructive" role="alert">
            {errors.idConsultorio}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>¿Activa?</Label>
        <input
          type="checkbox"
          checked={formData.activa ?? false}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, activa: e.target.checked }))
          }
        />
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
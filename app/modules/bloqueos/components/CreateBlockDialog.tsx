'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OperationalBlock, reasonOptions } from './data';
import { TimeSlot } from '../../horario/components/data';

interface CreateBlockDialogProps {
  onBlockCreated: (newBlock: OperationalBlock) => void;
  timeSlots: TimeSlot[];
}

export function CreateBlockDialog({ onBlockCreated, timeSlots }: CreateBlockDialogProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    doctor: '',
    specialty: '',
  });

  // Generamos la lista de doctores dinámicamente desde los timeSlots
  const doctors = Array.from(
    new Map(
      timeSlots.map(slot => [slot.nombreProfesional, { name: slot.nombreProfesional, specialty: slot.nombreEspecialidad }])
    ).values()
  );

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason || !formData.doctor) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate > endDate) {
      toast.error('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }

    const selectedDoctor = doctors.find((d) => d.name === formData.doctor);

    const newBlock: OperationalBlock = {
      id: Date.now().toString(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      doctor: formData.doctor,
      specialty: selectedDoctor?.specialty || '',
      status: startDate > new Date() ? 'upcoming' : 'active',
      affectedSlots: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * 3, // Estimate
    };

    onBlockCreated(newBlock);
    setFormData({ startDate: '', endDate: '', reason: '', doctor: '', specialty: '' });
    setIsCreateDialogOpen(false);

    toast.success('Bloqueo operativo creado exitosamente', {
      description: `${formData.doctor} - ${formData.startDate} al ${formData.endDate}`,
    });
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Crear Bloqueo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Bloqueo Operativo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreateBlock} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Médico *</Label>
            <Select value={formData.doctor} onValueChange={(value) => {
                const doctor = doctors.find((d) => d.name === value);
                setFormData((prev) => ({ ...prev, doctor: value, specialty: doctor?.specialty || '' }));
              }}>
              <SelectTrigger id="doctor"><SelectValue placeholder="Seleccione un médico" /></SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.name} value={doctor.name}>{doctor.name} - {doctor.specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio *</Label>
              <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de Fin *</Label>
              <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))} min={formData.startDate || new Date().toISOString().split('T')[0]} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo del Bloqueo *</Label>
            <Select value={formData.reason} onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value }))}>
              <SelectTrigger id="reason"><SelectValue placeholder="Seleccione un motivo" /></SelectTrigger>
              <SelectContent>
                {reasonOptions.map((reason) => (<SelectItem key={reason} value={reason}>{reason}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          {formData.reason === 'Otro' && (
            <div className="space-y-2">
              <Label htmlFor="customReason">Especifique el motivo</Label>
              <Textarea id="customReason" placeholder="Describa el motivo del bloqueo..." onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))} />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Crear Bloqueo</Button>
            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">Cancelar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
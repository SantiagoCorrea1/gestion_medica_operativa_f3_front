import { api } from "@/api/client";
import { TimeSlot } from "@/app/modules/horario/components/data"; 
import { TimeSlotFormData } from "@/app/modules/horario/components/TimeSlotForm";

// Obtener todos los time slots
export async function getAllTimeSlots(): Promise<TimeSlot[]> {
  const { data } = await api.get<TimeSlot[]>("/");
  return data;
}

// Obtener un time slot por ID
export async function getTimeSlotById(id: number): Promise<TimeSlot> {
  const { data } = await api.get<TimeSlot>(`/${id}`);
  return data;
}

// Crear un nuevo time slot
export async function createTimeSlot(time_slot: TimeSlotFormData){
  await api.post<TimeSlot>("crear", time_slot);
  return;
}

// Actualizar un time slot
export async function updateTimeSlot(id: number, time_slot: TimeSlotFormData) {
  await api.put<TimeSlotFormData>(`/${id}`, time_slot);
  return;
}

// Eliminar un time slot
export async function deleteTimeSlot(id: number): Promise<void> {
  await api.delete<void>(`/${id}`);
  return;
}

// Obtener todos los time slots de un profesional
export async function getTimeSlotsByProfessional(professional_id: number): Promise<TimeSlot[]> {
  const { data } = await api.get<TimeSlot[]>(`/profesional/${professional_id}`);
  return data;
}

// Obtener solo los time slots activos de un profesional
export async function getActiveTimeSlotsByProfessional(professional_id: number): Promise<TimeSlot[]> {
  const { data } = await api.get<TimeSlot[]>(`/profesional/${professional_id}/activas`);
  return data;
}

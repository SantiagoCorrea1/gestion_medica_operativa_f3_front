import { api } from "@/api/client";
import { ITimeSlot } from "@/types/ITimeSlot";

// Obtener todos los time slots
export async function getAllTimeSlots(): Promise<ITimeSlot[]> {
  const { data } = await api.get<ITimeSlot[]>("/");
  return data;
}

// Obtener un time slot por ID
export async function getTimeSlotById(id: number): Promise<ITimeSlot> {
  const { data } = await api.get<ITimeSlot>(`/${id}`);
  return data;
}

// Crear un nuevo time slot
export async function createTimeSlot(time_slot: ITimeSlot): Promise<ITimeSlot> {
  const { data } = await api.post<ITimeSlot>("/", time_slot);
  return data;
}

// Actualizar un time slot
export async function updateTimeSlot(id: number, time_slot: ITimeSlot): Promise<ITimeSlot> {
  const { data } = await api.put<ITimeSlot>(`/${id}`, time_slot);
  return data;
}

// Eliminar un time slot
export async function deleteTimeSlot(id: number): Promise<void> {
  await api.delete<void>(`/${id}`);
}

// Obtener todos los time slots de un profesional
export async function getTimeSlotsByProfessional(professional_id: number): Promise<ITimeSlot[]> {
  const { data } = await api.get<ITimeSlot[]>(`/profesional/${professional_id}`);
  return data;
}

// Obtener solo los time slots activos de un profesional
export async function getActiveTimeSlotsByProfessional(professional_id: number): Promise<ITimeSlot[]> {
  const { data } = await api.get<ITimeSlot[]>(`/profesional/${professional_id}/activas`);
  return data;
}

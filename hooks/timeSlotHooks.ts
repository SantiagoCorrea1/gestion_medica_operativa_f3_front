import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  getTimeSlotsByProfessional,
  getActiveTimeSlotsByProfessional,
} from "@/services/timeSlotService";
import { TimeSlot } from "@/app/modules/horario/components/data";
import { TimeSlotFormData } from "@/app/modules/horario/components/TimeSlotForm";


//Obtener todos los time slots
export function useAllTimeSlots() {
  return useQuery<TimeSlot[]>({
    queryKey: ["time-slots"],
    queryFn: getAllTimeSlots,
  });
}

//Obtener un time slot por ID
export function useTimeSlotById(id?: number) {
  return useQuery<TimeSlot>({
    queryKey: ["time-slot", id],
    queryFn: () => getTimeSlotById(id!),
    enabled: !!id,
  });
}


//Obtener time slots de un profesional
export function useTimeSlotsByProfessional(professionalId?: number) {
  return useQuery<TimeSlot[]>({
    queryKey: ["time-slots", "professional", professionalId],
    queryFn: () => getTimeSlotsByProfessional(professionalId!),
    enabled: !!professionalId,
  });
}


//Obtener time slots activos de un profesional
export function useActiveTimeSlotsByProfessional(professionalId?: number) {
  return useQuery<TimeSlot[]>({
    queryKey: ["time-slots", "active", professionalId],
    queryFn: () => getActiveTimeSlotsByProfessional(professionalId!),
    enabled: !!professionalId,
  });
}


//Crear un nuevo time slot
export function useCreateTimeSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTimeSlot,
    onSuccess: () => {
      // Invalida la lista para refrescar
      queryClient.invalidateQueries({ queryKey: ["time-slots"] });
    },
  });
}


//Actualizar un time slot existente
export function useUpdateTimeSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, time_slot }: { id: number; time_slot: TimeSlotFormData }) =>
      updateTimeSlot(id, time_slot),
    onSuccess: (_, { id }) => {
      // Refresca solo el elemento actualizado y la lista
      queryClient.invalidateQueries({ queryKey: ["time-slot", id] });
      queryClient.invalidateQueries({ queryKey: ["time-slots"] });
    },
  });
}


//Eliminar un time slot
export function useDeleteTimeSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTimeSlot(id),
    onSuccess: () => {
      // Refresca la lista de time slots
      queryClient.invalidateQueries({ queryKey: ["time-slots"] });
    },
  });
}

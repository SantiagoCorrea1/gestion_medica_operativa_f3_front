import { useQuery } from "@tanstack/react-query";
import { ITimeSlot } from "@/types/ITimeSlot";
import { getTimeSlotsByProfessional } from "@/services/timeSlotService";
import { TimeSlot } from "@/app/modules/horario/components/data";

export function useTimeSlotsByProfessional(professionalId: number) {

    return useQuery<TimeSlot[]>({
        queryKey: ["time-slots", professionalId],
        queryFn: () => getTimeSlotsByProfessional(professionalId),
        enabled: !!professionalId,
    });
}

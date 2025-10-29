import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProfessionals, ProfesionalResponse } from "@/services/professionalService";
import { FranjaResponse, getAllTimes } from "@/services/timeSerivice";
import { EspecialidadResponse, getAllSpecialitys } from "@/services/specialityService";
import { ConsultorioResponse, getAllOffices } from "@/services/officeService";



// Obtener todas las franjas horarias
export function useAllTimes() {
  return useQuery<FranjaResponse[]>({
    queryKey: ["franjas"],
    queryFn: getAllTimes,
  });
}

// Obtener todas las especialidades
export function useAllEspecialidades() {
  return useQuery<EspecialidadResponse[]>({
    queryKey: ["especialidades"],
    queryFn: getAllSpecialitys,
  });
}

// Obtener todos los consultorios
export function useAllConsultorios() {
  return useQuery<ConsultorioResponse[]>({
    queryKey: ["consultorios"],
    queryFn: getAllOffices,
  });
}

// Obtener todos los profesionales
export function useAllProfesionales() {
  return useQuery<ProfesionalResponse[]>({
    queryKey: ["profesionales"],
    queryFn: getAllProfessionals,
  });
}

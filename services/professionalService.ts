import { api } from "@/api/client";

export interface ProfesionalResponse {
  idProfesional: number;
  cedula: number;
  nombres: string;
  apellidos: string;
  activo: boolean;
}


// Obtener todos los horarios
export async function getAllProfessionals(): Promise<ProfesionalResponse[]> {
  const { data } = await api.get<ProfesionalResponse[]>("/api/profesionales");
  return data;
}

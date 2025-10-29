import { api } from "@/api/client";

export interface EspecialidadResponse {
  idEspecialidad: number;
  especialidad: string;
}

// Obtener todos los horarios
export async function getAllSpecialitys(): Promise<EspecialidadResponse[]> {
  const { data } = await api.get<EspecialidadResponse[]>("/api/especialidades");
  return data;
}

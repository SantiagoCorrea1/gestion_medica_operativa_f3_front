import { api } from "@/api/client";

export interface ConsultorioResponse {
  idConsultorio: number;
  numeroConsultorio: number;
  tipoConsultorio: string;
}

// Obtener todos los consultorios
export async function getAllOffices(): Promise<ConsultorioResponse[]> {
  const { data } = await api.get<ConsultorioResponse[]>("/api/consultorios");
  return data;
}


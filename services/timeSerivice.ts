import { api } from "@/api/client";

export interface FranjaResponse {
  idFranja: number;
  horaInicio: TimeData;
  horaFinal: TimeData;
}

export interface TimeData {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

// Obtener todos los horarios
export async function getAllTimes(): Promise<FranjaResponse[]> {
  const { data } = await api.get<FranjaResponse[]>("/api/franjas-horarias");
  return data;
}

import { Materia } from "./Materia";

export interface Disciplina {
  id: number;
  name: string;
  materias: Materia[]
}

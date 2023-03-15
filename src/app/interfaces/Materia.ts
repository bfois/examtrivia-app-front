import { Disciplina } from "./Disciplina";
import { Temas } from "./Temas";

export interface Materia{
  id:number,
  name:string,
  temas: Temas[],
  disciplina:Disciplina
}

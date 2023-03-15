import { Materia } from "./Materia";
import { Pregunta } from "./Pregunta";

export interface Temas {
  id:number,
  name:string,
  preguntas:Pregunta[],
  materia:Materia
}

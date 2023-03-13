import { Pregunta } from "./Pregunta";
import { Respuesta } from "./Respuesta";

export interface PreguntaRespuesta{
  id:number,
  pregunta: Pregunta,
  respuesta: Respuesta,
  esVerdadera:boolean
}

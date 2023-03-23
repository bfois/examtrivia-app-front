import { Pregunta } from "./Pregunta";
import { PreguntaRespuesta } from "./PreguntaRespuesta";

export interface PreguntaConRespuestas {
  pregunta: Pregunta;
  respuestas: PreguntaRespuesta[];
}

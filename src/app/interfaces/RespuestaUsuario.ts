import { Pregunta } from "./Pregunta";
import { PreguntaRespuesta } from "./PreguntaRespuesta";
import { Respuesta } from "./Respuesta";

export interface RespuestaUsuario {
  pregunta: Pregunta;
  respuesta: Respuesta;
  esCorrecta: boolean;
  opcionCorrecta:PreguntaRespuesta | undefined;
}

import { Pregunta } from "./Pregunta";
import { Respuesta } from "./Respuesta";

export interface RespuestaUsuario {
  pregunta: Pregunta;
  respuesta: Respuesta;
  esCorrecta: boolean;
}


import { Respuesta } from "./Respuesta";


export interface Pregunta {
id:number,
enunciado:string,
imgURL?:string,
yaSeleccionada:boolean,
respuestas: Respuesta[],
}

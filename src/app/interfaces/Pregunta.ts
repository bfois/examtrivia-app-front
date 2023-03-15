
import { Respuesta } from "./Respuesta";
import { Temas } from "./Temas";


export interface Pregunta {
id:number,
enunciado:string,
imgURL?:string,
yaSeleccionada:boolean,
respuestas: Respuesta[],
temas:Temas
}

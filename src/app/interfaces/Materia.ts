import { Temas } from "./Temas";

export interface Materia{
  id:number,
  name:string,
  temas: Temas[]
}

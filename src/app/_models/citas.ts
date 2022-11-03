import { Tratamiento } from './tratamiento';
export class Citas{
    id_cita?:number;
    id_medico?:number;
    Fecha?:Date;
    Lugar?:string;
    Especialidad?:String;
    Notas?:String;
    Tratamiento?:Tratamiento;
  }

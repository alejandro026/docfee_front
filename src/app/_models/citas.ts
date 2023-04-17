import { Tratamiento } from './tratamiento';
export class Citas{
    id_cita?:number;
    id_medico?:number;
    fecha?:Date;
    lugar?:string;
    especialidad?:String;
    notas?:String;
    id_tramiento?:number;


    tratamiento:Tratamiento;
    confirmada:boolean;

  }

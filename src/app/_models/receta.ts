import { Citas } from './citas';
export class Recetas{

  id_receta: number;
  id_cita: Citas;
  diagnostico?: string;
  edad?:number;
  fecha?: Date;
  Medicamento?: string;
  Horarios?: number;
  Tareas?: string;
  ProximaCita?:Date;
}

import { Antecedentes } from './antecedentes';
export class Usuario {
  id_usuario: number;
  nombre: string;
  apPaterno: string;
  apMaterno:string;
  nss: string;
  telefono: string;
  id_UsuarioConfianza: Usuario;
  sexo:string;
  fechaNacimiento:Date;
  correo: string;
  ocupacion: string;
  antecedentes: Antecedentes;
}

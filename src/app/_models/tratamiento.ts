import { Usuario } from './usuario';
export class Tratamiento{
  id_tratamiento:string;
    id_usuario:Usuario;

    id_medico:number;

    descripcion:string;

    ipas_SisTegumentario:string;

    ipas_SisMuscular:string;


    ipas_SisOseo:string;

    ipas_SisNervioso:string;
    ipas_SisEndocrino:string;

    ipas_SisInmunologico:string;

    ipas_SirCirculatorio:string;

    ipas_ApaUrinario:string;

    ipas_ApaRespiratorio:string;


    ipas_ApaDigestivo:string;

    ipas_ApaReproductor:string;

    presionArterial:number;

    frec_Cardiaca:number;

    frec_Respiratoria:number;

    temperaatura:number;

    altura:number;
    imc:number;

    aspectos_Generales:string;

    documentosEstudios:string;

    diagnosticoPresuntivo:string;

    tratamientoEmpleadoIntegral:string;
}

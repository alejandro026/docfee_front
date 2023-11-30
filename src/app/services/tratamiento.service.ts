import { DocumentoUpdate } from './../_models/DocumentoUpdate';
import { VistaTratamiento } from './../_models/vistaTratatamiento';
import { Tratamiento } from './../_models/tratamiento';
import { Usuario } from './../_models/usuario';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Antecedentes } from '../_models/antecedentes';
import { TratamientoDto2 } from '../_models/tratamientodto2';


@Injectable({
  providedIn: 'root'
})

export class TratamientoService {

   url="http://localhost:8081/tratamiento/";
   url2="http://localhost:8081/";

  constructor(
    private http: HttpClient
  ) { }

  consultarTodos():Observable<Tratamiento[]>{

    return this.http.get<Tratamiento[]>(this.url+"consultarTodos",
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  consultarTodosVista(id:number):Observable<VistaTratamiento[]>{

    return this.http.get<VistaTratamiento[]>(this.url+"consultarTodosVista/"+id,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  consultarTodosVistaDR():Observable<VistaTratamiento[]>{

    return this.http.get<VistaTratamiento[]>(this.url+"consultarTodosVistaDR/",
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
  consultarTodosVistaIdUsuario(id:string):Observable<VistaTratamiento[]>{

    return this.http.get<VistaTratamiento[]>(this.url+"consultarTodosVistaIdUsuario/"+id,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  buscarPorId(id:number): Observable<Tratamiento>{
    return this.http.get<Tratamiento>(this.url+"buscarPorId/"+id,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
  buscarPorUsuario(id:number): Observable<any>{
    return this.http.get<any>(this.url+"buscarPorUsuario/"+id,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
  actualizar(tratamiento: Tratamiento): Observable<Tratamiento>{
    return this.http.put<Tratamiento>(this.url+"actualizar", tratamiento,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  actualizarDocumento(update:DocumentoUpdate):Observable<boolean>{
    return this.http.post<boolean>(this.url+"actualizarDocumento", update,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }


  guardarAntecedentes(antecedentes:Antecedentes):Observable<Antecedentes>{
    return this.http.post<Antecedentes>(this.url2+"antecedentes/guardar", antecedentes,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  guardaExpediente(expedinete:TratamientoDto2){
    return this.http.post<Tratamiento>(this.url+"guardar", expedinete,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
}

import { VistaTratamiento } from './../_models/vistaTratatamiento';
import { Tratamiento } from './../_models/tratamiento';
import { Usuario } from './../_models/usuario';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TratamientoService {

   url="http://localhost:8083/tratamiento/";

  constructor(
    private http: HttpClient
  ) { }

  consultarTodos():Observable<Tratamiento[]>{

    return this.http.get<Tratamiento[]>(this.url+"consultarTodos",
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  consultarTodosVista():Observable<VistaTratamiento[]>{

    return this.http.get<VistaTratamiento[]>(this.url+"consultarTodosVista",
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  buscarPorId(id:number): Observable<Tratamiento>{
    return this.http.get<Tratamiento>(this.url+"buscarPorId/"+id,
    {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
}

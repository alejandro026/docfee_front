import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../_models/loginUsuario';

@Injectable({
  providedIn: 'root'
})
export class cerrarServices{
  sesion:LoginUsuario;
  urlCerrar="http://localhost:8081/deleteSession";
  status: string;
  constructor(
    private http: HttpClient
  ) { }

    // cerrarSession(name:LoginUsuario): Observable<Object>{
    //   let nombre=name.nombre;
    //   return this.http.delete(this.urlCerrar,nombre,
    //     {headers: new HttpHeaders().append("Content-Type", "application/json")});
    // }

    cerrarSession(sesion:LoginUsuario):Observable<Object>{
      return this.http.post<Object>(this.urlCerrar,sesion,
        {headers: new HttpHeaders().append("Content-Type", "application/json")});
    }
}

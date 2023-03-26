import { Usuario } from './../_models/usuario';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Mensaje } from '../_models/menaje';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

   url="http://localhost:8083/usuarios";

  constructor(
    private http: HttpClient
  ) { }

  consultarTodos():Observable<Usuario[]>{

    return this.http.get<Usuario[]>(this.url+"/consultarTodos",
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  actualizarUsuario(user:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.url+"/actualizar",user,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  guardarUsuario(user:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url+"/guardar",user,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

  mensajeWhatsapp(user:Mensaje):Observable<Usuario>{
    let url="http://localhost:8083/mensaje/autorizacion";
    return this.http.post<Usuario>(url,user,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }

}

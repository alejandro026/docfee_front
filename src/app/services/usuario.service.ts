import { Usuario } from './../_models/usuario';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

   url="http://localhost:8083/usuarios/consultarTodos";

  constructor(
    private http: HttpClient
  ) { }

  consultarTodos():Observable<Usuario[]>{

    return this.http.get<Usuario[]>(this.url,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
}

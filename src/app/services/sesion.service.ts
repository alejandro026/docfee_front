import { Solicitud } from './../_models/solicitud';
import { LoginUsuario } from './../_models/loginUsuario';
import { Citas } from './../_models/citas';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CitasService {

   url="http://localhost:8083/login";

  constructor(
    private http: HttpClient
  ) { }

  consultarUsuario(solicitud:Solicitud):Observable<LoginUsuario>{
    return this.http.post<LoginUsuario>(this.url+"/login",solicitud,
      {headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
}
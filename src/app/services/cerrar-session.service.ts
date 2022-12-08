import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../_models/loginUsuario';

@Injectable({
  providedIn: 'root'
})
export class cerrarServices{
  sesion:LoginUsuario;
  urlCerrar="http://localhost:8083/deleteSession/";
  status: string;
  constructor(
    private http: HttpClient
  ) { }

    cerrarSession(name:String): Observable<Object>{
      console.log("name: "+name)
      console.log("url: "+this.urlCerrar+name.replace(" ","%20").replace(" ","%20"))
      return this.http.delete(this.urlCerrar+name,
        {headers: new HttpHeaders().append("Content-Type", "application/json")});
    }
}
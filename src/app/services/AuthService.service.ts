import { LoginUsuario } from './../_models/loginUsuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  sesion:LoginUsuario;

  constructor(
    private http: HttpClient
  ) { }

    validaSesion(){
      this.sesion=JSON.parse(sessionStorage.getItem('sesion')!);

      if(this.sesion==null){
        return false;
      }

      if(this.sesion.approved==true){
        return true;
      }else{
        return false;
      }
    }
}

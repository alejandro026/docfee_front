import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/AuthService.service';
import { LoginUsuario } from './_models/loginUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    let session: LoginUsuario = JSON.parse (sessionStorage.getItem("sesion")!)

    if(session.tipoUsuario == "PACIENTE"){
        return false;
    }
    return true;

    
  }
  
}

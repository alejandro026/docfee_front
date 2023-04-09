import { Injectable } from '@angular/core';
import { AuthService } from './AuthService.service';
import { cerrarServices } from './cerrar-session.service';
import { LoginUsuario } from '../_models/loginUsuario';
import { Util } from '../utils/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private inactivityTime = 180; // Tiempo de inactividad en segundos. Esta establecido por defecto en 3 minutos
  private timeoutId: any;

  constructor(
    private auth:AuthService,
    private router: Router
  ) { }


  // Método para reiniciar el temporizador
  resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      // Llamar aquí a la función de cierre de sesión
      if (this.auth.validaSesion()) {
        let sesion:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);
        console.log(sesion);
        this.auth.signOut();
        Util.errorMessajeNormal("Su sesión ha sido cerrada por inactividad.")
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    }, this.inactivityTime * 1000);
  }

  // Método para manejar la actividad del usuario
  activityDetected() {
    this.resetTimer();
  }

  // Método para iniciar el temporizador
  startTimer() {
    this.resetTimer();
  }

}

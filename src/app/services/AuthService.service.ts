import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginUsuario } from './../_models/loginUsuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { error } from 'console';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  sesion:LoginUsuario;

  private sessionTimer: any;
  public sessionDuration = 60; //3 minutos por defecto
  public sessionExpired: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private router: Router
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



    signIn(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    signOut() {
        return this.auth.signOut();
    }

    createUser(email: string, password: string) {
        return this.auth.createUserWithEmailAndPassword(email, password).then((result)=>{
          this.sendVerificationMail();
        }).catch((error)=>{
          window.alert(error.message);
        });
    }

    sendVerificationMail() {
      return this.auth.currentUser
        .then((user) => {
          return user?.sendEmailVerification();
        })
        .then(() => {
          // this.router.navigate(['verify-email-address']);
        });
    }

    sendResetPasswordEmail(email: string) {
        return this.auth.sendPasswordResetEmail(email, {
            url: 'http://localhost:5000/'
        });
    }

    get currentUser() {
        return this.auth.user;
    }

    // getTokenExpiration(fecha:Date, detener:boolean): Observable<void> {
    //   return new Observable(observer => {
    //     this.auth.onIdTokenChanged(user => {
    //       if (user!=null) {
    //         user.getIdTokenResult().then(token => {
    //           const expirationTime =token.expirationTime;
    //           let tiempo= new Date(expirationTime).getTime();

    //           // //Datos de prueba
    //           // let dateN= new Date();
    //           fecha.setMinutes(fecha.getMinutes() + 1);

    //           const now = new Date().getTime();
    //           const expiresIn = fecha.getTime() - now;
    //           setTimeout(() => {
    //             observer.next();
    //             if(detener){
    //               return;
    //             }
    //           }, expiresIn);
    //         });
    //       }
    //     });
    //   });
    // }

    tiempoToken(){
      console.log(this.auth.user)
      this.auth.onIdTokenChanged(user => {
        if (user!=null) {
          user.getIdTokenResult().then(token => {
            const expirationTime =token.expirationTime;
            let tiempo= new Date(expirationTime).getTime();

            // //Datos de prueba
            let dateN= new Date();

            // const now = new Date().getTime();
            const expiresIn = dateN.getTime() - tiempo;
            return expiresIn;
          });
        }
      });
    }

    startSessionTimer(){
      console.log(this.tiempoToken());
      this.sessionTimer= setTimeout(() => {
        //Agregar el metofo de cerrar sesion.
        this.sessionExpired.next(true);
      }, this.sessionDuration*1000)
    }

    resetSessionTimer(){
      clearTimeout(this.sessionTimer);
      this.startSessionTimer();
    }

    //Metodo para cerrar la sesion
    logout(){
      this.logout();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }

}

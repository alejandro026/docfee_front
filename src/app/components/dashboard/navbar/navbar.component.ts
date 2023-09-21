import  Swal  from 'sweetalert2';
import { AuthService } from './../../../services/AuthService.service';
import { LoginUsuario } from './../../../_models/loginUsuario';
import { cerrarServices } from './../../../services/cerrar-session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponentComponent } from '../session-expired-dialog-component/session-expired-dialog-component.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  options: UntypedFormGroup


  sesion:LoginUsuario;



  constructor(
    fb: UntypedFormBuilder,
    public observer: BreakpointObserver,
    private router: Router,
    private cerrarServices: cerrarServices,
    private userIdle: UserIdleService,
        //Token
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
    this.authService.startSessionTimer();

    this.authService.sessionExpired.subscribe((expired)=>{
      if(expired && this.authService.validaSesion()){
        const dialogRef = this.dialog.open(SessionExpiredDialogComponentComponent,{
          disableClose: true,
          data: {sessionDuration: this.authService.sessionDuration}
        });

        dialogRef.afterClosed().subscribe((result)=>{
          if(result){
            this.authService.resetSessionTimer();
          }else{
            this.authService.logout();
          }
        });
      }
    })

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {

    this.sesion=JSON.parse(sessionStorage.getItem('sesion')!);
    // let tiempo:Date= new Date();
    // this.authService.getTokenExpiration(tiempo, false).subscribe((data) => {
    //   console.log(data);
    //   this.cerrarSesion2();
    // });

  }

 async cerrarSesion(){
    console.log(this.sesion);

    this.cerrarServices.cerrarSession(this.sesion).subscribe(data=>{
      console.log(data);
    });
    //this.cerrarSesion();
    sessionStorage.clear();
    await this.router.navigate(['/login']);
   return false;
  }

  // cerrarSesion2(){
  //   console.log(this.sesion);
  //   let timerInterval:any;
  //   const swalWithTimeout = Swal.mixin({
  //     didOpen: () => {
  //       timerInterval = setInterval(() => {
  //       }, 100)
  //     },
  //     willClose: () => {
  //       clearInterval(timerInterval)
  //     }
  //   })

  //   swalWithTimeout.fire({
  //     title: 'Tu sesion ha caducado.',
  //     text: '¿Deseas renovar?',
  //     timer: 10000,
  //     icon: 'warning',
  //     showDenyButton: true,
  //     showCancelButton: false,
  //     confirmButtonText: 'Si',
  //     denyButtonText: `No`,
  //     allowOutsideClick: false,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.authService.getTokenExpiration(new Date(), false).subscribe((data) => {
  //         this.cerrarSesion2();
  //       });
  //     } else if (result.isDenied) {
  //       this.authService.getTokenExpiration(new Date(), true).subscribe((data) => {
  //         // this.cerrarSesion2();
  //       });
  //       this.cerrarServices.cerrarSession(this.sesion).subscribe(data=>{
  //         console.log(data);
  //       });
  //       sessionStorage.clear();
  //       this.router.navigate(['/login']);
  //     } else if (result.dismiss === Swal.DismissReason.timer) {
  //       console.log('I was closed by the timer')
  //       sessionStorage.clear();
  //       this.router.navigate(['/login']);
  //     }
  //   })
  // }

}

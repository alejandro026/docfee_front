import { Util } from './../../../utils/util';
import  Swal  from 'sweetalert2';
import { AuthService } from './../../../services/AuthService.service';
import { LoginUsuario } from './../../../_models/loginUsuario';
import { cerrarServices } from './../../../services/cerrar-session.service';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

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

    //Token
    private authService: AuthService
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
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

    this.authService.getTokenExpiration().subscribe((data) => {
      console.log(data);
      this.cerrarSesion2();
    });

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

  async cerrarSesion2(){
    console.log(this.sesion);

    this.cerrarServices.cerrarSession(this.sesion).subscribe(data=>{
      console.log(data);
    });
    //this.cerrarSesion();
    sessionStorage.clear();

    await Swal.fire({
      icon: 'error',
      title: 'Tu sesion a caducado',
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'OK',
      denyButtonText: ``,
      allowOutsideClick: false
    }).then((result:any) => {
      if (result.isConfirmed) {
         this.router.navigate(['/login']);
      }
    })
  }

}

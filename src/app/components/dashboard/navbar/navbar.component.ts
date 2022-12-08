import { LoginUsuario } from './../../../_models/loginUsuario';
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
    private router: Router
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


  }

  async cerrarSesion(){
    sessionStorage.clear();
    return this.router.navigate(['/login']).then(() => false);
  }

}

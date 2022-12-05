import { LoginUsuario } from './../../../_models/loginUsuario';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  options: FormGroup


  sesion:LoginUsuario;



  constructor(
    fb: FormBuilder,
    public observer: BreakpointObserver,
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

}

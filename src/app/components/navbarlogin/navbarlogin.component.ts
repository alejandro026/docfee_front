import { NavigationService } from './../../services/navigation.Service';
import { RegistroComponent } from './../registro/registro.component';
import { LoginFormComponent } from './../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/_models/loginUsuario';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-navbarlogin',
  templateUrl: './navbarlogin.component.html',
  styleUrls: ['./navbarlogin.component.css']
})
export class NavbarloginComponent implements OnInit {

  ref: DynamicDialogRef;

  constructor(
    private dialog: MatDialog,
    private navigationService: NavigationService,
    public dialogService: DialogService
  ) { }

  sesion:LoginUsuario;
  
  ngOnInit(): void {
    this.sesion= JSON.parse(sessionStorage.getItem('sesion')!);
    console.log(this.sesion)
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  iniciarSesion(){
    this.ref = this.dialogService.open(LoginFormComponent, {
      header: "Iniciar Sesión",
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

  }

  registrarUsuario(){
    this.ref = this.dialogService.open(RegistroComponent, {
      header: "Registro",
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }

  navigateToSection(sectionId: string) {
    this.navigationService.navigateToSection(sectionId);
  }

}

import { NavigationService } from './../../services/navigation.Service';
import { RegistroComponent } from './../registro/registro.component';
import { LoginFormComponent } from './../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarlogin',
  templateUrl: './navbarlogin.component.html',
  styleUrls: ['./navbarlogin.component.css']
})
export class NavbarloginComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: "22%",
      // height: "55%",
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.consultarTodos2();
      // alert('Iniciar sesion')
    });
  }

  registrarUsuario(){
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: "22%",
      // height: "55%",
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  navigateToSection(sectionId: string) {
    this.navigationService.navigateToSection(sectionId);
  }

}

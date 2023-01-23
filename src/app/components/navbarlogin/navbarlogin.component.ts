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
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    const dialogRef = this.dialog.open(LoginFormComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.consultarTodos2();
      alert('Iniciar sesion')
    });
  }

}

import { NavigationService } from './../../services/navigation.Service';
import { Solicitud } from './../../_models/solicitud';
import { CitasService } from './../../services/sesion.service';
import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CargarScriptService } from 'src/app/services/cargar-script.service';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/_models/usuario';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup
  hide = true
  ref: DynamicDialogRef;

  constructor(
    private cargaScripts:CargarScriptService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    public fb: UntypedFormBuilder,
    public _snackBar: MatSnackBar,
    public router: Router,
    private citasService:CitasService,

    private dialog: MatDialog,
    private navigationService: NavigationService,
    private  elementRef: ElementRef,
    public dialogService: DialogService
    ) {
    this.form = this.fb.group({
      usuario: ["", Validators.required],
      contraseña: ["", Validators.required]
    })
    cargaScripts.Carga(['login/login'])
  };

  dataSource: MatTableDataSource<Usuario>;

  ngOnInit(): void {

  };


  iniciarSesion(){
    this.ref = this.dialogService.open(LoginFormComponent, {
      // width: '700%',
            // contentStyle: {"max-height": "500px", "overflow": "auto"},
            // baseZIndex: 10000
    });

    // this.ref.afterClosed().subscribe((result) => {
    //   // this.consultarTodos2();
    //   // alert('Iniciar sesion')
    // });
  }

  ingresar() {
    sessionStorage.clear();
    let usuario = this.form.value.usuario;
    let contraseña = this.form.value.contraseña;

    let solicitud:Solicitud=new Solicitud();
    solicitud.usuario=usuario;
    solicitud.password=contraseña;

    this.citasService.consultarUsuario(solicitud).subscribe(data => {
      if(data.approved==true){
        sessionStorage.setItem('sesion', JSON.stringify(data));
        this.loading(data);
      }else{
        this.error();
      this.form.reset();
      }
    });
  };

  error() {
    this._snackBar.open("Usuario o contraseña incorrecto", "Error", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  };

  loading(data:LoginUsuario) {
    if(data.tipoUsuario=="MEDICO"){
      this.router.navigate(["dashboard"]);
    }

    if(data.tipoUsuario=="PACIENTE"){
      this.router.navigate(["dashboard/homepage"]);
    }
  };
  
  searchTerm: string = 'DOCFEE';
  content: string;
  search(): void {

    this.content= document.querySelector(".todo")?.innerHTML!;
    console.log(this.content)
    const regex = new RegExp(this.searchTerm, 'gi');
    const matches = this.content.match(regex);

    console.log(matches)

    if (matches !== null) {
      const contentEl = document.querySelector('.todo')!;
      contentEl.innerHTML = this.content;
      matches.forEach(match => {
        console.error(contentEl)
        // const matchEls = contentEl.querySelectorAll(`:not(.highlight):[data-text*="${match}"]`);
        const matchEls = document.querySelectorAll(':not(.highlight)[data-text*="DOCFEE"]');
        // const matchEls = contentEl.querySelectorAll(`:not(.highlight):contains("${match}")`);
        console.log(matchEls)

        matchEls.forEach(matchEl => {
          matchEl.classList.add('highlight');
        });
      });
      const numMatches = matches.length;
      alert(`${numMatches} matches found.`);
    } else {
      const contentEl = document.querySelector('.todo')!;
      contentEl.innerHTML = this.content;
      const matchEls = contentEl.querySelectorAll('.highlight');
      matchEls.forEach(matchEl => {
        matchEl.classList.remove('highlight');
      });
      alert('No matches found.');
    }
  }

}

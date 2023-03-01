import { NavigationService } from './../../services/navigation.Service';
import { Solicitud } from './../../_models/solicitud';
import { CitasService } from './../../services/sesion.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/_models/loginUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup
  hide = true

  constructor(
    public fb: UntypedFormBuilder,
    public _snackBar: MatSnackBar,
    public router: Router,
    private citasService:CitasService,
    private navigationService: NavigationService,
    private elementRef: ElementRef
    ) {
    this.form = this.fb.group({
      usuario: ["", Validators.required],
      contraseña: ["", Validators.required]
    })
  };

  ngOnInit(): void {
    this.animacionHref();
  };

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


  tsparticles = "tsparticles";

  particlesOptions = {
    particles: {
      number: {
        value: 6,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: [ '#1b1e34' ]
      },
      shape: {
        type: "polygon",
        stroke: {
          width: 0,
          color: "#000"
        },
        polygon: {
          nb_sides: 6
        },
        image: {
          sr: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 100,
        random: false,
        anim: {
          enable: true,
          speed: 10,
          size_min: 40,
          sync: false
        }
      },
      lineLinked: {
        enable: false,
        distance: 200,
        color: "#ffffff",
        opacity: 1,
        widht: 2
      },
      move: {
        enable: true,
        speed: 8,
        random: false,
        straight: false,
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    }
  };


  animacionHref(){
    this.navigationService.navigateToSection$.subscribe(sectionId => {
      const sectionElement = this.elementRef.nativeElement.querySelector(`#${sectionId}`);
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.body.style.scrollPaddingTop = '10%';
    });
  }

}

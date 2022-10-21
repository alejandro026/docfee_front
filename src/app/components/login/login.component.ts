import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  hide = true

  constructor(
    public fb: FormBuilder,
    public _snackBar: MatSnackBar,
    public router: Router
    ) {
    this.form = this.fb.group({
      usuario: ["admin", Validators.required],
      contraseña: ["admin", Validators.required]
    })
  };

  ngOnInit(): void {
  };

  ingresar() {
    const usuario = this.form.value.usuario;
    const contraseña = this.form.value.contraseña;

    if (usuario == "admin" && contraseña == "admin") {
      this.loading();
    } else {
      this.error();
      this.form.reset();
    }
  };

  error() {
    this._snackBar.open("Usuario o contraseña incorrecto", "Error", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  };

  loading() {
    this.router.navigate(["dashboard"]);
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
}

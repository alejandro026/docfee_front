import { ResetPasswordComponent } from './../reset-password/reset-password.component';
import { AuthService } from './../../services/AuthService.service';
import { CitasService } from './../../services/sesion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Solicitud } from './../../_models/solicitud';
import { LoginUsuario } from './../../_models/loginUsuario';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReCaptcha2Component } from 'ngx-captcha';
import Swal from 'sweetalert2'
import { Util } from 'src/app/utils/util';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: UntypedFormGroup
  hide = true

  key: string="6Lfznr8kAAAAAJ5mxeuPpjSbuGcGAQ-zt3vBWvf7";


  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;

  failedLogin: boolean;
  failedLoginMessage: string;
  disableLoginButton: boolean;
  @ViewChild('emailInput') emailInput?: ElementRef;
  @ViewChild('passwordInput') passwordInput?: ElementRef;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  // public size: 'compact' | 'normal' = 'normal';
  public lang = 'es';
  public type: 'image' | 'audio';


  constructor(
    public fb: UntypedFormBuilder,
    public _snackBar: MatSnackBar,
    public router: Router,
    private citasService:CitasService,
    // public dialogRef: MatDialogRef<LoginFormComponent>,
    private authService: AuthService,
    private dialog: MatDialog,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
    ) {
    this.form = this.fb.group({
      usuario: ["", Validators.required],
      contraseña: ["", Validators.required],
      recaptcha: ''
    })
  };

  ngOnInit(): void {
  };

  ingresar() {
    sessionStorage.clear();
    let usuario =this.form.get('usuario')?.value;
    // let contraseña = this.form.value.contraseña;

    let solicitud:Solicitud=new Solicitud();
    solicitud.usuario=usuario;
    solicitud.password="";

    this.citasService.consultarUsuario(solicitud).subscribe(data => {
      if(data.approved==true){
        sessionStorage.setItem('sesion', JSON.stringify(data));
        this.loading(data);



      }else{
        // this.error();
      // this.form.reset();
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
      this.cerrarDialog();
    }

    if(data.tipoUsuario=="PACIENTE"){
      this.router.navigate(["dashboard/homepage"]);
      this.cerrarDialog();
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


  cerrarDialog(){
    this.ref.close({data:0});
    // this.hide=true;
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  handleSuccess(data:any) {
    console.log(data);
  }

  async login() {
    if (this.form.valid) {
      let valicacion:boolean=false;

        this.failedLogin = false;
        this.form.controls['usuario'].disable();
        this.form.controls['contraseña'].disable();
        this.disableLoginButton = true;
        try {
            const email = this.form.get('usuario')?.value;
            const password = this.form.get('contraseña')?.value;
            await this.authService.signIn(email, password).then((result) => {
              if (result.user?.emailVerified !== true) {
                this.authService.sendVerificationMail();

                Util.errorMessage('Por favor, valide su dirección de correo electrónico.');

              } else {
                valicacion=true;
              }
            })

          } catch (error: any) {
            valicacion=false;
            console.log(error.code);

            this.failedLogin = true;
            this.failedLoginMessage = 'Ocurrio un problema, intenta nuevamente';
            if (error?.code === 'auth/wrong-password') {
                this.failedLoginMessage = 'Contraseña incorrecta';
                Util.errorMessage('La contraseña es incorrecta');
            }
            if(error?.code === 'auth/user-not-found'){
              this.failedLoginMessage= 'Correo incorrecto';
              Util.errorMessage('Esta cuenta no existe')
            }
        }

        if(valicacion){
          this.ingresar();

          // sessionStorage.clear();
          // let data:LoginUsuario={
          //   id:"",
          //   approved:true,
          //   mensaje: "",
          //   nombre: "33434345",
          //   tipoUsuario: "MEDICO",
          //   token: ""

          // }
          // sessionStorage.setItem('sesion', JSON.stringify(data));

          // this.router.navigate(["dashboard"]);
          // this.cerrarDialog();
        }


        this.form.controls['usuario'].enable();
        this.form.controls['contraseña'].enable();
        this.disableLoginButton = false;
    }

    if (this.form.invalid) {
        this.form.get('usuario')?.markAsTouched();
        this.form.get('contraseña')?.markAsTouched();
        this.checkControlInvalid('usuario');
        this.checkControlInvalid('contraseña');
        if (this.form.get('contraseña')?.invalid) {
            this.passwordInput?.nativeElement.focus();
        }

        if (this.form.get('usuario')?.invalid) {
            this.emailInput?.nativeElement.focus();
        }
    }
}

checkControlInvalid(controlName: string) {
  const control = this.form.get(controlName);
  return control?.touched && control?.invalid;
}

get emailMessageError() {
  let message = 'El correo es requerido';
  const control = this.form.get('email');
  if (this.checkControlInvalid('email') && control?.errors?.['pattern']) {
      message = 'Debes ingresar un correo valido';
  }

  return message;
}

get passwordMessageError() {
  const message = 'La contraseña es requerida';
  return message;
}

controlValidationClasses(constrolName: string) {
  return {
      invalid: this.checkControlInvalid(constrolName)
  };
}



reinicarPassword(){
  const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: "25%",
      // height: "55%",
      // disableClose: true
  });

  dialogRef.afterClosed().subscribe((result) => {
    // this.consultarTodos2();
    // alert('Iniciar sesion')
  });
}

}

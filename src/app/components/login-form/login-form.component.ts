import { MatStepper } from '@angular/material/stepper';
import { UsuarioService } from './../../services/usuario.service';
import { Mensaje } from './../../_models/menaje';
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
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { InactivityService } from 'src/app/services/inactivity.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: UntypedFormGroup
  hide = true
  refPassword: DynamicDialogRef;

  key: string="6Lfznr8kAAAAAJ5mxeuPpjSbuGcGAQ-zt3vBWvf7";

  cargandoLogin:boolean=false;


  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;

  failedLogin: boolean;
  failedLoginMessage: string;
  disableLoginButton: boolean;
  @ViewChild('emailInput') emailInput?: ElementRef;
  @ViewChild('passwordInput') passwordInput?: ElementRef;
  @ViewChild(MatStepper) stepper: MatStepper;


  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  // public size: 'compact' | 'normal' = 'normal';
  public lang = 'es';
  public type: 'image' | 'audio';

  //Datos de prueba
  autenticacionDosPasos = this.fb.group({
    codigo: ['', Validators.required],
  });
  isEditable = false;

  _codigoAutenticacion:string;

  _sesion:LoginUsuario;

  _codigoIncorrecto:boolean=false;


  constructor(
    public fb: UntypedFormBuilder,
    public _snackBar: MatSnackBar,
    public router: Router,
    private citasService:CitasService,
    // public dialogRef: MatDialogRef<LoginFormComponent>,
    private authService: AuthService,
    private dialog: DialogService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private usuarioService:UsuarioService,
    private inactivityService: InactivityService
    ) {
    this.form = this.fb.group({
      usuario: ["", Validators.required],
      contraseña: ["", Validators.required],
      recaptcha: ''
    })
  };

  ngOnInit(): void {
  };

  async ingresar() {
    sessionStorage.clear();
    let usuario =this.form.get('usuario')?.value;
    // let contraseña = this.form.value.contraseña;

    let solicitud:Solicitud=new Solicitud();
    solicitud.usuario=usuario;
    solicitud.password="";

    const data= await this.citasService.consultarUsuario(solicitud).toPromise();
    this._sesion=data;
    this.stepper.next();
    if(data.approved==true){
        let usuario: Mensaje= new Mensaje();
        const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this._codigoAutenticacion=randomNumber;
        usuario.mensaje=randomNumber;
        usuario.idUsuario=parseInt(data.id);
        usuario.correo=this.form.get('usuario')?.value;
        usuario.nombreUsuario=data.nombre;

        await this.usuarioService.mensajeWhatsapp(usuario).toPromise();
        this.cargandoLogin=false;

      }else{
        // this.error();
      }
  };



  error() {
    this._snackBar.open("Usuario o contraseña incorrecto", "Error", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  };

  loading(data:LoginUsuario) {
    console.log(data)
    if(data.tipoUsuario=="MEDICO"){
      this.router.navigate(["dashboard/homepage"]);
      // this.cerrarDialog();
    }

    if(data.tipoUsuario=="PACIENTE"){
      this.router.navigate(["dashboard/homepage"]);
      // this.cerrarDialog();
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
      this.cargandoLogin=true;

        this.failedLogin = false;
        this.form.controls['usuario'].disable();
        this.form.controls['contraseña'].disable();
        this.disableLoginButton = true;
        try {
            const email = this.form.get('usuario')?.value;
            const password = this.form.get('contraseña')?.value;
            await this.authService.signIn(email, password).then((result) => {

              console.log(result.user?.emailVerified)

              if (result.user?.emailVerified != true) {
                this.authService.sendVerificationMail();
                this.cargandoLogin=false;
                Util.errorMessage('Por favor, valide su dirección de correo electrónico.');

              } else {
                valicacion=true;
              }
            })

          } catch (error: any) {
            this.cargandoLogin=false;
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
  this.cerrarDialog();
  this.refPassword = this.dialog.open(ResetPasswordComponent, {
      header: "Recuperar contraseña    ",
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      width: "30%"
  });

  // dialogRef.afterClosed().subscribe((result) => {
  //   // this.consultarTodos2();
  //   // alert('Iniciar sesion')
  // });
}


verificaCodigo(){
  console.log("--------");
  console.log(this._codigoAutenticacion);
  console.log(this._sesion)
  let resultado=this.autenticacionDosPasos.get('codigo')?.value
  if(resultado==this._codigoAutenticacion){
    // Util.succesaMessage("Pasale");
      sessionStorage.setItem('sesion', JSON.stringify(this._sesion));
      this.inactivityService.startTimer();
      this.loading(this._sesion);
  }else{
    this._codigoIncorrecto=true;
    Util.errorMessage("Lo siento, el código que ingreso no es válido. Por favor verifica e intenta de nuevo")
  }
}

}

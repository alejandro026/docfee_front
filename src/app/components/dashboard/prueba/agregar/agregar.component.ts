import { Antecedentes } from './../../../../_models/antecedentes';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from './../../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from './../../../../_models/usuario';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  formulario:FormGroup;

  usuariosCombo:Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) private data:Usuario
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.iniciaFormulario();
    this.cargarComboUsuarios();
  }


  aceptar(){
    let usuarioConfianza= new Usuario();
    usuarioConfianza.id_usuario=this.formulario.value.id_UsuarioConfianza;

    let usuario:Usuario=this.formulario.value;
    usuario.id_UsuarioConfianza=usuarioConfianza;

    usuario.id_usuario=this.data.id_usuario;

    console.log("El usuario es ", usuario)

    if(this.data!=null && this.data.id_usuario! >0){
      usuario.antecedentes= this.data.antecedentes;
      this.usuarioService.actualizarUsuario(usuario).subscribe(data=>{
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: "Actualizado con exito",
            showConfirmButton: false,
            timer: 2500
          })
          this.dialogRef.close();
      })
    }else{
      this.usuarioService.guardarUsuario(usuario).subscribe(data=> {
        console.log(data);
          Swal.fire({
            icon: 'success',
            title: "Guardado con exito",
            showConfirmButton: false,
            timer: 2500
          });
          this.dialogRef.close();
      })
    }
  }

  cargarComboUsuarios(){
    this.usuarioService.consultarTodos().subscribe(data=>{
      this.usuariosCombo= data;
    })
  }

  iniciaFormulario(){
   this.formulario = this.formBuilder.group({
    id_usuario: this.data.id_usuario,
    nombre: this.data.nombre,
    apPaterno: this.data.apPaterno,
    apMaterno: this.data.apMaterno,
    nss: this.data.nss,
    telefono: this.data.telefono,
    id_UsuarioConfianza: this.data.id_UsuarioConfianza.id_usuario,
    sexo: this.data.sexo,
    fechaNacimiento: new Date(this.data.fechaNacimiento),
    correo: this.data.correo,
    ocupacion: this.data.ocupacion
    })
  }

  cerrarAceptar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close(false);
  }


}

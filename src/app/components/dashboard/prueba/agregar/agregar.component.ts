import { Antecedentes } from './../../../../_models/antecedentes';
import { FormControl, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
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

  formulario:UntypedFormGroup;
  formularioAntecedente:UntypedFormGroup;

  usuariosCombo:Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) private data:Usuario
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.iniciaFormulario();
    this.cargarComboUsuarios();
    this.formularioAntecedentes();
  }


  aceptar(){
    let usuarioConfianza= new Usuario();
    usuarioConfianza.id_usuario=this.formulario.value.id_UsuarioConfianza;

    let usuario:Usuario=this.formulario.value;
    usuario.id_UsuarioConfianza=usuarioConfianza;

    usuario.id_usuario=this.data.id_usuario;

    console.log("El usuario es ", usuario)

    // let antecedentes:Antecedentes=this.formularioAntecedente.value;
    let antecedentes:Antecedentes[]=[];
    antecedentes.push(this.formularioAntecedente.value)
    usuario.antecedentes=antecedentes

    if(this.data!=null && this.data.id_usuario! >0){
      // usuario.antecedentes= this.data.antecedentes;
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
    let usuarioConfinza=null
    if(this.data.id_UsuarioConfianza!=null){
      usuarioConfinza =this.data.id_UsuarioConfianza.id_usuario

      console.log("iniciaFormulario ~ usuarioConfinza", usuarioConfinza)

    }


   this.formulario = this.formBuilder.group({
    id_usuario: this.data.id_usuario,
    nombre: this.data.nombre,
    apPaterno: this.data.apPaterno,
    apMaterno: this.data.apMaterno,
    nss: this.data.nss,
    telefono: this.data.telefono,
    id_UsuarioConfianza: usuarioConfinza,
    sexo: this.data.sexo,
    fechaNacimiento: new Date(this.data.fechaNacimiento),
    correo: this.data.correo,
    ocupacion: this.data.ocupacion
    })
  }

  formularioAntecedentes(){

    if(this.data.antecedentes==null|| this.data.antecedentes.length==0){
      this.formularioAntecedente= this.formBuilder.group({
        id_antecedente:'',
        medicamentos: '',
        alcolismo:false,
        drogas:false,
        tabaquismo:false,
        antecedentesFamiliares:'',
        otrosDatos:'',
        id_usuario:''
      })
    }else{
      this.formularioAntecedente= this.formBuilder.group({
        id_antecedente:this.data.antecedentes[0].id_antecedente,
        medicamentos: this.data.antecedentes[0].medicamentos,
        alcolismo:true,
        drogas:this.data.antecedentes[0].drogas,
        tabaquismo:this.data.antecedentes[0].tabaquismo,
        antecedentesFamiliares:this.data.antecedentes[0].antecedentesFamiliares,
        otrosDatos:this.data.antecedentes[0].otrosDatos,
        id_usuario:this.data.id_usuario
      })
    }


  }



  cerrarAceptar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close(false);
  }


}

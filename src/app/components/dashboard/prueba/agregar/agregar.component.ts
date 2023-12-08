import { Antecedentes } from './../../../../_models/antecedentes';
import { FormControl, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from './../../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from './../../../../_models/usuario';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DbPwaService } from 'src/app/services/db-pwa.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  formulario:UntypedFormGroup;
  // formularioAntecedente:UntypedFormGroup;

  usuariosCombo:Usuario[];
  lista: any;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AgregarComponent>,
    private dbPwaService: DbPwaService,
    @Inject(MAT_DIALOG_DATA) private data:Usuario
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.iniciaFormulario();
    this.cargarComboUsuarios();
    // this.formularioAntecedentes();
  }

  sincronizar(){
    this.dbPwaService.syncAndClear();
  }
  aceptar(){

    console.log(this.formulario.controls['correo'])
    // if(this.formulario.invalid){
    //    return;
    // }

    let usuarioConfianza= new Usuario();
    let usuario:Usuario=this.formulario.value;


    if(this.formulario.value.id_UsuarioConfianza!=null){
      usuarioConfianza.id_usuario=this.formulario.value.id_UsuarioConfianza;
      usuario.id_UsuarioConfianza=usuarioConfianza;
    }
    usuario.id_usuario=this.data.id_usuario;
    usuario.usuario=this.data.usuario;
    console.log(this.data)
    this.lista = this.data;
    // let antecedentes:Antecedentes=this.formularioAntecedente.value;
    // let antecedentes:Antecedentes[]=[];
    // antecedentes.push(this.formularioAntecedente.value);
    // antecedentes[0].id_usuario=this.data.id_usuario.toString();
    // usuario.antecedentes=antecedentes

    console.log("El usuario es ", usuario)


    if(this.data!=null && this.data.id_usuario! >0){
      // usuario.antecedentes= this.data.antecedentes;
      this.usuarioService.actualizarUsuario(usuario).subscribe(data=>{
          console.log(data);
          Swal.fire({
            heightAuto: false,
            icon: 'success',
            title: "Actualizado con exito",
            showConfirmButton: false,
            timer: 2500
          })
          this.dialogRef.close();
      },
      ()=>{
        console.log("No hay internet :(!");
        this.dbPwaService.updateTask(usuario);
        this.dialogRef.close();
      })
    }else{
      this.usuarioService.guardarUsuario(usuario).subscribe(data=> {
        console.log("Conexión a internet OK!");
        console.log(data);
          Swal.fire({
            heightAuto: false,
            icon: 'success',
            title: "Guardado con exito",
            showConfirmButton: false,
            timer: 2500
          });
          this.dialogRef.close();
      },
      ()=>{
        console.log("No hay internet :(!");
        this.dbPwaService.updateTask(usuario);
        this.dialogRef.close();
      }
      )
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
    id_usuario: [this.data.id_usuario, Validators.required],
    nombre: [this.data.nombre, Validators.required],
    apPaterno: [this.data.apPaterno, Validators.required],
    apMaterno: [this.data.apMaterno, Validators.required],
    nss: [this.data.nss],
    telefono: [this.data.telefono, Validators.required],
    id_UsuarioConfianza: usuarioConfinza,
    sexo: [this.data.sexo, Validators.required],
    fechaNacimiento: new Date(this.data.fechaNacimiento),
    correo: [this.data.correo, [Validators.email]],
    ocupacion: [this.data.ocupacion, Validators.required]
    })
  }

  // formularioAntecedentes(){

  //   if(this.data.antecedentes==null|| this.data.antecedentes.length==0){
  //     this.formularioAntecedente= this.formBuilder.group({
  //       id_antecedente:'',
  //       medicamentos: '',
  //       alcolismo:false,
  //       drogas:false,
  //       tabaquismo:false,
  //       antecedentesFamiliares:'',
  //       otrosDatos:'',
  //       id_usuario:''
  //     })
  //   }else{
  //     this.formularioAntecedente= this.formBuilder.group({
  //       id_antecedente:this.data.antecedentes[0].id_antecedente,
  //       medicamentos: this.data.antecedentes[0].medicamentos,
  //       alcolismo:true,
  //       drogas:this.data.antecedentes[0].drogas,
  //       tabaquismo:this.data.antecedentes[0].tabaquismo,
  //       antecedentesFamiliares:this.data.antecedentes[0].antecedentesFamiliares,
  //       otrosDatos:this.data.antecedentes[0].otrosDatos,
  //       id_usuario:this.data.id_usuario
  //     })
  //   }


  // }



  cerrarAceptar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close(false);
  }


}

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Citas } from './../../../_models/citas';
import { CitasService } from './../../../services/citas.service';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { thru } from 'lodash';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent implements OnInit {

  formularioCitas:FormGroup;
  medicosCombo:Citas[];

  constructor(
    private citasService: CitasService,
    private formBuilder: FormBuilder,
    // private dialogRef: MatDialogRef<NuevaCitaComponent>,
    // @Inject(MAT_DIALOG_DATA) private data:Citas
  ) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.iniciaFormulario();
  }

  aceptar(){
    Swal.fire({
      icon: 'success',
      title: "Guardado con exito",
      showConfirmButton: false,
      timer: 2500
    })
  }

  iniciaFormulario(){
   this.formularioCitas = this.formBuilder.group({

    id_medico: null,
    Fecha: null,
    Lugar: null,
    Especialidad: null,
    Notas: null,
    id_Tratamiento :null
    })
  }

  // cerrarAceptar(){
  //   this.dialogRef.close(true);
  // }

  // cerrar(){
  //   this.dialogRef.close(false);
  // }


}

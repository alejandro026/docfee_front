import { CitaDTO } from './../../../_models/citaDTO';
import { LoginUsuario } from './../../../_models/loginUsuario';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
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

  formularioCitas:UntypedFormGroup;
  medicosCombo:Citas[];

  idTatamieto:number;

  constructor(
    private citasService: CitasService,
    private formBuilder: UntypedFormBuilder,
    private route:ActivatedRoute
  ) { }


  obtenerIdTratamiento(){
    this.route.queryParams.subscribe( params => {
      this.idTatamieto=params.idTratmiento;
      console.log("----------------------------<<>> "+params.idTratmiento)
      console.log("-------------------sdpsf "+this.idTatamieto)
   });
  }

  ngOnInit(): void {
    this.obtenerIdTratamiento();
    this.iniciaFormulario();

  }

  iniciaFormulario(){

    let usuario:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);

    // id_cita?:number;
    // id_medico?:number;
    // fecha?:Date;
    // lugar?:string;
    // especialidad?:String;
    // notas?:String;
    // tratamiento?:number;

   this.formularioCitas = this.formBuilder.group({
    id_medico: new UntypedFormControl(usuario.id),
    fecha: new UntypedFormControl(),
    lugar: new UntypedFormControl(),
    especialidad: new UntypedFormControl(),
    notas: new UntypedFormControl(),
    tratamiento : this.idTatamieto
    })
  }

  aceptar(){
    console.log(this.formularioCitas.value);

    let cita:CitaDTO=this.formularioCitas.value;

    this.citasService.guardarCita(cita).subscribe(data=>{
      console.log("this.citasService.guardarCita ~ data", data)

    Swal.fire({
      icon: 'success',
      title: "Guardado con exito",
      showConfirmButton: false,
      timer: 2500
    })
    })

  }

}

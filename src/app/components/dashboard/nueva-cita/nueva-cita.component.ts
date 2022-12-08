import { CitaDTO } from './../../../_models/citaDTO';
import { LoginUsuario } from './../../../_models/loginUsuario';
import { ActivatedRoute } from '@angular/router';
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

  idTatamieto:number;

  usuario:LoginUsuario;

  nombreMedico:string;

  constructor(
    private citasService: CitasService,
    private formBuilder: FormBuilder,
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
    this.usuario=JSON.parse(sessionStorage.getItem('sesion')!);
    this.nombreMedico=this.usuario.nombre;
    // id_cita?:number;
    // id_medico?:number;
    // fecha?:Date;
    // lugar?:string;
    // especialidad?:String;
    // notas?:String;
    // tratamiento?:number;

   this.formularioCitas = this.formBuilder.group({
    id_medico: new FormControl(this.usuario.id),
    fecha: new FormControl(),
    lugar: new FormControl(),
    especialidad: new FormControl(),
    notas: new FormControl(),
    tratamiento : this.idTatamieto
    })
  }

  aceptar(){
    console.log(this.formularioCitas.value);

    let cita:CitaDTO=this.formularioCitas.value;

    if(cita.fecha==null){
      Swal.fire({
        icon: 'error',
        title: "La fecha es obligatoria",
        showConfirmButton: false,
        timer: 2500
      })
      return;
    }

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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { nuevaReceta } from 'src/app/_models/nuevaReceta';
import Swal from 'sweetalert2';
import { RecetaService } from '../../../services/receta.service';
import { Recetas } from '../../../_models/receta';
import { Citas } from '../../../_models/citas';
import { ActivatedRoute } from '@angular/router';
import { LoginUsuario } from '../../../_models/loginUsuario';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.css']
})
export class NuevaRecetaComponent implements OnInit {
formularioReceta:FormGroup;


idCita:number;
  constructor(
    private formBuilder: FormBuilder,
    private recetaService: RecetaService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.obtenerIdCita();
    this.iniciaFormulario();

  }
  obtenerIdCita(){
    this.route.queryParams.subscribe( params => {
      this.idCita=params.id_cita;
      console.log("-----"+params.id_cita)
      console.log("--- "+this.idCita)

   });
  }
confirmAdd(){
  let recetas:nuevaReceta=this.formularioReceta.value;
    this.recetaService.guardarReceta(recetas).subscribe(data=>{
      console.log("this.recetaService.guardarReceta ~ data", data)
      Swal.fire({
        icon: 'success',
        title: "Guardado con exito",
        showConfirmButton: false,
        timer: 2500
      })
})
  }

  iniciaFormulario(){

   this.formularioReceta = this.formBuilder.group({

  id_cita: this.idCita,
  diagnostico: new FormControl(),
  //edad:null,
  fecha: new FormControl(),
  medicamento: new FormControl(),
  horarios: new FormControl(),
  tareas: new FormControl(),
  //proximaCita:null,
    })
  }

}

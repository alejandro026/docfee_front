import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { nuevaReceta } from 'src/app/_models/nuevaReceta';
import Swal from 'sweetalert2';
import { RecetaService } from '../../../services/receta.service';
import { Recetas } from '../../../_models/receta';
import { Citas } from '../../../_models/citas';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from '../../../_models/loginUsuario';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.css']
})
export class NuevaRecetaComponent implements OnInit {
formularioReceta:UntypedFormGroup;


idCita:number;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private recetaService: RecetaService,
    private route:ActivatedRoute,
    private router: Router,
    private citaService:CitasService
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
      this.citaService.actualizaEstatus(this.idCita, 2).subscribe(data=>{

        console.log(this.idCita)
        console.log("this.recetaService.guardarReceta ~ data", data)
          Swal.fire({
            icon: 'success',
            title: "Guardado con exito",
            showConfirmButton: false,
            timer: 2500
          })
      window.history.back()
      });

      // this.router.navigate(['/dashboard/expediente']);
})
  }

  iniciaFormulario(){

   this.formularioReceta = this.formBuilder.group({

  id_cita: this.idCita,
  diagnostico: new UntypedFormControl(),
  //edad:null,
  fecha: new UntypedFormControl(),
  medicamento: new UntypedFormControl(),
  horarios: new UntypedFormControl(),
  tareas: new UntypedFormControl(),
  //proximaCita:null,
    })
  }

}

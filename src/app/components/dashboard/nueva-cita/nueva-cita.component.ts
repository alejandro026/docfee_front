import { CitaDTO } from './../../../_models/citaDTO';
import { LoginUsuario } from './../../../_models/loginUsuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Citas } from './../../../_models/citas';
import { CitasService } from './../../../services/citas.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DateTimePicker, DateTimePickerModel } from '@syncfusion/ej2-calendars';
import Swal from 'sweetalert2';
import { thru } from 'lodash';
import { Medico } from 'src/app/_models/medico';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css'],

})
export class NuevaCitaComponent implements OnInit {

  formularioCitas:UntypedFormGroup;
  medicosCombo:Medico[]=[];

  idTatamieto:number;

  usuario:LoginUsuario;

  nombreMedico:string;

  constructor(
    private citasService: CitasService,
    private formBuilder: UntypedFormBuilder,
    private route:ActivatedRoute,
    private router:Router
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
    id_medico: new UntypedFormControl(this.usuario.id),
    fecha: new UntypedFormControl(),
    lugar: new UntypedFormControl(),
    especialidad: new UntypedFormControl(),
    notas: new UntypedFormControl(),
    tratamiento : this.idTatamieto
    })
  }

  ngAfterViewInit(): void {
    this.cargaMedicos();
  }

  aceptar(){
    console.log(this.formularioCitas.value);

    let cita:CitaDTO=this.formularioCitas.value;
    cita.confirmada=1;
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

        this.router.navigate(['/dashboard/citas'], { queryParams: { idTratmiento: this.idTatamieto} });

    Swal.fire({
      icon: 'success',
      title: "Guardado con exito",
      showConfirmButton: false,
      timer: 2500
    })
    })

  }

  cargaMedicos(){
    this.citasService.consultarTodosMedicos().subscribe(data=>{
      this.medicosCombo=data;
      let id=(parseInt(this.usuario.id)-1);
      let medico=this.medicosCombo[id];
      this.formularioCitas.get('lugar')?.setValue(medico.consultorio);

      console.log(data);
    })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimePicker, DateTimePickerModel } from '@syncfusion/ej2-calendars';
import { CitaDTO } from 'src/app/_models/citaDTO';
import { Citas } from 'src/app/_models/citas';
import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { Medico } from 'src/app/_models/medico';
import { CitasService } from 'src/app/services/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-cita-usuario',
  templateUrl: './nueva-cita-usuario.component.html',
  styleUrls: ['./nueva-cita-usuario.component.css'],
  

})
export class NuevaCitaUsuarioComponent implements OnInit {

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
      console.log(params)
      this.idTatamieto=params.idTratmiento;
   });
  }

  ngOnInit(): void {
    this.obtenerIdTratamiento();
    this.iniciaFormulario();
    this.cargaMedicos();

  }

  cargaMedicos(){
    this.citasService.consultarTodosMedicos().subscribe(data=>{
      this.medicosCombo=data;
      console.log(data);
    })
  }

  iniciaFormulario(){

   this.formularioCitas = this.formBuilder.group({
    id_medico: new UntypedFormControl(),
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
    cita.confirmada=false;

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
      title: "Tu cita se ha generado con exito. Espera la confirmación del médico",
      showConfirmButton: false,
      timer: 2500
    })
    })

  }

}

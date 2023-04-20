import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
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

  fechaIncio:Date;
  fechaFin:Date;

  @ViewChild('datetimepicker')
  private datetimepicker: DateTimePickerComponent;

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
    this.iniciaFecha();

    this.datetimepicker.min = new Date(new Date().setHours(9, 0, 0));
this.datetimepicker.max = new Date(new Date().setHours(18, 0, 0));
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
    cita.confirmada=0;

    if(cita.fecha==null){
      Swal.fire({
        heightAuto: false,
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
      heightAuto: false,
      icon: 'success',
      title: "Tu cita se ha generado con exito. Espera la confirmación del médico",
      showConfirmButton: false,
      timer: 2500
    })
    })

  }

  iniciaFecha(){
    this.fechaIncio=new Date(new Date().setHours(9,0,0))
    this.fechaFin=new Date(new Date().setHours(17,0,0))
  }

  onDateTimeChange(args: any): void {
    const fechaSeleccionada = args.value;
    const horaMinima = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), fechaSeleccionada.getDate(), 9, 0, 0);
    const horaMaxima = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), fechaSeleccionada.getDate(), 17, 0, 0);
    if (fechaSeleccionada < horaMinima || fechaSeleccionada > horaMaxima) {
      this.datetimepicker.value = null!;
    }
  }

  onMedicoSelected(event:any){
    console.log(event);
    let posicion=(event.value-1);
    let medico=this.medicosCombo[posicion];
    this.formularioCitas.get("lugar")?.setValue(medico.consultorio);
  }

}

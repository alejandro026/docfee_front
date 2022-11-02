import { Tratamiento } from './../../../_models/tratamiento';
import { TratamientoService } from './../../../services/tratamiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-expediente',
  templateUrl: './detalle-expediente.component.html',
  styleUrls: ['./detalle-expediente.component.css']
})
export class DetalleExpedienteComponent implements OnInit {

  tratamiento:Tratamiento;
  edad:number;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private tratamientoService: TratamientoService
    ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.route.queryParams.subscribe( params => {
     this.cargarDatos2(params.idTratmiento);
   });
  }

  cargarDatos2(id:number){
    this.tratamientoService.buscarPorId(id).subscribe(data=>{
      this.tratamiento= data;

      this.calcularEdad();

      console.log("this.tratamientoService.buscarPorId ~ this.tratamiento", this.tratamiento)

    })
  }

  calcularEdad(){
    let hoy:Date= new Date();
    var fechaNacimiento:Date = new Date(this.tratamiento.id_usuario.fechaNacimiento);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var m = hoy.getMonth() - fechaNacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    this.edad= edad;

    console.log("calcularEdad ~ this.edad", this.edad)

  }

}

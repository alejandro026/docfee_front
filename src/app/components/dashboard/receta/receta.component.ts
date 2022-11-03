import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VistaTratamiento } from './../../../_models/vistaTratatamiento';
import { TratamientoService } from './../../../services/tratamiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recetas } from '../../../_models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  dataSource: MatTableDataSource<Recetas>;
  recetas:Recetas;
  edad:number;
  fecha:Date;

  constructor(

    private route:ActivatedRoute,
    private RecetaService: RecetaService,
    private router:Router) {}

  ngOnInit(): void {

    this.cargarDatos();
    this.fecha= new Date();
  }

  cargarDatos(){
    this.route.queryParams.subscribe( params => {
     this.cargarDatos2(params.id_receta);

     console.log(params)
   });
  }

  cargarDatos2(id:number){
    this.RecetaService.buscarPorIdCita(id).subscribe(data=>{
      this.recetas= data;

      //this.calcularEdad();

      console.log("this.RecetaService.buscarPorIdCita ~ this.receta", this.recetas)

    })
  }
  // calcularEdad(){
  //   let hoy:Date= new Date();
  //   var fechaNacimiento:Date = new Date(this.recetas.id_cita?.Tratamiento?.id_usuario.fechaNacimiento);
  //   var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  //   var m = hoy.getMonth() - fechaNacimiento.getMonth();

  //   if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
  //       edad--;
  //   }

  //   this.edad= edad;

  //   console.log("calcularEdad ~ this.edad", this.edad)

  // }





}

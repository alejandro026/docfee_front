import { Mensaje } from './../../../_models/menaje';
import { Usuario } from './../../../_models/usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VistaTratamiento } from './../../../_models/vistaTratatamiento';
import { TratamientoService } from './../../../services/tratamiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recetas } from '../../../_models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Tratamiento } from '../../../_models/tratamiento';
import { Citas } from '../../../_models/citas';
import { CitasService } from '../../../services/citas.service';
import { Console } from 'console';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  recetas:Recetas;
  edad:number;
  fecha:Date;
  tratamiento:Tratamiento;
  citas:Citas;
  dataSource: MatTableDataSource<Recetas>
  displayedColumns: string[] = ['medicamento','tarea'];

  _fecha:Date = new Date();
  _nombreCompleto:string="";
  _edad:string="";
  _diagnostico:string="";
  _medicamemnto:string="";
  _indicaciones:string="Tomar cada {{recetas.horarios}} horas y la tarea es {{recetas.tareas}}";


  numero:string;
  mensaje:string;
  constructor(

    private route:ActivatedRoute,
    private RecetaService: RecetaService,
    private usuarioService: UsuarioService,
    private tratamientoService: TratamientoService,
    private citasService:CitasService,
    private router:Router) {}

  ngOnInit(): void {
    this.cargarDatos();
    //this.cargarDatost();
    this.fecha= new Date();
  }

  cargarDatos(){
    this.route.queryParams.subscribe( params => {
      console.log(params);
     this.cargarDatos2(params.id_receta);


   });
  }

  cargarDatos2(id:number){
    this.RecetaService.consultarPorIDCita(id).subscribe(data=>{
      console.log("la receta",data);
      this.recetas= data[0];

      this.calcularEdad();

        this.iniciarValores();


    })
  }

  iniciarValores(){
    this._fecha = new Date();
    this._nombreCompleto=this.recetas.id_cita.tratamiento.id_usuario.nombre + " " + this.recetas.id_cita.tratamiento.id_usuario.apPaterno+" "+this.recetas.id_cita.tratamiento.id_usuario.apMaterno;
    this._edad;
    this._diagnostico=this.recetas.diagnostico!;
    this._medicamemnto=this.recetas.medicamento!;
    this._indicaciones=`Tomar cada ${this.recetas.horarios} horas y la tarea es ${this.recetas.tareas}`;
  }


  calcularEdad(){
    let hoy:Date= new Date();
    var fechaNacimiento:Date = new Date(this.recetas.id_cita.tratamiento.id_usuario.fechaNacimiento);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var m = hoy.getMonth() - fechaNacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    this.edad= edad;

  }




enviar(){
  let usuario: Mensaje= new Mensaje();
  let mensajePersonlizado="Hola te recuerdo que debes tomar "+this.mensaje;
  usuario.mensaje=mensajePersonlizado;
  usuario.numero=this.numero
  console.log(usuario)
  this.usuarioService.mensajeWhatsapp(usuario).subscribe(data=>{

  })
}
}

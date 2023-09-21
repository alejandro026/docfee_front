import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { LoginUsuario } from 'src/app/_models/loginUsuario';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  panelOpenState = true;
  sesion:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);
  @ViewChild(MatAccordion) accordion: MatAccordion;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.accordion.openAll()
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generar-expediente',
  templateUrl: './generar-expediente.component.html',
  styleUrls: ['./generar-expediente.component.css']
})
export class GenerarExpedienteComponent implements OnInit {

  tratamientoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciaFormulario();
  }

  iniciaFormulario(): void {
    this.tratamientoForm = this.fb.group({
      id_tratamiento: ['', [Validators.required]],
      id_usuario: ['', [Validators.required]],
      id_medico: ['', [Validators.required]],
      descripcion: [''],
      ipas_SisTegumentario: [''],
      ipas_SisMuscular: [''],
      ipas_SisOseo: [''],
      ipas_SisNervioso: [''],
      ipas_SisEndocrino: [''],
      ipas_SisInmunologico: [''],
      ipas_SirCirculatorio: [''],
      // ipas_ApaUrinario: [''],
      // ipas_ApaRespiratorio: [''],
      // ipas_ApaDigestivo: [''],
      // ipas_ApaReproductor: [''],
      // presionArterial: ['', [Validators.required]],
      // frec_Cardiaca: ['', [Validators.required]],
      // frec_Respiratoria: ['', [Validators.required]],
      // temperaatura: ['', [Validators.required]],
      // altura: ['', [Validators.required]],
      // imc: ['', [Validators.required]],
      // aspectos_Generales: [''],
      // documentosEstudios: [''],
      // diagnosticoPresuntivo: [''],
      // tratamientoEmpleadoIntegral: ['']
    });
  }

}

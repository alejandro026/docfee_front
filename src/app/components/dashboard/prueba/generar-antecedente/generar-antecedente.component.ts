import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Antecedentes } from 'src/app/_models/antecedentes';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-generar-antecedente',
  templateUrl: './generar-antecedente.component.html',
  styleUrls: ['./generar-antecedente.component.css']
})
export class GenerarAntecedenteComponent implements OnInit {

  antecedentesForm: FormGroup;


  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private idUsuario:number,
    private tratamientoService:TratamientoService) { }

  ngOnInit() {
    this.antecedentesForm = this.fb.group({
      medicamentos: ['', [Validators.required, Validators.maxLength(30)]],
      alcolismo: [false, [Validators.required]],
      drogas: [false, [Validators.required]],
      tabaquismo: [false, [Validators.required]],
      antecedentesFamiliares: ['', [Validators.required, Validators.maxLength(30)]],
      otrosDatos: ['', [Validators.required, Validators.maxLength(30)]],
    });

  }

  onSubmit() {
    const antecedentes: Antecedentes = this.antecedentesForm.value;
    antecedentes.id_usuario= this.idUsuario;
    console.log(antecedentes);
    this.tratamientoService.guardarAntecedentes(antecedentes).subscribe(data=>{
      console.log(data);
    })
  }

}

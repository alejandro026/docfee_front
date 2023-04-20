import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Antecedentes } from 'src/app/_models/antecedentes';
import { LoginUsuario } from 'src/app/_models/loginUsuario';
import { TratamientoDTO } from 'src/app/_models/tratamientoDTO';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-generar-antecedente',
  templateUrl: './generar-antecedente.component.html',
  styleUrls: ['./generar-antecedente.component.css']
})
export class GenerarAntecedenteComponent implements OnInit {

  antecedentesForm: FormGroup;
  tiposDeSangre: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];



  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private idUsuario:number,
    private tratamientoService:TratamientoService,
    private dialogRef: MatDialogRef<GenerarAntecedenteComponent>,) { }

  ngOnInit() {
    this.antecedentesForm = this.fb.group({
      medicamentos: ['', [Validators.required, Validators.maxLength(30)]],
      alcolismo: [false, [Validators.required]],
      drogas: [false, [Validators.required]],
      tabaquismo: [false, [Validators.required]],
      antecedentesFamiliares: ['', [Validators.required, Validators.maxLength(30)]],
      otrosDatos: ['', [Validators.required, Validators.maxLength(30)]],
      presionArterial: ['', [Validators.required]],
      frec_Cardiaca: ['', [Validators.required]],
      frec_Respiratoria: ['', [Validators.required]],
      temperaatura: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      imc: ['', [Validators.required]],
      descripcion:['', [Validators.required]],
      aspectos_Generales:['', [Validators.required]],
      diagnosticoPresuntivo:['', [Validators.required]]
    });

  }

  onSubmit() {
    if(this.antecedentesForm.invalid){
      Util.errorMessajeNormal("Debes completar todos los campos");
      return;
    }
    let usuario:LoginUsuario=JSON.parse(sessionStorage.getItem('sesion')!);


    const antecedentes: Antecedentes =new Antecedentes();

    antecedentes.alcolismo=this.antecedentesForm.get('alcolismo')?.getRawValue();
    antecedentes.antecedentesFamiliares=this.antecedentesForm.get('antecedentesFamiliares')?.getRawValue();
    antecedentes.drogas=this.antecedentesForm.get('drogas')?.getRawValue();
    antecedentes.medicamentos=this.antecedentesForm.get('medicamentos')?.getRawValue();
    antecedentes.otrosDatos=this.antecedentesForm.get('otrosDatos')?.getRawValue();
    antecedentes.tabaquismo=this.antecedentesForm.get('tabaquismo')?.getRawValue();
    antecedentes.id_usuario= this.idUsuario;

    let tratamiento:TratamientoDTO= new TratamientoDTO();
    tratamiento.id_usuario= this.idUsuario;
    tratamiento.presionArterial=this.antecedentesForm.get('presionArterial')?.getRawValue();
    tratamiento.frec_Cardiaca=this.antecedentesForm.get('frec_Cardiaca')?.getRawValue();
    tratamiento.frec_Respiratoria=this.antecedentesForm.get('frec_Respiratoria')?.getRawValue();
    tratamiento.temperaatura=this.antecedentesForm.get('temperaatura')?.getRawValue();
    tratamiento.altura=this.antecedentesForm.get('altura')?.getRawValue();
    tratamiento.imc=this.antecedentesForm.get('imc')?.getRawValue();
    tratamiento.descripcion=this.antecedentesForm.get('descripcion')?.getRawValue();
    tratamiento.aspectos_Generales=this.antecedentesForm.get('aspectos_Generales')?.getRawValue();
    tratamiento.diagnosticoPresuntivo=this.antecedentesForm.get('diagnosticoPresuntivo')?.getRawValue();

    tratamiento.id_medico=parseInt(usuario.id);
    console.log(antecedentes);
    this.tratamientoService.guardarAntecedentes(antecedentes).subscribe(data=>{
      this.tratamientoService.guardaExpediente(tratamiento).subscribe(response=>{
        Util.succesMessajeNormal("Antecedente guardado con éxito");
        this.cerrar();
      });
    })
  }

  cerrar(){
    this.dialogRef.close(false);
  }

}

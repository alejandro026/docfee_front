import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Paciente } from '../interfaces/paciente';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;
  formFour: FormGroup;
  formFive: FormGroup;

  titulo = "Nuevo Historial Clínico";
  id: string | undefined;

  public paciente$ = new Subject<any>();

  constructor(
    public fb: FormBuilder,
    public firebase: AngularFirestore,
    // private http: HttpClient
  ) {

    this.formOne = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      nss: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      sexo: ['', ],
      edad: ['', Validators.required],
      consultorio: ['', ],
      turno: ['', ],
      correo: ['', ],
      telefono: ['', Validators.required],
      ocupacion: ['', ],
      motivo: ['', ]
    })

    this.formTwo = this.fb.group({
      medicam: ['', ],
      especif: ['', ],
      otros: ['', ],
      alcohol: ['', ],
      tabaquismo: ['', ],
      drogas: ['', ],
      inmun: ['', ],
      otros2: ['', ],
      especif2: ['', ],
      menarq: ['', ],
      ritmo: ['', ],
      fum: ['', ],
      g: ['', ],
      p: ['', ],
      a: ['', ],
      c: ['', ],
      ivsa: ['', ],
      cuales: ['', ]
    })

    this.formThree = this.fb.group({
      peea: ['', ],
      ipas: ['', ]
    })

    this.formFour = this.fb.group({
      ta: ['', ],
      fc: ['', ],
      fr: ['', ],
      temp: ['', ],
      peso: ['', ],
      talla: ['', ],
      imc: ['', ],
      aspecto: ['', ],
      cabeza: ['', ],
      torax: ['', ],
      abdomen: ['', ],
      extrem: ['', ],
      neuro: ['', ],
      lab: ['', ],
      imagen: ['', ],
      otros: ['', ],
    })

    this.formFive = this.fb.group({
      diagnostico: ['', ],
      tratamiento: ['', ]
    })
  }

  initializeFormGroup() {
    this.formOne.setValue({
      nombre: '',
      nss: '',
      sexo: '',
      edad: '',
      consultorio: '',
      turno: '',
      correo: '',
      telefono: '',
      ocupacion: '',
      motivo: '',
    });
    this.formTwo.setValue({
      medicam: '',
      especif: '',
      otros: '',
      alcohol: '',
      tabaquismo: '',
      drogas: '',
      inmun: '',
      otros2: '',
      especif2: '',
      menarq: '',
      ritmo: '',
      fum: '',
      g: '',
      p: '',
      a: '',
      c: '',
      ivsa: '',
      cuales: '',
    });
    this.formThree.setValue({
      peea: '',
      ipas: '',
    });
    this.formFour.setValue({
      ta: '',
      fc: '',
      fr: '',
      temp: '',
      peso: '',
      talla: '',
      imc: '',
      aspecto: '',
      cabeza: '',
      torax: '',
      abdomen: '',
      extrem: '',
      neuro: '',
      lab: '',
      imagen: '',
      otros: '',
    });
    this.formFive.setValue({
      diagnostico: '',
      tratamiento: '',
    });
  }

  getPaciente(): Observable<any> {
    return this.firebase.collection('pacientes').snapshotChanges();
  }

  allPacientes(){
    this.firebase.collection('pacientes');
  }

  addPaciente(paciente: Paciente): Promise<any> {
    return this.firebase.collection('pacientes').add(paciente)

  }

  createPaciente() {
    const paciente: Paciente = {
      nombre: this.formOne.value.nombre,
      nss: this.formOne.value.nss,
      sexo: this.formOne.value.sexo,
      edad: this.formOne.value.edad,
      consultorio: this.formOne.value.consultorio,
      turno: this.formOne.value.turno,
      correo: this.formOne.value.correo,
      telefono: this.formOne.value.telefono,
      ocupacion: this.formOne.value.ocupacion,
      motivo: this.formOne.value.motivo,
      medicam: this.formTwo.value.medicam,
      especif: this.formTwo.value.especif,
      otros: this.formTwo.value.otros,
      alcohol: this.formTwo.value.alcohol,
      tabaquismo: this.formTwo.value.tabaquismo,
      drogas: this.formTwo.value.drogas,
      inmun: this.formTwo.value.inmun,
      otros2: this.formTwo.value.otros2,
      especif2: this.formTwo.value.especif2,
      menarq: this.formTwo.value.menarq,
      ritmo: this.formTwo.value.ritmo,
      fum: this.formTwo.value.fum,
      g: this.formTwo.value.g,
      p: this.formTwo.value.p,
      a: this.formTwo.value.a,
      c: this.formTwo.value.c,
      ivsa: this.formTwo.value.ivsa,
      cuales: this.formTwo.value.cuales,
      peea: this.formThree.value.peea,
      ipas: this.formThree.value.ipas,
      ta: this.formFour.value.ta,
      fc: this.formFour.value.fc,
      fr: this.formFour.value.fr,
      temp: this.formFour.value.temp,
      peso: this.formFour.value.peso,
      talla: this.formFour.value.talla,
      imc: this.formFour.value.imc,
      aspecto: this.formFour.value.aspecto,
      cabeza: this.formFour.value.cabeza,
      torax: this.formFour.value.torax,
      abdomen: this.formFour.value.abdomen,
      extrem: this.formFour.value.extrem,
      neuro: this.formFour.value.neuro,
      lab: this.formFour.value.lab,
      imagen: this.formFour.value.imagen,
      otros3: this.formFour.value.otros,
      diagnostico: this.formFive.value.diagnostico,
      tratamiento: this.formFive.value.tratamiento,
    }

    this.addPaciente(paciente).then(() => {
      console.log('paciente registrado');
    }, error => {
      console.log(error);
    })
  }

  deletePaciente(id: string): Promise<any> {
    return this.firebase.collection('pacientes').doc(id).delete();
  }

  addPacienteEdit(paciente: Paciente) {
    this.paciente$.next(paciente);
  }

  getPacienteEdit(): Observable<Paciente> {
    return this.paciente$.asObservable();
  }

  editarPaciente(id: string, paciente: Paciente): Promise<any> {
    return this.firebase.collection('pacientes').doc(id).update(paciente);
  }

  guardarPaciente() {
    if (this.id === undefined) {
      this.createPaciente();
    } else {
      this.editPaciente(this.id)
    }
  }

  editPaciente (id: string) {
    const paciente: Paciente = {
      nombre: this.formOne.value.nombre,
      nss: this.formOne.value.nss,
      sexo: this.formOne.value.sexo,
      edad: this.formOne.value.edad,
      consultorio: this.formOne.value.consultorio,
      turno: this.formOne.value.turno,
      correo: this.formOne.value.correo,
      telefono: this.formOne.value.telefono,
      ocupacion: this.formOne.value.ocupacion,
      motivo: this.formOne.value.motivo,
      medicam: this.formTwo.value.medicam,
      especif: this.formTwo.value.especif,
      otros: this.formTwo.value.otros,
      alcohol: this.formTwo.value.alcohol,
      tabaquismo: this.formTwo.value.tabaquismo,
      drogas: this.formTwo.value.drogas,
      inmun: this.formTwo.value.inmun,
      otros2: this.formTwo.value.otros2,
      especif2: this.formTwo.value.especif2,
      menarq: this.formTwo.value.menarq,
      ritmo: this.formTwo.value.ritmo,
      fum: this.formTwo.value.fum,
      g: this.formTwo.value.g,
      p: this.formTwo.value.p,
      a: this.formTwo.value.a,
      c: this.formTwo.value.c,
      ivsa: this.formTwo.value.ivsa,
      cuales: this.formTwo.value.cuales,
      peea: this.formThree.value.peea,
      ipas: this.formThree.value.ipas,
      ta: this.formFour.value.ta,
      fc: this.formFour.value.fc,
      fr: this.formFour.value.fr,
      temp: this.formFour.value.temp,
      peso: this.formFour.value.peso,
      talla: this.formFour.value.talla,
      imc: this.formFour.value.imc,
      aspecto: this.formFour.value.aspecto,
      cabeza: this.formFour.value.cabeza,
      torax: this.formFour.value.torax,
      abdomen: this.formFour.value.abdomen,
      extrem: this.formFour.value.extrem,
      neuro: this.formFour.value.neuro,
      lab: this.formFour.value.lab,
      imagen: this.formFour.value.imagen,
      otros3: this.formFour.value.otros,
      diagnostico: this.formFive.value.diagnostico,
      tratamiento: this.formFive.value.tratamiento,
    }

    this.editarPaciente(id, paciente).then(() => {
      this.id = undefined;
      console.log('paciente actualizado');
    }, error => {
      console.log(error);
    })
  }

  getPacienteData(paciente: Paciente) {
    this.titulo = "Editar Historial Clínico";
    this.id = paciente.id;
    this.formOne.patchValue({
      nombre: paciente.nombre,
      nss: paciente.nss,
      sexo: paciente.sexo,
      edad: paciente.edad,
      consultorio: paciente.consultorio,
      turno: paciente.turno,
      correo: paciente.correo,
      telefono: paciente.telefono,
      ocupacion: paciente.ocupacion,
      motivo: paciente.motivo
    });
    this.formTwo.patchValue({
      medicam: paciente.medicam,
      especif: paciente.especif,
      otros: paciente.otros,
      alcohol: paciente.alcohol,
      tabaquismo: paciente.tabaquismo,
      drogas: paciente.drogas,
      inmun: paciente.inmun,
      otros2: paciente.otros2,
      especif2: paciente.especif2,
      menarq: paciente.menarq,
      ritmo: paciente.ritmo,
      fum: paciente.fum,
      g: paciente.g,
      p: paciente.p,
      a: paciente.a,
      c: paciente.c,
      ivsa: paciente.ivsa,
      cuales: paciente.cuales
    });
    this.formThree.patchValue({
      peea: paciente.peea,
      ipas: paciente.ipas
    });
    this.formFour.patchValue({
      ta: paciente.ta,
      fc: paciente.fc,
      fr: paciente.fr,
      temp: paciente.temp,
      peso: paciente.peso,
      talla: paciente.talla,
      imc: paciente.imc,
      aspecto: paciente.aspecto,
      cabeza: paciente.cabeza,
      torax: paciente.torax,
      abdomen: paciente.abdomen,
      extrem: paciente.extrem,
      neuro: paciente.neuro,
      lab: paciente.lab,
      imagen: paciente.imagen,
      otros: paciente.otros
    }
    );
    this.formFive.patchValue({
      diagnostico: paciente.diagnostico,
      tratamiento: paciente.tratamiento
    });
  }
}

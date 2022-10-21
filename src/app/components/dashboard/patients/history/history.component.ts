import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paciente } from 'src/app/interfaces/paciente'
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  patients: Paciente[] = [];

  constructor(
    public dialog: MatDialog,
    public pacienteService: PacienteService,
  ) { 
    this.pacienteService.getPacienteEdit().subscribe(data => {
      console.log(data)
      const element: Paciente[] = [{
        nombre: data.nombre,
        nss: data.nss,
        sexo: data.sexo,
        edad: data.edad,
        consultorio: data.consultorio,
        turno: data.turno,
        correo: data.correo,
        telefono: data.telefono,
        ocupacion: data.ocupacion,
        motivo: data.motivo,
        medicam: data.medicam,
        especif: data.especif,
        otros: data.otros,
        alcohol: data.alcohol,
        tabaquismo: data.tabaquismo,
        drogas: data.drogas,
        inmun: data.inmun,
        otros2: data.otros2,
        especif2: data.especif2,
        menarq: data.menarq,
        ritmo: data.ritmo,
        fum: data.fum,
        g: data.g,
        p: data.p,
        a: data.a,
        c: data.c,
        ivsa: data.ivsa,
        cuales: data.cuales,
        peea: data.peea,
        ipas: data.ipas,
        ta: data.ta,
        fc: data.fc,
        fr: data.fr,
        temp: data.temp,
        peso: data.peso,
        talla: data.talla,
        imc: data.imc,
        aspecto: data.aspecto,
        cabeza: data.cabeza,
        torax: data.torax,
        abdomen: data.abdomen,
        extrem: data.extrem,
        neuro: data.neuro,
        lab: data.lab,
        imagen: data.imagen,
        otros3: data.otros3,
        diagnostico: data.diagnostico,
        tratamiento: data.tratamiento,
      }]
      this.patients = element;
    })
  }

  onClose() {
    this.dialog.closeAll();
  }

  ngOnInit(): void { }

}

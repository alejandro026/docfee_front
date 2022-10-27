
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './../../../_models/usuario';
import { NotificationService } from './../../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
  ) { }

  searchKey: string;
  displayedColumns: string[] = ['nombre', 'apPaterno', 'apMaterno', 'nss', 'telefono'];
  dataSource: MatTableDataSource<Usuario>;


  ngOnInit() {
    this.getData();
    this.dataSource = new MatTableDataSource<Usuario>();

  }

  getData() {
    this.usuarioService.consultarTodos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)
    })
  }
}

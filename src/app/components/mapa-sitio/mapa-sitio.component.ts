import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.Service';

@Component({
  selector: 'app-mapa-sitio',
  templateUrl: './mapa-sitio.component.html',
  styleUrls: ['./mapa-sitio.component.css']
})
export class MapaSitioComponent implements OnInit {

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  navigateToSection(sectionId: string) {
    this.navigationService.navigateToSection(sectionId);
  }
}

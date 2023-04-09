import { Component, HostListener } from '@angular/core';
import { InactivityService } from './services/inactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DOCFEE';

  constructor(private inactivityService: InactivityService) {}

  @HostListener('document:click', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  onActivity(event: MouseEvent) {
    this.inactivityService.activityDetected();
  }
}

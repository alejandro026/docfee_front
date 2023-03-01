import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigateToSectionSource = new Subject<string>();
  navigateToSection$ = this.navigateToSectionSource.asObservable();

  navigateToSection(sectionId: string) {
    this.navigateToSectionSource.next(sectionId);
  }
}

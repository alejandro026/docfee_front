import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showFooter = true;

  constructor(private router: Router) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     const data = this.router.routerState.root.snapshot.firstChild?.data;
    //     if (data) {
    //       this.showFooter = data.showFooter !== false;
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
  }

}

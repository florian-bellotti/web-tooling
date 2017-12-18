import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-tooling',
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tooling-app',
  encapsulation: ViewEncapsulation.None,
  template:`<az-navbar></az-navbar>
  <div class="container-fluid">
      <div class="row">
          <az-menu></az-menu>
          <!--<az-sidebar></az-sidebar>-->
          <div class="main-wrapper"  [ngClass]="{'menu-collapsed': isMenuCollapsed}">
              <div class="az-overlay" *ngIf="!isMenuCollapsed" (click)="hideMenu()"></div>

              <div class="main">
                  <!-- <az-breadcrumb></az-breadcrumb>-->
                  <router-outlet></router-outlet>
              </div>






              <az-back-top position="200"></az-back-top>

          </div>
      </div>
  </div>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent { }

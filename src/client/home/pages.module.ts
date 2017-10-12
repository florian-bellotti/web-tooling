import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { ToastrModule } from 'ngx-toastr';
import { DirectivesModule } from '../common/directives/directives.module';
import { PipesModule } from '../common/pipes/pipes.module';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { MenuComponent } from '../common/components/menu/menu.component';
import { SidebarComponent } from '../common/components/sidebar/sidebar.component';
import { NavbarComponent } from '../common/components/navbar/navbar.component';
import { MessagesComponent } from '../common/components/messages/messages.component';
import { BackTopComponent } from '../common/components/back-top/back-top.component';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    ToastrModule.forRoot(),
    DirectivesModule,
    PipesModule,
    routing
  ],
  declarations: [
    PagesComponent,
    MenuComponent,
    SidebarComponent,
    NavbarComponent,
    MessagesComponent,
    BackTopComponent
  ]
})
export class PagesModule { }

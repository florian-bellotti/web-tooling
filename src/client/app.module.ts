import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { PagesComponent } from './home/pages/HomePage/HomePage';
import { MessagesComponent } from './common/components/messages/messages.component';
import { BackTopComponent } from './common/components/back-top/back-top.component';
import { DirectivesModule } from './common/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagesComponent,
    MessagesComponent,
    BackTopComponent
  ],
  imports: [
    DirectivesModule,
    BrowserModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

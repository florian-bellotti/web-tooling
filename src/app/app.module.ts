import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { PagesComponent } from './home/pages/HomePage/HomePage';
import { MessagesComponent } from './common/components/messages/messages.component';
import { BackTopComponent } from './common/components/back-top/back-top.component';
import { DirectivesModule } from './common/directives/directives.module';
import {LoginModule} from './login/login.module';
import {AuthService} from './login/providers/auth.service';
import {AuthGuard} from "./login/providers/auth-guard.service";
import {AppConfig} from "./app.config";

import {HeaderService} from './user/providers/header.service'
import {TokenService} from './user/providers/token.service';

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
      LoginModule,
      HttpModule,
      routing
  ],
  providers: [AuthService, AuthGuard, HttpModule, AppConfig, HeaderService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }

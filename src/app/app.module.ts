// vendors
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

// imports
import {AppComponent} from './app.component';
import {AuthService} from './login/providers/auth.service';
import {AuthGuard} from './login/providers/auth-guard.service';
import {AppConfig} from './app.config';
import {AppState} from './app.state';
import {BackTopComponent} from './common/components/back-top/back-top.component';
import {CoreRoutingModule} from './core/core-rooting.module';
import {DirectivesModule} from './common/directives/directives.module';
import {HeaderService} from './core/user/providers/header.service';
import {LoginRoutingModule} from './login/login-rooting.module';
import {MessagesComponent} from './common/components/messages/messages.component';
import {TokenService} from './core/user/providers/token.service';
import {MenuComponent} from './common/components/menu/menu.component';
import {TemplateComponent} from './core/template.component';
import {NavbarComponent} from './common/components/navbar/navbar.component';
import {PipesModule} from './common/pipes/pipes.module';
import {ProjectsModule} from './core/project/projects.module';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TemplateComponent,
        MessagesComponent,
        BackTopComponent,
        MenuComponent
    ],
    imports: [
        PipesModule,
        DirectivesModule,
        BrowserModule,
        BrowserAnimationsModule,
        LoginRoutingModule,
        CoreRoutingModule,
        ProjectsModule,
        HttpModule
    ],
    providers: [AuthService, AuthGuard, HttpModule, AppConfig, AppState, HeaderService, TokenService],
    bootstrap: [AppComponent]
})
export class AppModule { }

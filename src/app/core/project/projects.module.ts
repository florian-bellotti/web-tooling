import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ChartsModule} from 'ng2-charts';

import {DirectivesModule} from '../../common/directives/directives.module';
import {PipesModule} from '../../common/pipes/pipes.module';

import {ProjectService} from './providers/project.service';
import {ActivityTypeService} from './providers/activityType.service';

import {ProjectListComponent} from './project-list.component';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectRoutingModule} from './projects-rooting.module';
import {ActivityService} from "../cra/providers/activity.service";
import {UserService} from "../user/providers/user.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule,
        ChartsModule,
        ProjectRoutingModule
    ],
    declarations: [
        ProjectListComponent,
        ProjectDetailComponent
    ],
    providers: [
        ProjectService,
        ActivityTypeService,
        ActivityService,
        UserService
    ]
})
export class ProjectsModule { }

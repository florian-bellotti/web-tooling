import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../common/directives/directives.module';
import {ProjectService} from '../project/providers/project.service';
import {ActivityTypeService} from '../project/providers/activityType.service';
import {ActivityService} from '../cra/providers/activity.service';
import {HomeComponent} from './home.component';
import {ChartsModule} from "ng2-charts";

export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        ChartsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        ProjectService, ActivityService, ActivityTypeService
    ]
})
export class HomeModule { }

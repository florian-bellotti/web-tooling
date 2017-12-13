import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProjectComponent} from './project.component';
import {DirectivesModule} from '../../../common/directives/directives.module';
import {ProjectService} from './providers/project.service';
import {ActivityTypeService} from './providers/activityType.service';

export const routes = [
    { path: '', component: ProjectComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProjectComponent
    ],
    providers: [
        ProjectService,
        ActivityTypeService
    ]
})
export class ProjectModule { }

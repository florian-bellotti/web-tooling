// vendors
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// imports
import { CraComponent } from './cra.component';
import {ProjectService} from '../project/providers/project.service';
import {ActivityService} from './providers/activity.service';
import {ActivityTypeService} from '../project/providers/activityType.service';
import {DirectivesModule} from '../../common/directives/directives.module';

export const routes = [
  { path: '', component: CraComponent, pathMatch: 'full' }
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
    CraComponent
  ],
    providers: [
        ProjectService,
        ActivityService,
        ActivityTypeService
    ]
})
export class CraModule { }

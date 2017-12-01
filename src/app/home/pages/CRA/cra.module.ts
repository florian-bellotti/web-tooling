import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CraComponent } from './cra.component';
import { DirectivesModule } from '../../../common/directives/directives.module';
import {ProjectService} from './providers/project.service';
import {ActivityService} from './providers/activity.service';

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
        ProjectService, ActivityService
    ]
})
export class CraModule { }

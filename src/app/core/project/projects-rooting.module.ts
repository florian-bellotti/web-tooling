import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list.component';
import { ProjectDetailComponent } from './project-detail.component';
import {AuthGuard} from '../../login/providers/auth-guard.service';
import {TemplateComponent} from '../template.component';

const router: Routes = [
    {
        path: '',
        component: TemplateComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'projects',  component: ProjectListComponent },
            { path: 'project/:id', component: ProjectDetailComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(router)
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CraComponent } from './cra.component';
import { DirectivesModule } from '../../../common/directives/directives.module';

export const routes = [
  { path: 'cra', component: CraComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CraComponent
  ]
})
export class CraModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CraComponent } from './cra.component';
import { DirectivesModule } from '../../../common/directives/directives.module';
import {CraService} from './providers/cra.service'

export const routes = [
  { path: '', component: CraComponent, pathMatch: 'full' }
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
  ],
    providers: [CraService]
})
export class CraModule { }

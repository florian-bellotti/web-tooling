import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent} from './users.component';
import {UserService} from '../user/providers/user.service'

export const routes = [
    { path: '', component: UsersComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [UsersComponent],
    providers: [UserService]
})

export class UsersModule {}

// vendors
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
// imports
import {AuthGuard} from '../login/providers/auth-guard.service';
import {MenuComponent} from '../common/components/menu/menu.component';
import {TemplateComponent} from './template.component';

const routes = [
    {
        path: '',
        component: TemplateComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'cra', loadChildren: './cra/cra.module#CraModule' },
            { path: 'profile', loadChildren: './user/user.module#UserModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {})
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class CoreRoutingModule {}

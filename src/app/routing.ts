// Vendor
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Internal
import { PagesComponent } from './home/pages/HomePage/HomePage';
import {AuthGuard} from './login/providers/auth-guard.service';

export const routes: Routes = [
  {
      path: '',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
          { path: 'cra', loadChildren: './home/pages/cra/cra.module#CraModule' },
          { path: 'login', loadChildren: './login/login.module#LoginModule' },
          { path: 'profile', loadChildren: './user/user.module#UserModule' },
          { path: 'settings/users', loadChildren: './users/users.module#UsersModule' },
          { path: 'settings/projects', loadChildren: './home/pages/project/project.module#ProjectModule' },
          { path: '**', redirectTo: 'cra'}
      ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});

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
      pathMatch: 'full',
      canActivate: [AuthGuard],
  },
    { path: 'cra',  loadChildren: './home/pages/cra/cra.module#CraModule' },
    { path: 'login',  loadChildren: './login/login.module#LoginModule' },
    { path: 'user',  loadChildren: './user/user.module#UserModule' },
    {path: '**', redirectTo: ''}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});

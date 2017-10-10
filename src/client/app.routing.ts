// Vendor
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', loadChildren: 'client/pages/pages.module#PagesModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});

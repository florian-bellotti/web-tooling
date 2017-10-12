// Vendor
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: 'client/home/pages.module#PagesModule', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});

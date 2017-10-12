// Vendor
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Internal
import { PagesComponent } from './home/pages/HomePage/HomePage';

export const routes: Routes = [
  { path: '', component: PagesComponent, pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});

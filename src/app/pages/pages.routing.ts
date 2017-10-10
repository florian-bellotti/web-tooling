import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'blank', pathMatch:'full' },
            { path: 'blank', component: BlankComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

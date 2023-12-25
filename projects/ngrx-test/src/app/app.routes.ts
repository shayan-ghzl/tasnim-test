import { Routes } from '@angular/router';
import { isLoggedInGuard } from './shared/guards/register.guard';
import { taxGuard } from './shared/guards/tax.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
        canActivate: [isLoggedInGuard]
    },
    {
        path: 'taxs-list',
        loadComponent: () => import('./taxs-list/taxs-list.component').then(m => m.TaxsListComponent),
        canActivate: [taxGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'taxs-list'
    }
];


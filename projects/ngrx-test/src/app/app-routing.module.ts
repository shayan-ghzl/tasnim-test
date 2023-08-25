import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { isLoggedInGuard } from './shared/guards/register.guard';
import { taxGuard } from './shared/guards/tax.guard';
import { TaxsListComponent } from './taxs-list/taxs-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [isLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [isLoggedInGuard] },
  { path: 'taxs-list', component: TaxsListComponent, canActivate: [taxGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'taxs-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

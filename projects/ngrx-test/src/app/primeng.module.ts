import { NgModule } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  exports: [
    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PasswordModule
  ]
})
export class PrimengModule { }

import { NgModule } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  exports: [
    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class PrimengModule { }

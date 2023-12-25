import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppState, taxsFeature } from '../store/features';

@Component({
  selector: 'app-taxs-list',
  templateUrl: './taxs-list.component.html',
  styleUrls: ['./taxs-list.component.scss'],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TableModule
  ],
  standalone: true
})
export class TaxsListComponent {

  taxs$ = this.store.select(taxsFeature.selectTaxsState);

  constructor(
    private store: Store<AppState>,
  ) { }
}

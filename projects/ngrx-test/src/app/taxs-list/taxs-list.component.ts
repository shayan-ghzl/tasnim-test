import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, taxsFeature } from '../store/features';

@Component({
  selector: 'app-taxs-list',
  templateUrl: './taxs-list.component.html',
  styleUrls: ['./taxs-list.component.scss']
})
export class TaxsListComponent {

  taxs$ = this.store.select(taxsFeature.selectTaxsState);

  constructor(
    private store: Store<AppState>,
  ) { }
}

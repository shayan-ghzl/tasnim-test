import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, loadingFeature } from './store/features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading$ = this.store.select(loadingFeature.selectLoadingState);

  constructor(
    private store: Store<AppState>,
  ) {
  }

}

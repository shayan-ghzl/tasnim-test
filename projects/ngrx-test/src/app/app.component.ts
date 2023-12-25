import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppState, loadingFeature } from './store/features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    CommonModule,
    ProgressSpinnerModule
  ],
  standalone: true
})
export class AppComponent {

  loading$ = this.store.select(loadingFeature.selectLoadingState);

  constructor(
    private store: Store<AppState>,
  ) { }

}

import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule as _StoreModule } from '@ngrx/store';
import { ApplicationEffects } from './effects';
import { reducers } from './features';

@NgModule({
  imports: [
    _StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ApplicationEffects]),
  ]
})
export class StoreModule { }

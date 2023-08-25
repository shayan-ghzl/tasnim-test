import { ActionReducerMap, createFeature, createReducer, on } from "@ngrx/store";

import { ITax } from "../shared/models/models";
import { LoadingActions, TaxActions } from "./actions";


export interface AppState {
  taxs: ITax[] | null;
  loading: boolean;
}

// ----------------user-reducer-and-selector----------------

const taxsInitialState: ITax[] | null = null;

export const taxsFeature = createFeature({
  name: 'taxs',
  reducer: createReducer(
    taxsInitialState as ITax[] | null,
    on(TaxActions.set, (state, prop) => prop.taxs),
  ),
});

// ----------------loading-reducer-and-selector----------------


const loadingInitialState = true;

export const loadingFeature = createFeature({
  name: 'loading',
  reducer: createReducer(
    loadingInitialState,
    on(LoadingActions.set, (state, prop) => prop.enable),
  ),
});

// --------------------------------

// this is a top level reducer
export const reducers: ActionReducerMap<AppState> = {
  [taxsFeature.name]: taxsFeature.reducer,
  [loadingFeature.name]: loadingFeature.reducer,
};

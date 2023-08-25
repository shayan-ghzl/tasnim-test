import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ITax } from "../shared/models/models";


export const LoadingActions = createActionGroup({
  source: 'Loading API/Manipulation',
  events: {
    set: props<{ enable: boolean; }>(),
  },
});

// --------------------------------

export const TaxActions = createActionGroup({
  source: 'Tax API/Manipulation',
  events: {
    startEffect: emptyProps(),
    set: props<{ taxs: ITax[]; }>(),
  },
});

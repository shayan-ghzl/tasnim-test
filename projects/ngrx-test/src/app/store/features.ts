import { ActionReducerMap, createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { IFilter, IUser } from "src/app/shared/models/models";
import { FilterActions, UserActions } from "./actions";


export interface AppState {
  users: IUser[] | null;
  filters: IFilter;
}

// ----------------user-reducer-and-selector----------------

const userInitialState: IUser[] | null = null;

export const userFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    userInitialState as IUser[] | null,
    on(UserActions.set, (state, prop) => prop.users),
    on(UserActions.add, (state, prop) => {
      let updateStatus = false;
      let modifiedList: IUser[] = [];
      if (state) {
        modifiedList = state.map(p => {
          if (p.id == prop.user.id) {
            updateStatus = true;
            return prop.user;
          } else {
            return p;
          }
        });
      }
      if (!updateStatus) {
        modifiedList.push(prop.user);
      }
      return modifiedList;
    }),
    on(UserActions.remove, (state, prop) => (state && state.filter(p => p.id != prop.userId)) || []),
  ),
});

// ----------------filter-reducer-and-selector----------------

// set last 24 hours to datepicker
const temp = new Date();
temp.setDate(temp.getDate() - 1);

const filterInitialState: IFilter = {
  gender: {
    female: true,
    male: true,
    others: true
  },
  age: {
    operation: {
      equal: true,
      greater: false,
      smaller: false
    },
    value: 0
  },
  eyeColor: {},
  birthDate: [new Date(), temp]
};

export const filterFeature = createFeature({
  name: 'filters',
  reducer: createReducer(
    filterInitialState,
    on(FilterActions.set, (state, prop) => prop.filters),
    on(FilterActions.genderUpdate, (state, prop) => ({ ...state, gender: prop.gender })),
    on(FilterActions.dateUpdate, (state, prop) => ({ ...state, birthDate: prop.dateFilter })),
    on(FilterActions.ageUpdate, (state, prop) => ({ ...state, age: prop.age })),
    on(FilterActions.eyeColorUpdate, (state, prop) => ({ ...state, eyeColor: prop.eyeColor })),
    on(FilterActions.ageOperationUpdate, (state, prop) => ({ ...state, age: { ...state.age, operation: prop.operation } })),
  ),
  extraSelectors: ({ selectGender, selectAge }) => ({
    selectCustomObject: createSelector(
      selectGender,
      selectAge,
      (gender, age) => ({ 'ageIs': age, 'genderIs': gender })
    ),
  }),
});

// --------------------------------

// this is a top level reducer
export const reducers: ActionReducerMap<AppState> = {
  [userFeature.name]: userFeature.reducer,
  [filterFeature.name]: filterFeature.reducer,
};

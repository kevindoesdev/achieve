import {
  PayloadAction,
  createSlice,
  nanoid,
  createSelector,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export interface PlaygroundState {
  insertOrFetch: InsertOrFetch;
}

interface Indexable<T> {
  [index: string]: T;
}

export interface InsertOrFetch extends Indexable<IdValue> {}

export interface IdValue {
  id: string;
  value: string;
}

const reduceToMap = <T extends object, K extends keyof T>(
  key: K,
  array: T[],
) => {
  const obj: Indexable<T> = {};

  return array.reduce((o, value) => {
    o[value[key] + ''] = value;
    return o;
  }, obj);
};

export const initialState: PlaygroundState = {
  insertOrFetch: reduceToMap('id', [
    { id: nanoid(), value: 'Red' },
    { id: nanoid(), value: 'Green' },
    { id: nanoid(), value: 'Blue' },
  ]),
};

const slice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    insertIfMissing: {
      reducer: (state, action: PayloadAction<IdValue>) => {
        if (!action.payload.value) {
          return;
        }

        const tag = selectIoFByValue(state, action.payload.value);

        if (!tag) {
          state.insertOrFetch[action.payload.id] = action.payload;
        }
      },
      prepare: (value: string) => ({
        payload: {
          id: nanoid(),
          value,
        },
      }),
    },
  },
});

type State = RootState | PlaygroundState;

const getPlayground = (state: State): PlaygroundState =>
  (state as any).playground || state;

const getInsertOrFetch = (state: RootState) =>
  getPlayground(state).insertOrFetch;

export const __selectAllIoF = (state: State) => {
  return Object.values(getPlayground(state).insertOrFetch);
};

export const selectAllIoF = createSelector(getInsertOrFetch, insertOrFetch =>
  Object.values(insertOrFetch),
);

export const selectIoFByValue = (state: State, value: string) =>
  Object.values(getPlayground(state).insertOrFetch).find(
    item => item.value === value,
  );

export const { insertIfMissing } = slice.actions;

export default slice.reducer;

import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { Id, IndexOf, Tag } from '../../types';
import { toIndexOf, delayedDispatch } from '../../utils';

export interface TagState {
  items: IndexOf<Tag>;
}

export const initialState: TagState = {
  items: toIndexOf([
    {
      id: nanoid(),
      label: 'First tag',
    },
    {
      id: nanoid(),
      label: 'Second',
    },
  ]),
};

const slice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    insertOrFetchTag: {
      reducer: (state, action: PayloadAction<Tag>) => {
        const tag = selectTagByValue(state, action.payload.label);

        if (!tag) {
          state.items[action.payload.id] = action.payload;
        }
      },
      prepare: (label: string) => ({
        payload: {
          id: nanoid(),
          label,
        },
      }),
    },
  },
});

type State = RootState | TagState;

const getTagState = (state: State): TagState => (state as any).tags || state;

const getTagItems = (state: State) => getTagState(state).items;

export const selectTodoById = createSelector(
  [getTagItems, (_: State, id: Id) => id],
  (items, id) => items[id],
);

export const selectTags = createSelector(getTagItems, items =>
  Object.values(items),
);

export const selectTagById = createSelector(
  [getTagItems, (_: State, id: Id) => id],
  (items, id) => items[id],
);

export const selectTagByValue = createSelector(
  [getTagItems, (_: State, label: string) => label],
  (items, label) => Object.values(items).find(tag => tag.label === label),
);

export default slice.reducer;
export const { insertOrFetchTag } = slice.actions;

export const delayedInsertOrFetchTag = delayedDispatch(
  'tags/delayedInsertOrFetchTag',
  5000,
  insertOrFetchTag,
);

import { createSlice, nanoid } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { Id, IndexOf, Todo } from '../../types';
import { notEmpty, toIndexOf } from '../../utils';
import { initialState as tagState, selectTagByValue } from '../tags/slice';

export interface TodoState {
  items: IndexOf<Todo>;
}

const getTagIds = (...tags: string[]): Id[] =>
  tags.map(tag => selectTagByValue(tagState, tag)?.id).filter(notEmpty);

export const initialState: TodoState = {
  items: toIndexOf([
    {
      id: nanoid(),
      label: 'This is the first item',
      tags: getTagIds('First tag', 'Second'),
    },
    {
      id: nanoid(),
      label: 'This is the second item',
      tags: getTagIds('First tag'),
    },
    {
      id: nanoid(),
      label: 'This is the third item',
      tags: [],
    },
  ]),
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

type State = RootState | TodoState;

const getTodoState = (state: State): TodoState => (state as any).todos || state;

export interface TodoFilter {}

export const selectTodos = (state: State, filter: TodoFilter = {}) =>
  Object.values(getTodoState(state).items);

export const selectTodoById = (state: State, id: Id) =>
  getTodoState(state).items[id];

//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default slice.reducer;

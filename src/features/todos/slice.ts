import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { Id, IndexOf, Todo } from '../../types';
import { delayedDispatch, notEmpty, toIndexOf } from '../../utils';
import { initialState as tagState, selectTagByValue } from '../tags/slice';

export interface TodoState {
  items: IndexOf<Todo>;
}

const getTagIds = (...tags: string[]): Id[] =>
  tags.map(tag => selectTagByValue(tagState, tag)?.id).filter(notEmpty);

export const makeNewTodo = (): Todo => {
  return {
    id: '',
    label: '',
    tags: [],
    notes: '',
  };
};

export const initialState: TodoState = {
  items: toIndexOf([
    {
      id: nanoid(),
      label: 'This is the first item',
      tags: getTagIds('First tag', 'Second'),
      notes: 'This is a short note.',
    },
    {
      id: nanoid(),
      label: 'This is the second item',
      tags: getTagIds('First tag'),
      notes:
        'https://asdf.com Over the course of the ~2.5 years, I’ve been reading around the topic of personal knowledge management (PKM) and related areas like note-taking and metacognition. In trying to adopt better ways to understand how I collect, digest, organise, and combine things I learn (aka PKM), I have also gotten more serious about the tools I use, and have been trying out a few different ones.',
    },
    {
      id: nanoid(),
      label: 'This is the third item',
      tags: [],
      notes: '',
    },
  ]),
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    upsertTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        const todo = action.payload;
        state.items[todo.id] = todo;
      },
      prepare: (item: Todo) => ({
        payload: {
          ...item,
          id: item.id ? item.id : nanoid(),
        },
      }),
    },
  },
});

type State = RootState | TodoState;

const getTodoState = (state: State): TodoState => (state as any).todos || state;

const getTodoItems = (state: State) => getTodoState(state).items;

export const selectTodos = createSelector(getTodoItems, items =>
  Object.values(items),
);

export const selectTodoById = createSelector(
  [getTodoItems, (_: State, id: Id) => id],
  (items, id) => items[id],
);

export const { upsertTodo } = slice.actions;

export default slice.reducer;

export const upsertTodoDelayed = delayedDispatch(
  'playground/insertIfMissingDelayed',
  2000,
  upsertTodo,
);

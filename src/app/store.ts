import { configureStore } from '@reduxjs/toolkit';

import tagsReducer from '../features/tags/slice';
import todosReducer from '../features/todos/slice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    tags: tagsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

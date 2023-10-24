import { createSlice, nanoid } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export interface PlaygroundState {}

export const initialState: PlaygroundState = {};

const slice = createSlice({
  name: 'playground',
  initialState,
  reducers: {},
});

//type State = RootState | PlaygroundState;

//const getPlaygroundState = (state: State): PlaygroundState => (state as any).todos || state;

export interface TodoFilter {}

//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default slice.reducer;

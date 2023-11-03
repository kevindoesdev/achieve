import { createAsyncThunk } from '@reduxjs/toolkit';

export const delayedDispatch = <F extends (arg: any) => any>(
  name: string,
  delay: number,
  fn: F,
) =>
  createAsyncThunk(name, async (arg: Parameters<typeof fn>[0], thunkAPI) => {
    await new Promise(r => setTimeout(r, delay));
    thunkAPI.dispatch(fn(arg));
  });

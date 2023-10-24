import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Id, IndexOf, Tag } from '../../types';
import { toIndexOf } from '../../utils';

export interface TagState {
  items: IndexOf<Tag>
} 

export const initialState: TagState = {
  items: toIndexOf([
    {
      id: nanoid(),
      label: "First tag",
    },
    {
      id: nanoid(),
      label: "Second"
    }
  ])
}

const slice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: {
      reducer: (state, action: PayloadAction<Tag>) => {
        const tag = selectTagByValue(state, action.payload.label);

        if (!tag) {
          state.items[action.payload.id] = action.payload
        }
      },
      prepare: (label: string) => ({
        payload: {
          id: nanoid(),
          label
        }
      }),
    }
  }
})

type State = RootState | TagState;

const getTagState = (state: State): TagState => (state as any).tags || state;

export const selectTags = (state: State) => Object.values(getTagState(state).items);

export const selectTagById = (state: State, id: Id) => getTagState(state).items[id];

export const selectTagByValue = (state: State, label: string) =>
  Object.values(getTagState(state).items).find((tag) => tag.label === label);

  
export default slice.reducer
//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions



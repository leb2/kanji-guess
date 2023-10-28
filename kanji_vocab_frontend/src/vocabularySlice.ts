import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserGuess} from "./types";
import {gaussianRandom} from "./util";

const makeInitialState = () => ({
  tGuess: 2.5 + gaussianRandom(0, 0.1) as number,
  userGuesses: [] as UserGuess[],
  version: 1
})

export type VocabularyState = ReturnType<typeof makeInitialState>
export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState: makeInitialState(),
  reducers: {
    setTGuess: (state: VocabularyState, action: PayloadAction<number>) => {
      state.tGuess = action.payload;
    },
    registerGuess: (state: VocabularyState, action: PayloadAction<UserGuess>) => {
      state.userGuesses = [...state.userGuesses, action.payload]
    },
    reset: (state: VocabularyState) => {
      const initialState = makeInitialState()
      state.tGuess = initialState.tGuess
      state.userGuesses = initialState.userGuesses
      state.version = state.version + 1
    }
  }
});

export const { setTGuess, registerGuess, reset } = vocabularySlice.actions;

export default vocabularySlice.reducer;
export type RootState = {
  vocabulary: VocabularyState;
};
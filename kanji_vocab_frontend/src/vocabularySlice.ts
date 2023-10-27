import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserGuess} from "./types";

const initialState = {
  tGuess: -1 as number,
  userGuesses: [] as UserGuess[],
};

export type VocabularyState = typeof initialState
export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setTGuess: (state: VocabularyState, action: PayloadAction<number>) => {
      state.tGuess = action.payload;
    },
    registerGuess: (state: VocabularyState, action: PayloadAction<UserGuess>) => {
      state.userGuesses = [...state.userGuesses, action.payload]
    }
  }
});

export const { setTGuess, registerGuess } = vocabularySlice.actions;

export default vocabularySlice.reducer;
export type RootState = {
  vocabulary: VocabularyState;
};
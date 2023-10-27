import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface VocabularyState {
  word: string;
  index: number;
}

const initialState: VocabularyState = {
  word: "",
  index: 0,
};

export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    incrementIndex: (state: VocabularyState) => {
      state.index += 1;
    },
    setWord: (state: VocabularyState, action: PayloadAction<string>) => {
      state.word = action.payload;
    }
  }
});

export const { incrementIndex, setWord } = vocabularySlice.actions;

// Thunk to fetch word
export const fetchWord = (index: number) => async (dispatch: any) => {
  const response = await axios.get(`/word/${index}`);
  dispatch(setWord(response.data.word));
};

export default vocabularySlice.reducer;
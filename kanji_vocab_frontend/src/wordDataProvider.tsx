import React from 'react';
import {Word} from "./types";

const WordDataContext = React.createContext([] as Word[]);

export const WordDataProvider = WordDataContext.Provider;

export default WordDataContext;
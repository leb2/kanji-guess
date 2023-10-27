
export type Word = {
    kanji: string;
    kana: string;
    logFrequency: number;
}

export type UserGuess = {
    word: Word,
    guessValue: string,
}

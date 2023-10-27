
export type Word = {
    kanji: string;
    kana: string;
    logFrequency: number;
    rank: number
}

export type UserGuess = {
    word: Word,
    guessValue: string,
}

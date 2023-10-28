import React, {useState, useContext, useRef, useMemo, MutableRefObject} from "react";
import './style.scss'
import * as wanakana from 'wanakana';
import {useDispatch, useSelector} from "react-redux";
import {RootState, setTGuess, registerGuess} from "../vocabularySlice";
import {findWordAtThreshold} from "../data/words";

import WordDataContext from "../wordDataProvider";
import {gaussianRandom, toKana} from "../util";
import ResultsView from "../results_view/results_view";
import {jsQUEST, NUM_QUESTIONS} from "../constants";
import {useEstimatedRank} from "../hooks";


export const KanjiTestPage = (props: { questRef: MutableRefObject<any>}) => {
    const { questRef } = props
    const [userGuess, setUserGuess] = useState("");
    const tGuess = useSelector((s: RootState) => s.vocabulary.tGuess)
    const dispatch = useDispatch()
    const kanaPreview = wanakana.toHiragana(userGuess, {IMEMode: true})
    const wordData = useContext(WordDataContext);
    const userGuesses = useSelector((s: RootState) => s.vocabulary.userGuesses)
    const numGuesses = useSelector((s: RootState) => s.vocabulary.userGuesses.length)
    const unseenWords = useMemo(() => {
        const seenWordsSet = new Set(userGuesses.map(guess => guess.word.kanji))
        return wordData.filter(word => !seenWordsSet.has(word.kanji))
    }, [wordData, userGuesses])

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const seed = useMemo(() => gaussianRandom(0, 0.1), [])
    const word = findWordAtThreshold(unseenWords, tGuess + seed)
    const estimatedRank = useEstimatedRank(questRef)

    // https://kurokida.github.io/jsQUEST/
    const handleSubmit = () => {
        const normalizedUserGuess = toKana(userGuess)
        const normalizedKana = toKana(word.kana)
        const isCorrect = normalizedUserGuess === normalizedKana

        const response = isCorrect ? 1 : 0
        questRef.current = jsQUEST.QuestUpdate(questRef.current, tGuess, response);

        // Set the new intensity
        const tTest = jsQUEST.QuestQuantile(questRef.current) + gaussianRandom(0, 0.1);
        dispatch(setTGuess(tTest))
        dispatch(registerGuess({
            word,
            guessValue: userGuess,
            isCorrect,
        }))
        if (inputRef.current) {
            inputRef.current.focus();
        }

        setUserGuess("")
    }
    const numCorrectGuesses = userGuesses.filter(userGuess => userGuess.isCorrect).length


    const instructionsText = "Type the reading in romaji to being."
    const showInstructions = numGuesses === 0 && !kanaPreview
    return (
        <div className="kanji-test-inner page">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${numGuesses / NUM_QUESTIONS * 100}%` }}></div>
            </div>
            <div className="info">
                <div>
                    { numCorrectGuesses } / { userGuesses.length }
                </div>
                <div>
                    { estimatedRank }
                </div>
            </div>
            <div className="japanese-word">
                { word.kanji }
                <div className="kana-preview-container compact">
                    { showInstructions ?  instructionsText : kanaPreview }
                </div>
            </div>
            <div className="kana-preview-container">
                { showInstructions ? (
                    <div className="instructions">
                        { instructionsText }
                    </div>
                ) : (
                    <div className="kana-preview">
                        {kanaPreview}
                    </div>
                )}
            </div>
            <div className="input-row">
                <input
                    type="text"
                    className="translation-input"
                    value={userGuess}
                    onChange={e => setUserGuess(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <button onClick={handleSubmit} className="button">
                    提出
                </button>
            </div>
            <ResultsView />
        </div>
    );
}

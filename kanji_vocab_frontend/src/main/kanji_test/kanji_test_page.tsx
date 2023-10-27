import React, {useState, useEffect, useCallback, useRef} from "react";
import './style.scss'
import * as wanakana from 'wanakana';
import {useDispatch, useSelector} from "react-redux";
import {RootState, setTGuess, registerGuess} from "../../vocabularySlice";
import {findWordAtThreshold} from "../data/words";

const jsQUEST = (window as any).jsQUEST


const tGuessSd = 2;
const pThreshold = 0.75;
const beta = 3.5;
const delta = 0.01;
const gamma = 0.5;

export const KanjiTestPage = () => {
    const [userGuess, setUserGuess] = useState("");
    const [kanaPreview, setKanaPreview] = useState("");
    const tGuess = useSelector((s: RootState) => s.vocabulary.tGuess)
    const questRef = useRef(jsQUEST.QuestCreate(tGuess, tGuessSd, pThreshold, beta, delta, gamma))
    const dispatch = useDispatch()

    useEffect(() => {
        setKanaPreview(wanakana.toKatakana(userGuess));
    }, [userGuess]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const word = findWordAtThreshold(tGuess)

    // https://kurokida.github.io/jsQUEST/
    const handleSubmit = () => {
        console.log("Submitting")
        const correct = false
        const response = correct ? 1 : 0
        questRef.current = jsQUEST.QuestUpdate(questRef.current, tGuess, response);

        // Set the new intensity
        const tTest = jsQUEST.QuestQuantile(questRef.current);
        console.log("Updating new ", tGuess, tTest)
        dispatch(setTGuess(tTest))
        dispatch(registerGuess({
            word,
            guessValue: userGuess,
        }))

        // const threshold = jsQUEST.QuestMean(questRef.current); // % Recommended by Pelli (1989) and King-Smith et al. (1994).
        // const sd = jsQUEST.QuestSd(questRef.current);
        // console.log("Threshold estimate:", threshold, "sd estimate:", sd)
        // console.log("Submitted:", kanaPreview);

        setUserGuess("")
    }

    return (
        <div className="kanji-test container">
            <div className="kanji-test-inner">
                <div className="progress-bar">
                    <div className="progress"></div>
                </div>
                <div className="japanese-word">{ word.kanji }</div>
                <div className="kana-preview">
                    {kanaPreview}
                </div>
                <div className="input-row">
                    <input
                        type="text"
                        className="translation-input"
                        placeholder="ローマ字で漢字の読みを入力してください"
                        value={userGuess}
                        onChange={e => setUserGuess(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSubmit} className="submit-button">
                        提出
                    </button>
                </div>
            </div>
        </div>
    );
}

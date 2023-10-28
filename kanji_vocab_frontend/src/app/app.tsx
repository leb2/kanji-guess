import {useSelector} from "react-redux";
import {RootState} from "../vocabularySlice";
import React, {useRef} from "react";
import {KanjiTestPage} from "../kanji_test/kanji_test_page";
import {ResultsScreen} from "../result_screen/results_screen";
import {jsQUEST, NUM_QUESTIONS} from "../constants";


const tGuessSd = 5;
const pThreshold = 0.6;
const beta = 0.05;
const delta = 0.2; // lapse rate
const gamma = 0.2; // guess rate
const grain = 0.01
const range = 7.7780

export const AppInner = () => {
    const userGuesses = useSelector((s: RootState) => s.vocabulary.userGuesses)
    const tGuess = useSelector((s: RootState) => s.vocabulary.tGuess)
    const questRef = useRef(jsQUEST.QuestCreate(tGuess, tGuessSd, pThreshold, beta, delta, gamma, grain, range))

    return (
        <div className="kanji-test container">
            { userGuesses.length < NUM_QUESTIONS ? (
                <KanjiTestPage questRef={questRef} />
            ) : (
                <ResultsScreen questRef={questRef} />
            )}
        </div>
    )
}

export const App = () => {
    const version = useSelector((s: RootState) => s.vocabulary.version)
    return <AppInner key={version} />
}

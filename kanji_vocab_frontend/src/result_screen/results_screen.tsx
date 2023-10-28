import ResultsView from "../results_view/results_view";
import React, {MutableRefObject} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reset, RootState} from "../vocabularySlice";
import {useEstimatedRank} from "../hooks";
import './styles.scss'

export const ResultsScreen = (props: { questRef: MutableRefObject<any> }) => {
    const { questRef } = props
    const userGuesses = useSelector((s: RootState) => s.vocabulary.userGuesses)
    const numCorrectGuesses = userGuesses.filter(userGuess => userGuess.isCorrect).length
    const estimatedRank = useEstimatedRank(questRef)
    const dispatch = useDispatch()
    const onReplay = () => {
        dispatch(reset())
    }

    return (
        <div className="results-screen page">
            <div className="result-box">
                <div className="desc">
                    Number of words known:
                </div>
                <div className="rank">
                    { estimatedRank }
                </div>
                <div className="score">
                    Score: { numCorrectGuesses } / { userGuesses.length }
                </div>
            </div>
            <div className="replay-row">
                <button onClick={onReplay} className="button">
                    Play again
                </button>
            </div>
            <ResultsView />
        </div>
    )
}
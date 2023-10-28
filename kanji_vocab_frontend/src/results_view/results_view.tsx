import {useSelector} from "react-redux";
import {RootState} from "../vocabularySlice";
import {UserGuess} from "../types";
import './styles.scss'
import {toKana} from "../util";
import classNames from "classnames";


const GuessDisplay = (props: { userGuess: UserGuess }) => {
    const word = props.userGuess.word;
    const isCorrect = toKana(word.kana) === toKana(props.userGuess.guessValue);

    // Here's a simple way to determine styling:
    return (
        <div className={classNames(isCorrect ? "correct" : "incorrect", "guess-row")}>
            <div className="result-kanji">{word.kanji}</div>
            <div>
                { !isCorrect && (
                    <span className="result-guess">{toKana(props.userGuess.guessValue)}</span>
                )}
                <span className="result-kana">{word.kana}</span>
            </div>
        </div>
    );
}

const ResultsView = () => {
    const userGuesses = [...useSelector((s: RootState) => s.vocabulary.userGuesses)].reverse(); // Display in reverse order.
    if (userGuesses.length === 0) {
        return null
    }

    return (
        <div className="results-view">
            <div className="results-list">
                <div>
                    {userGuesses.map((guess, i) => <GuessDisplay userGuess={guess} key={i} />)}
                </div>
            </div>
        </div>
    )
}

export default ResultsView;

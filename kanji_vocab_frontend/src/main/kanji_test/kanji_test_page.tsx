import React, { useState, useEffect } from "react";
import './style.scss'
import * as wanakana from 'wanakana';

export const KanjiTestPage = () => {
    const [translation, setTranslation] = useState("");
    const [kanaPreview, setKanaPreview] = useState("");

    useEffect(() => {
        setKanaPreview(wanakana.toKatakana(translation));
    }, [translation]);

    const handleSubmit = () => {
        // Handle the submission logic here
        console.log("Submitted:", kanaPreview);
    };

    return (
        <div className="kanji-test container">
            <div className="kanji-test-inner">
                <div className="progress-bar">
                    <div className="progress"></div>
                </div>
                <div className="japanese-word">溶岩</div>
                <div className="kana-preview">
                    {kanaPreview}
                </div>
                <div className="input-row">
                    <input
                        type="text"
                        className="translation-input"
                        placeholder="ローマ字で漢字の読みを入力してください"
                        value={translation}
                        onChange={e => setTranslation(e.target.value)}
                    />
                    <button onClick={handleSubmit} className="submit-button">
                        提出
                    </button>
                </div>
            </div>
        </div>
    );
}

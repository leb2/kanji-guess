import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.scss'
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import Papa from 'papaparse';
import {store} from "./store";
import {KanjiTestPage} from "./kanji_test/kanji_test_page";
import { WordDataProvider } from './wordDataProvider';
import {App} from "./app/app";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

fetch('final_words.csv')
    .then(response => response.text())
    .then(data => {
        const parsedData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true
        });

        const transformedData = parsedData.data.map((entry: any) => ({
            kanji: entry.Word,
            kana: entry.Kana,
            logFrequency: parseFloat(entry["Log Frequency"]),
            rank: parseFloat(entry.Rank)
        })).sort((a, b) => a.logFrequency - b.logFrequency);

        root.render(
            <React.StrictMode>
                <WordDataProvider value={transformedData}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </WordDataProvider>
            </React.StrictMode>
        );
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

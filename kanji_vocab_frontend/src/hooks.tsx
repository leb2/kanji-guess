import {jsQUEST, VOCAB_SIZE_MULTIPLIER} from "./constants";
import {findWordAtThreshold} from "./data/words";
import {MutableRefObject, useContext} from "react";
import WordDataContext from "./wordDataProvider";

export const useEstimatedRank = (questRef: MutableRefObject<any>) => {
    const thresholdEstimate = jsQUEST.QuestMean(questRef.current);
    const wordData = useContext(WordDataContext);
    return Math.ceil(findWordAtThreshold(wordData, thresholdEstimate).rank * VOCAB_SIZE_MULTIPLIER)
}
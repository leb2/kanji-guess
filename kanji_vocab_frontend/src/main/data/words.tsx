
// Sample data
import {Word} from "../../types";

export const WORDS: Word[] = [
  {
    kanji: "溶岩",
    kana: "ようがん",
    logFrequency: -4.5
  },
  {
    kanji: "山",
    kana: "やま",
    logFrequency: -1
  },
  {
    kanji: "川",
    kana: "かわ",
    logFrequency: 0
  },
  {
    kanji: "日本",
    kana: "にほん",
    logFrequency: -0.5
  },
  {
    kanji: "魚",
    kana: "さかな",
    logFrequency: 1
  },
  {
    kanji: "学生",
    kana: "がくせい",
    logFrequency: 2
  },
  {
    kanji: "先生",
    kana: "せんせい",
    logFrequency: 2.5
  },
  {
    kanji: "車",
    kana: "くるま",
    logFrequency: -2
  },
  {
    kanji: "水",
    kana: "みず",
    logFrequency: 3
  },
  {
    kanji: "火",
    kana: "ひ",
    logFrequency: -3
  },
  {
    kanji: "花",
    kana: "はな",
    logFrequency: 4
  },
  {
    kanji: "犬",
    kana: "いぬ",
    logFrequency: -3.5
  },
  {
    kanji: "木",
    kana: "き",
    logFrequency: -0.2
  },
  {
    kanji: "友達",
    kana: "ともだち",
    logFrequency: -4
  },
  {
    kanji: "天気",
    kana: "てんき",
    logFrequency: 3.5
  },
  {
    kanji: "電話",
    kana: "でんわ",
    logFrequency: 0.8
  }
].sort((a, b) => a.logFrequency - b.logFrequency);

// Modified binary search function
export const findWordAtThreshold = (threshold: number): Word => {
  let left = 0;
  let right = WORDS.length - 1;
  let mid: number;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const midFrequency = WORDS[mid].logFrequency;

    if (midFrequency === threshold) {
      return WORDS[mid];
    } else if (midFrequency < threshold) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // At this point, left and right have crossed over. We'll determine which index is closer to the target frequency.
  const leftDist = left < WORDS.length ? Math.abs(WORDS[left].logFrequency - threshold) : Infinity;
  const rightDist = right >= 0 ? Math.abs(WORDS[right].logFrequency - threshold) : Infinity;

  if (leftDist < rightDist) {
    return WORDS[left];
  } else {
    return WORDS[right];
  }
}

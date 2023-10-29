// Sample data
import {Word} from "../types";
import {gaussianRandom} from "../util";

export const findWordAtThreshold = (words: Word[], threshold: number): Word => {
  let left = 0;
  let right = words.length - 1;
  let mid: number;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const midFrequency = words[mid].logFrequency;

    if (midFrequency === threshold) {
      return words[mid];
    } else if (midFrequency < threshold) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // After the binary search loop terminates, we will do a linear search
  // in the range between 'left' and 'right' to find the closest log frequency.
  let closestWord: Word = words[Math.min(left, words.length - 1)];
  let closestDistance = Math.abs(closestWord.logFrequency - threshold);

  for (let i = left; i <= right && i < words.length; i++) {
    const currentDistance = Math.abs(words[i].logFrequency - threshold);
    if (currentDistance < closestDistance) {
      closestDistance = currentDistance;
      closestWord = words[i];
    }
  }

  return closestWord;
}
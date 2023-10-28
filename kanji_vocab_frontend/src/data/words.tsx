// Sample data
import {Word} from "../types";
import {gaussianRandom} from "../util";

// Modified binary search function
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

  // At this point, left and right have crossed over. We'll determine which index is closer to the target frequency.
  const leftDist = left < words.length ? Math.abs(words[left].logFrequency - threshold) : Infinity;
  const rightDist = right >= 0 ? Math.abs(words[right].logFrequency - threshold) : Infinity;

  if (leftDist < rightDist) {
    return words[left];
  } else {
    return words[right];
  }
}

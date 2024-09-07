import { COLOR_VALUES } from "@/constants";
import { Bitmap, Entity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const { BLACK: K, BLUE_LIGHT: L, TRANSPARENT: T, WHITE: W } = COLOR_VALUES;

// prettier-ignore
const LARGE_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,L,W,W,W,W,W,K,T,T,K,W,W,W,W,W,W,L,W,W,W,W,W,K,T,T,K,W,W,W,W,W,W,L,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,L,L,W,W,W,L,W,W,W,W,K,T,K,W,W,W,L,L,W,W,W,L,W,W,W,W,K,T,K,W,W,W,L,L,W,W,W,L,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,L,W,W,W,W,W,W,W,W,W,W,K,K,W,W,W,L,W,W,W,W,W,W,W,W,W,W,K,K,W,W,W,L,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,K,W,W,L,W,W,W,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,L,W,W,L,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,L,L,L,L,W,W,W,L,L,L,L,W,W,W,W,L,W,L,L,L,W,W,W,L,L,L,L,W,W,W,W,L,W,L,L,L,W,W,W,L,L,L,L,W,W,W,W,L,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,L,L,L,L,L,L,W,L,L,L,L,L,W,W,W,W,L,L,L,L,L,L,W,L,L,L,L,L,W,W,W,W,L,L,L,L,L,L,W,L,L,L,L,L,W,W,W,W,W,W,W,W,W,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,L,L,W,W,W,W,L,L,L,W,W,W,W,W,W,W,L,L,W,W,W,W,L,L,L,W,W,W,W,W,W,W,L,L,W,W,W,W,L,L,L,W,W,W,W,W,W,W,W,K,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,K,W,W,W,W,W,W,W,W,K,W,W,W,W,W,W,K,W,W,W,W,W,W,W,W,K,W,W,W,W,W,W,K,W,W,W,W,W,W,W,W,K,W,W,K,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,K,T,K,K,W,W,W,W,K,K,T,K,K,W,W,W,K,T,K,K,W,W,W,W,K,K,T,K,K,W,W,W,K,T,K,K,W,W,W,W,K,K,T,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,T,T,T,T,K,K,K,K,T,T,T,T,T,K,K,K,T,T,T,T,K,K,K,K,T,T,T,T,T,K,K,K,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const MEDIUM_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,L,W,W,W,W,W,K,T,T,K,W,W,W,W,W,W,L,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,L,L,W,W,W,L,W,W,W,W,K,T,K,W,W,W,L,L,W,W,W,L,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,L,W,W,W,W,W,W,W,W,W,W,K,K,W,W,W,L,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,K,W,W,L,W,W,W,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,L,W,W,L,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,L,L,L,L,W,W,W,L,L,L,L,W,W,W,W,L,W,L,L,L,W,W,W,L,L,L,L,W,W,W,W,L,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,L,L,L,L,L,L,W,L,L,L,L,L,W,W,W,W,L,L,L,L,L,L,W,L,L,L,L,L,W,W,W,W,W,W,W,W,W,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,L,L,W,W,W,W,L,L,L,W,W,W,W,W,W,W,L,L,W,W,W,W,L,L,L,W,W,W,W,W,W,W,W,K,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,K,W,W,W,W,W,W,W,W,K,W,W,W,W,W,W,K,W,W,W,W,W,W,W,W,K,W,W,K,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,K,T,K,K,W,W,W,W,K,K,T,K,K,W,W,W,K,T,K,K,W,W,W,W,K,K,T,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,T,T,T,T,K,K,K,K,T,T,T,T,T,K,K,K,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const SMALL_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,L,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,L,L,W,W,W,L,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,L,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,K,W,W,L,W,W,W,W,W,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,L,W,W,L,W,W,W,W,W,W,L,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,L,L,L,L,W,W,W,L,L,L,L,W,W,W,W,L,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,L,L,L,L,L,L,W,L,L,L,L,L,W,W,W,W,W,W,W,W,W,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,L,L,W,W,W,W,L,L,L,W,W,W,W,W,W,W,W,K,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,K,W,W,W,W,W,W,W,W,K,W,W,K,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,K,T,K,K,W,W,W,W,K,K,T,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
];

const LARGE = drawBitmap(LARGE_BITMAP);
const MEDIUM = drawBitmap(MEDIUM_BITMAP);
const SMALL = drawBitmap(SMALL_BITMAP);

export class Cloud implements Entity {
  private get Image(): OffscreenCanvas {
    switch (this.size) {
      case "large":
        return LARGE;
      case "medium":
        return MEDIUM;
      default:
        return SMALL;
    }
  }

  position;
  size: "small" | "medium" | "large";

  get length() {
    return {
      x: gridUnits(this.size === "large" ? 5 : this.size === "medium" ? 4 : 3),
      y: gridUnits(2),
      z: 0,
    };
  }

  constructor(gridX: number, gridY: number, size: Cloud["size"]) {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -4,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(this.Image, 0, 0, this.length.x, this.length.y);
  }
}

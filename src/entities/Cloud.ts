import {
  COLOR_BLUE_LIGHT,
  COLOR_BLACK,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
} from "@/constants";
import { Bitmap, Entity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BLUE_LIGHT;
const K = COLOR_BLACK;
const T = COLOR_TRANSPARENT;
const W = COLOR_WHITE;

// prettier-ignore
const LARGE_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,K,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,K,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,B,W,W,W,W,W,K,T,T,K,W,W,W,W,W,W,B,W,W,W,W,W,K,T,T,K,W,W,W,W,W,W,B,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,B,B,W,W,W,B,W,W,W,W,K,T,K,W,W,W,B,B,W,W,W,B,W,W,W,W,K,T,K,W,W,W,B,B,W,W,W,B,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,B,W,W,W,W,W,W,W,W,W,W,K,K,W,W,W,B,W,W,W,W,W,W,W,W,W,W,K,K,W,W,W,B,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,K,W,W,B,W,W,W,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,B,W,W,B,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,B,B,B,B,W,W,W,B,B,B,B,W,W,W,W,B,W,B,B,B,W,W,W,B,B,B,B,W,W,W,W,B,W,B,B,B,W,W,W,B,B,B,B,W,W,W,W,B,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,B,B,B,B,B,B,W,B,B,B,B,B,W,W,W,W,B,B,B,B,B,B,W,B,B,B,B,B,W,W,W,W,B,B,B,B,B,B,W,B,B,B,B,B,W,W,W,W,W,W,W,W,W,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,B,B,W,W,W,W,B,B,B,W,W,W,W,W,W,W,B,B,W,W,W,W,B,B,B,W,W,W,W,W,W,W,B,B,W,W,W,W,B,B,B,W,W,W,W,W,W,W,W,K,K,T,T,T,T,T,T,T,T,T],
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
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,B,W,W,W,W,W,K,T,T,K,W,W,W,W,W,W,B,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,B,B,W,W,W,B,W,W,W,W,K,T,K,W,W,W,B,B,W,W,W,B,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,B,W,W,W,W,W,W,W,W,W,W,K,K,W,W,W,B,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,K,W,W,B,W,W,W,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,B,W,W,B,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,B,B,B,B,W,W,W,B,B,B,B,W,W,W,W,B,W,B,B,B,W,W,W,B,B,B,B,W,W,W,W,B,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,B,B,B,B,B,B,W,B,B,B,B,B,W,W,W,W,B,B,B,B,B,B,W,B,B,B,B,B,W,W,W,W,W,W,W,W,W,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,B,B,W,W,W,W,B,B,B,W,W,W,W,W,W,W,B,B,W,W,W,W,B,B,B,W,W,W,W,W,W,W,W,K,K,T,T,T,T,T,T,T,T,T],
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
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,B,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,B,B,W,W,W,B,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,B,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,W,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,K,W,W,B,W,W,W,W,W,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,W,W,B,W,W,B,W,W,W,W,W,W,B,W,W,W,W,W,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,B,B,B,B,W,W,W,B,B,B,B,W,W,W,W,B,W,W,W,W,W,W,W,W,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,W,W,W,W,W,B,B,B,B,B,B,W,B,B,B,B,B,W,W,W,W,W,W,W,W,W,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,W,W,W,W,B,B,W,W,W,W,B,B,B,W,W,W,W,W,W,W,W,K,K,T,T,T,T,T,T,T,T,T],
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

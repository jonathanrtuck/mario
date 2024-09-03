import { COLOR_BLACK, COLOR_GREEN, COLOR_TRANSPARENT } from "@/constants";
import { Bitmap, Entity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BLACK;
const G = COLOR_GREEN;
const T = COLOR_TRANSPARENT;

// prettier-ignore
const LARGE_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,G,G,G,G,G,G,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,G,G,G,G,G,G,G,G,G,G,G,G,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,B,B,B,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,B,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,B,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T],
  [T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T],
  [T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T],
  [T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T],
  [T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T],
  [T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T],
  [B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B],
];
// prettier-ignore
const SMALL_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,G,G,G,G,G,G,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,G,G,G,G,G,G,G,G,G,G,G,G,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,B,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,B,B,B,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,B,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,B,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T,T],
  [T,T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T,T],
  [T,T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T,T],
  [T,T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T,T],
  [T,T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T,T],
  [T,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B,T],
  [B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B],
];

const LARGE = drawBitmap(LARGE_BITMAP);
const SMALL = drawBitmap(SMALL_BITMAP);

export class Hill implements Entity {
  private get Image(): OffscreenCanvas {
    switch (this.size) {
      case "large":
        return LARGE;
      default:
        return SMALL;
    }
  }

  position;
  size: "small" | "large";

  get length() {
    return {
      x: gridUnits(this.size === "large" ? 5 : 3),
      y: gridUnits(this.size === "large" ? 3 : 2),
      z: 0,
    };
  }

  constructor(gridX: number, gridY: number, size: "small" | "large") {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -3,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(this.Image, 0, 0, this.length.x, this.length.y);
  }
}

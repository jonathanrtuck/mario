import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_BROWN_LIGHT,
  COLOR_TRANSPARENT,
} from "@/constants";
import { Bitmap, Entity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BROWN;
const K = COLOR_BLACK;
const L = COLOR_BROWN_LIGHT;
const T = COLOR_TRANSPARENT;

// prettier-ignore
const CASTLE_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,T,T,T,T,T,T,T,L,L,L,L,L,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [L,L,L,L,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,B,B,B,K,B,B,B,L,L,L,L,L,L,L,L,L,B,B,B,K,B,B,B,L,L,L,L,L,L,L,L,L,B,B,B,K,B,B,B,L,L,L,L,L,L,L,L,L,T,T,T,T,T,T,T,L,L,L,L,L],
  [B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,B,B,B,K,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,K,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,K,B,B,B,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B],
  [B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,B,B,B,K,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,K,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,K,B,B,B,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B],
  [B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,K,K,K,K,K,K,K,L,B,B,B,B,B,B,B,L,K,K,K,K,K,K,K,L,B,B,B,B,B,B,B,L,K,K,K,K,K,K,K,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B],
  [B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B],
  [B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B],
  [B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,B,B,B,B,B,B,B,L,T,T,T,T,T,T,T,L,B,B,B,B],
  [K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K,K,K,K,L,L,L,L,L,L,L,L,L,K,K,K,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,K,K,K,K,K,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,K,K,K,K,K,K,K,K,K,K,K,K,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
];

const CASTLE = drawBitmap(CASTLE_BITMAP);

export class Castle implements Entity {
  length;
  position;

  constructor(gridX: number, gridY: number) {
    this.length = {
      x: gridUnits(5),
      y: gridUnits(5),
      z: 0,
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -1,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(CASTLE, 0, 0, this.length.x, this.length.y);
  }
}

import { FunctionComponent } from "react";

import { COLORS, PIXEL_DIMENSION } from "@/constants";
import { Pixels } from "@/types";

export const Bitmap: FunctionComponent<{ pixels: Pixels }> = ({ pixels }) => (
  <>
    {pixels.map((row, rowIndex) =>
      row.map((colorIndex, columnIndex) =>
        COLORS[colorIndex] === "transparent" ? null : (
          <rect
            fill={`var(--color-${COLORS[colorIndex]})`}
            height={PIXEL_DIMENSION}
            // eslint-disable-next-line react/no-array-index-key
            key={`${rowIndex}-${columnIndex}`}
            width={PIXEL_DIMENSION}
            x={PIXEL_DIMENSION * columnIndex}
            y={PIXEL_DIMENSION * rowIndex}
          />
        )
      )
    )}
  </>
);

Bitmap.displayName = "Bitmap";

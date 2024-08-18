import { useContext } from "react";

import { COLORS, GRID_DIMENSION, PIXEL_DIMENSION } from "@/constants";
import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

const BITMAP = [
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 4, 4, 4, 4, 3],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 1, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 3],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [1, 1, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1],
  [4, 4, 1, 1, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1],
  [4, 3, 4, 4, 1, 1, 1, 1, 4, 3, 3, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 4, 4, 4, 1, 4, 3, 3, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1, 1],
  [3, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 1, 1, 1, 1, 3],
];

export const Wall: EntityComponent = ({ dimensions, id, position }) => {
  const { universe } = useContext(StateContext);

  const x = position.x;
  const y = universe.dimensions.y - position.y - dimensions.y;

  const numCols = dimensions.x / GRID_DIMENSION;
  const numRows = dimensions.y / GRID_DIMENSION;

  return (
    <g id={id}>
      <pattern
        height={1 / numRows}
        id={`${id}-pattern-1`}
        width={1 / numCols}
        x={0}
        y={0}>
        {BITMAP.map((row, rowIndex) =>
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
      </pattern>
      <rect
        fill={`url(#${id}-pattern-1)`}
        height={dimensions.y}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 0}
      />
    </g>
  );
};

Wall.displayName = "Wall";

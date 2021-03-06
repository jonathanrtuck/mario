const CANVAS = document.querySelector("canvas");
const CTX = CANVAS.getContext("2d");
const HEIGHT = 240;
const WIDTH = 256;
const PIXEL_SCALE = 4;
const NUM_COLUMNS = HEIGHT / 16;
const NUM_ROWS = WIDTH / 16;

const Colors = [
  [0, 0, 0, 255], //       0 - Black
  [155, 157, 248, 255], // 1 - Blue
  [128, 184, 249, 255], // 2 - BlueLight
  [154, 95, 32, 255], //   3 - Brown
  [248, 211, 205, 255], // 4 - BrownLight
  [75, 154, 44, 255], //   5 - Green
  [121, 121, 36, 255], //  6 - GreenDark
  [164, 216, 67, 255], //  7 - GreenLight
  [255, 255, 255, 255], // 8 - White
  [227, 169, 76, 255], //  9 - YellowDark
];

const Sprite = {
  Block: [
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 3, 4, 4, 4, 4, 3],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 0, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 0, 0, 3],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 4, 4, 4, 4, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 3, 0],
    [4, 4, 0, 0, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 3, 0],
    [4, 3, 4, 4, 0, 0, 0, 0, 4, 3, 3, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 4, 4, 4, 0, 4, 3, 3, 3, 3, 3, 3, 0],
    [4, 3, 3, 3, 3, 3, 3, 0, 4, 3, 3, 3, 3, 3, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 3],
  ],
};

const setPixel = (data) => (colorIndex) => ([x, y]) => {
  // ignore offscreen pixels
  if (x < 0 || y < 0 || x > WIDTH - 1 || x > HEIGHT - 1) {
    return;
  }

  const [r, g, b, a] = Colors[colorIndex];
  const offest = y * WIDTH * 4 * PIXEL_SCALE * 4 + x * PIXEL_SCALE * 4;

  for (let i = 0; i !== 4; i++) {
    const yOffset = i * WIDTH * 4 * PIXEL_SCALE;

    for (let j = 0; j !== 4; j++) {
      const xOffset = j * 4;
      const index = offest + yOffset + xOffset;

      data[index + 0] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = a;
    }
  }
};

const setBackground = (data) => (colorIndex) => {
  for (let y = 0; y !== HEIGHT; y++) {
    for (let x = 0; x !== WIDTH; x++) {
      setPixel(data)(colorIndex)([x, y]);
    }
  }
};

const placeObject = (data) => (sprite) => ([column, row]) => {
  const numVerticalPixels = sprite.length;
  const numHorizontalPixels = sprite[0].length;

  const xOffset = column * 16;
  const yOffset = row * 16;

  for (let y = 0; y !== numVerticalPixels; y++) {
    for (let x = 0; x !== numHorizontalPixels; x++) {
      setPixel(data)(sprite[y][x])([xOffset + x, yOffset + y]);
    }
  }
};

const main = () => {
  const frame = CTX.createImageData(WIDTH * PIXEL_SCALE, HEIGHT * PIXEL_SCALE);

  setBackground(frame.data)(1);

  placeObject(frame.data)(Sprite.Block)([0, 13]);
  placeObject(frame.data)(Sprite.Block)([1, 13]);
  placeObject(frame.data)(Sprite.Block)([2, 13]);
  placeObject(frame.data)(Sprite.Block)([3, 13]);
  placeObject(frame.data)(Sprite.Block)([4, 13]);
  placeObject(frame.data)(Sprite.Block)([5, 13]);
  placeObject(frame.data)(Sprite.Block)([6, 13]);
  placeObject(frame.data)(Sprite.Block)([7, 13]);
  placeObject(frame.data)(Sprite.Block)([8, 13]);
  placeObject(frame.data)(Sprite.Block)([9, 13]);
  placeObject(frame.data)(Sprite.Block)([10, 13]);
  placeObject(frame.data)(Sprite.Block)([11, 13]);
  placeObject(frame.data)(Sprite.Block)([12, 13]);
  placeObject(frame.data)(Sprite.Block)([13, 13]);
  placeObject(frame.data)(Sprite.Block)([14, 13]);
  placeObject(frame.data)(Sprite.Block)([15, 13]);
  placeObject(frame.data)(Sprite.Block)([0, 14]);
  placeObject(frame.data)(Sprite.Block)([1, 14]);
  placeObject(frame.data)(Sprite.Block)([2, 14]);
  placeObject(frame.data)(Sprite.Block)([3, 14]);
  placeObject(frame.data)(Sprite.Block)([4, 14]);
  placeObject(frame.data)(Sprite.Block)([5, 14]);
  placeObject(frame.data)(Sprite.Block)([6, 14]);
  placeObject(frame.data)(Sprite.Block)([7, 14]);
  placeObject(frame.data)(Sprite.Block)([8, 14]);
  placeObject(frame.data)(Sprite.Block)([9, 14]);
  placeObject(frame.data)(Sprite.Block)([10, 14]);
  placeObject(frame.data)(Sprite.Block)([11, 14]);
  placeObject(frame.data)(Sprite.Block)([12, 14]);
  placeObject(frame.data)(Sprite.Block)([13, 14]);
  placeObject(frame.data)(Sprite.Block)([14, 14]);
  placeObject(frame.data)(Sprite.Block)([15, 14]);

  CTX.putImageData(frame, 0, 0);
};

main();

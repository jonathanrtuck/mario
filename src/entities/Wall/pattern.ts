import { COLOR_BROWN } from "@/constants";
import { getRGBA, gridUnits } from "@/utils";

const offscreenCanvas = new OffscreenCanvas(gridUnits(1), gridUnits(1));
const offscreenCanvasContext = offscreenCanvas.getContext("2d")!;

offscreenCanvasContext.fillStyle = getRGBA(COLOR_BROWN);
offscreenCanvasContext.fillRect(0, 0, gridUnits(1 / 2), gridUnits(1 / 2));

export { offscreenCanvas as pattern };

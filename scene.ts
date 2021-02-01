import { createScene } from "./baseGeometry";
import { canvas, Rectangle, Circle } from "./objects";
import * as tf from "@tensorflow/tfjs";
import { zip } from "lodash";

tf.randomNormal([1, 10]).data();

const { yellow, orange, red, darkpink, violet } = {
  yellow: "#ffd319",
  orange: "#ff901f",
  red: "#ff2975",
  darkpink: "#f222ff",
  violet: "#8c1eff"
};

const city = async () => {
  const { xMin, xMax, yMax } = canvas.size;
  const numBuildings = 50;
  const averageHeight = 20;
  const heightDeviation = 10;
  const averageWidth = 5;
  const widthDeviation = 5;
  const heights = await tf
    .randomNormal([numBuildings, 1], averageHeight, heightDeviation)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const widths = await tf
    .randomNormal([numBuildings, 1], averageWidth, widthDeviation)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const yPos = heights.map((height) => yMax - height / 2);
  const xPos = await tf
    .randomUniform([numBuildings, 1], xMin, xMax)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const zipped: [height: number, width:  number, x: number, y: number][] = zip(
    heights,
    widths,
    xPos,
    yPos
  );
  return zipped.map(([height, width, x, y]) => {
    return new Rectangle({ x, y }, width, height, violet);
  });
};

export default async () => {
  const c = await city();
  return createScene(
    [...c, new Circle({ x: 80, y: 20 }, 10, red)],
    canvas,
    yellow,
    orange
  );
};

import { createScene, Shape } from "./baseGeometry";
import { canvas, Rectangle, Circle } from "./objects";
import * as tf from "@tensorflow/tfjs";
import { zip } from "lodash";

const { yellow, orange, red, darkpink, violet } = {
  yellow: "#ffd319",
  orange: "#ff901f",
  red: "#ff2975",
  darkpink: "#f222ff",
  violet: "#8c1eff"
};

const city = async () => {
  const { xMin, xMax, yMax, yMin } = canvas.size;
  const numBuildings = 50;
  const totalWidth = xMax - xMin
  const totalHeight = yMax - yMin
  const sunHeight = 50;
  const sunRadius = .8 * (totalWidth / 2)
  const averageHeight = 20;
  const heightDeviation = 10;
  const averageWidth = sunRadius / 6;
  const widthDeviation = averageWidth / 3;

  const buildingColors = [
    violet
  ];
  const heights = await tf
    .randomNormal([numBuildings, 1], sunHeight, sunRadius / 4)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const widths = await tf
    .randomNormal([numBuildings, 1], averageWidth, widthDeviation)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const yPos = heights.map((height) => yMax - height / 2);
  const xPos = await tf
    .randomUniform([numBuildings, 1], totalWidth / 2 - sunRadius * .75, totalWidth / 2 + sunRadius  * .75)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const colors = Array(numBuildings)
    .fill(0)
    .map(() => buildingColors[Math.floor(Math.random() * buildingColors.length)])
  const zipped: [height: number, width:  number, x: number, y: number, color: string][] = zip(
    heights,
    widths,
    xPos,
    yPos,
    colors
  );
  console.log(sunRadius)
  return (zipped.map(([height, width, x, y, color]) => {
    return new Rectangle({ x, y }, width, height, color);
  }) as Shape[]).concat(
    new Circle({ x: 50, y: totalHeight - sunHeight }, sunRadius, orange),
  );
};

export default async () => {
  const c = await city();
  return createScene(
    c,
    canvas,
    violet,
    'black'
  );
};

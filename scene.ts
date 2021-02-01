import { createScene } from "./baseGeometry";
import { canvas, Rectangle, Circle } from "./objects";
import * as tf from "@tensorflow/tfjs";

tf.randomNormal([1, 10]).data().then(console.log);

const { yellow, orange, red, darkpink, violet } = {
  yellow: "#ffd319",
  orange: "#ff901f",
  red: "#ff2975",
  darkpink: "#f222ff",
  violet: "#8c1eff"
};

export default async () =>
  createScene(
    [
      new Rectangle({ x: 5, y: 5 }, 10, 10, violet),
      new Rectangle({ x: 20, y: 5 }, 10, 10, violet),
      new Rectangle({ x: 40, y: 40 }, 10, 10, violet),
      new Rectangle({ x: 30, y: 30 }, 10, 10, violet),
      new Circle({ x: 30, y: 70 }, 20, red)
    ],
    canvas,
    yellow
  );

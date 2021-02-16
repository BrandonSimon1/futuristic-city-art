import { createScene, PointColor, Shape } from "./baseGeometry";
import { canvas, Rectangle, Circle } from "./objects";
import * as tf from "@tensorflow/tfjs";
import { zip } from "lodash";
import React, { useState, useEffect } from 'react'

const yellow = "#ffd319"
const orange = "#ff901f"
const red = "#ff2975"
const darkpink = "#f222ff"
const violet = "#8c1eff"

const city = async () => {
  const { xMin, xMax, yMax, yMin } = canvas.size;
  const numBuildings = 150;
  const totalWidth = xMax - xMin
  const totalHeight = yMax - yMin
  const sunHeight = totalHeight / 2;
  const sunX = Math.ceil(totalWidth / 2)
  const sunRadius = totalHeight / 2 * .9
  const averageWidth = totalHeight / 15;
  const widthDeviation = averageWidth / 2;

  const widths = await tf
    .randomNormal([numBuildings, 1], averageWidth, widthDeviation)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const xPos = await tf
    .randomUniform([numBuildings, 1], xMin, xMax)
    .array()
    .then((p: number[]) => (p instanceof Array ? p.flat() : []));
  const heights = xPos.map(x => (sunHeight + sunRadius * .5 - Math.abs(((xMax - xMin) / 2) - x)) * Math.random())
  const yPos = heights.map((height) => yMax - height / 2);
  const zipped: [height: number, width:  number, x: number, y: number][] = zip(
    heights,
    widths,
    xPos,
    yPos
  );
  return (zipped.map(([height, width, x, y]) => {
    return new Rectangle({ x, y }, width, height, violet);
  }) as Shape[]).concat(
    new Circle({ x: sunX, y: totalHeight - sunHeight }, sunRadius * .9, yellow),
    new Circle({ x: sunX, y: totalHeight - sunHeight }, sunRadius, orange),
  );
};

const Scene = ({svgRef}: {svgRef: React.Ref<SVGSVGElement>}) => {
  const [c,setShapes] = useState<Shape[]>([])
  useEffect(() => {
    city().then(setShapes)
  }, [])
  if (!c.length) return null
  const Scene = createScene(
    c,
    canvas,
    darkpink,
    red
  );
  return <Scene svgRef={svgRef}/>
};

export default Scene

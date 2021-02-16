import React from "react";

export interface Point {
  x: number;
  y: number;
}

export interface SpaceSize {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface PointColor {
  point: Point;
  color: string;
  strokeColor: string;
}

export interface Space {
  distance: (p1: Point, p2: Point) => number;
  getPoints: () => Point[];
  size: SpaceSize;
}

export interface Shape {
  color: string;
  pointInShape: (p: Point, s: Space) => boolean;
}

export const createScene = (
  shapes: Shape[],
  space: Space,
  backgroundColor: string,
  strokeColor: string
): PointColor[] =>
  space.getPoints().map((p: Point) => ({
    color:
      shapes.find((shape) => shape.pointInShape(p, space))?.color ??
      backgroundColor,
    point: p,
    strokeColor
  }));

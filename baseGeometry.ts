export interface Point {
  x: number;
  y: number;
}

export interface PointColor {
  point: Point;
  color: string;
}

export interface Space {
  distance: (p1: Point, p2: Point) => number;
  getPoints: () => Point[];
}

export interface Shape {
  color: string;
  pointInShape: (p: Point, s: Space) => boolean;
}

export const createScene = (
  shapes: Shape[],
  space: Space,
  backgroundColor: string
): PointColor[] =>
  space.getPoints().map((p: Point) => ({
    color:
      shapes.find((shape) => shape.pointInShape(p, space))?.color ??
      backgroundColor,
    point: p
  }));

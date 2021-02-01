import { Space, Shape, Point } from "./baseGeometry";

export const canvas: Space = {
  distance: (p1, p2) =>
    Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2)),
  getPoints: () =>
    Array.from(new Array(100), (_, i) => i).flatMap((i) =>
      Array.from(new Array(100), (_, k) => k).map((k) => ({ x: i, y: k }))
    ),
  size: {
    xMin: 0,
    xMax: 100,
    yMin: 0,
    yMax: 100
  }
};

export class Rectangle implements Shape {
  constructor(
    public center: Point,
    public width: number,
    public height: number,
    public color: string
  ) {}
  pointInShape(p: Point, s: Space) {
    return (
      s.distance({ x: p.x, y: this.center.y }, this.center) <= this.width / 2 &&
      s.distance({ x: this.center.x, y: p.y }, this.center) <= this.height / 2
    );
  }
}

export class Circle implements Shape {
  constructor(
    public center: Point,
    public radius: number,
    public color: string
  ) {}
  pointInShape(p: Point, s: Space) {
    return s.distance(this.center, p) <= this.radius;
  }
}

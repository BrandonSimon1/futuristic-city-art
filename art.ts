interface Point {
  x: number;
  y: number;
}

interface PointColor {
  point: Point;
  color: string;
}

interface Space {
  distance: (p1: Point, p2: Point) => number;
  getPoints: () => Point[];
}

interface Shape {
  color: string;
  pointInShape: (p: Point, s: Space) => boolean;
}

const canvas: Space = {
  distance: (p1, p2) => Math.sqrt((p2.y - p1.y) ^ (2 + (p2.x - p1.x)) ^ 2),
  getPoints: () =>
    Array.from(new Array(100), (_, i) => i).flatMap((i) =>
      Array.from(new Array(100), (_, k) => k).map((k) => ({ x: i, y: k }))
    )
};

class Rectangle implements Shape {
  constructor(
    public center: Point,
    public width: number,
    public height: number,
    public color: string
  ) {}
  pointInShape(p: Point, s: Space) {
    return (
      s.distance({ x: p.x, y: this.center.y }, this.center) <= this.width &&
      s.distance({ x: this.center.x, y: p.y }, this.center) <= this.height
    );
  }
}

class Circle implements Shape {
  constructor(
    public center: Point,
    public radius: number,
    public color: string
  ) {}
  pointInShape(p: Point, s: Space) {
    return s.distance(this.center, p) <= this.radius;
  }
}

// next time
const createScene = (shapes: Shape[], space: Space): PointColor[] =>
  space.getPoints().map((p: Point) => ({
    color: shapes.find((shape) => shape.pointInShape(p, space)).color,
    point: p
  }));

import { Space, Shape, Point, PointColor } from "./baseGeometry";
import React from "react";

export const canvas: Space = {
  distance: (p1, p2) =>
    Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2)),
  getPoints() {
    return new Array(this.size.xMax - this.size.xMin)
      .fill(null)
      .flatMap((_, x) =>
        new Array(this.size.yMax - this.size.yMin)
          .fill(null)
          .map((_, y) => ({ x, y }))
      );
  },
  size: {
    xMin: 0,
    xMax: (screen.width / screen.height) * 100,
    yMin: 0,
    yMax: 100
  },
  Canvas({
    points,
    svgRef
  }: {
    points: PointColor[];
    svgRef: React.Ref<SVGSVGElement>;
  }) {
    return (
      <svg
        width="100vw"
        height="100vh"
        viewBox={`${canvas.size.xMin} ${canvas.size.yMin} ${canvas.size.xMax} ${canvas.size.yMax}`}
        preserveAspectRatio="none"
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
      >
        {points.map(({ point: { x, y }, color, strokeColor }) => (
          <rect
            x={x}
            y={y}
            width="1"
            height="1"
            fill={color}
            stroke={strokeColor}
            strokeWidth=".08"
          />
        ))}
      </svg>
    );
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

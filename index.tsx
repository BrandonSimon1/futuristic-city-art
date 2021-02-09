import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import "./style.css";
import pointColors from "./scene";
import { PointColor } from "./baseGeometry";

const App = () => {
  const [s, set] = useState<PointColor[]>([]);
  useEffect(() => {
    pointColors().then(set);
  }, []);
  if (!s.length) return <div></div>;
  return (
    <svg
      width="100vw"
      height="100vh"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {s.map(({ point: { x, y }, color, strokeColor }) => (
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
};

render(<App />, document.getElementById("root"));

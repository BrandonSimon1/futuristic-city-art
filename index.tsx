import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import pointColors from "./scene";

const App = () => (
  <svg
    width="100vw"
    height="100vh"
    preserveAspectRatio="none"
    viewBox="0 0 100 100"
  >
    {pointColors.map(({ point: { x, y }, color }) => (
      <rect
        x={x}
        y={y}
        width="1"
        height="1"
        fill={color}
        stroke="white"
        stroke-width=".1"
      />
    ))}
  </svg>
);

render(<App />, document.getElementById("root"));

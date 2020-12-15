import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

interface AppProps {}
interface AppState {
  name: string;
}

const makePoints = (size: number) =>
  Array.from(new Array(size), (x, i) => i).flatMap(i =>
    Array.from(new Array(size), (x, k) => k).map(k => ({ x: i, y: k }))
  );

const colors = {
  sun: "#fd9e0b",
  background: "#db1dca",
  building: "#600b1c"
};

const createScene = (): any[] => {
  return;
};

const getColor = (() => {
  const scene = createScene();
  return ({ x: x0, y: y0 }: { x: number; y: number }): string => {
    return scene.find(({ x, y }) => x == x0 && y == y0).color;
  };
})();

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <svg
        width="100vw"
        height="100vh"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {makePoints(100)
          .map(({ x, y }) => ({ x, y, color: getColor({ x, y }) }))
          .map(({ x, y, color }) => (
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
  }
}

render(<App />, document.getElementById("root"));

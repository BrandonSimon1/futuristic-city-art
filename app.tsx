import React, { useEffect, useState, useRef, Fragment } from "react";
import "./style.css";
import pointColors from "./scene";
import { PointColor } from "./baseGeometry";

const App = () => {
  const [s, set] = useState<PointColor[]>([]);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [buttonTimer, setButtonTimer] = useState(0);
  useEffect(() => {
    pointColors().then(set);
  }, []);
  const svgRef = useRef<SVGSVGElement>(null);
  const exportSVG = () => {
    const blob = new Blob([svgRef.current?.innerHTML ?? ""], {
      type: "image/svg+xml"
    });
    const exportUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = exportUrl;
    a.download = "futuristic-city-art";
    a.click();
  };
  const onMouseMove = () => {
    if (buttonTimer) clearTimeout(buttonTimer);
    setButtonVisible(true);
    setButtonTimer(
      setTimeout(() => {
        setButtonVisible(false);
      }, 2000)
    );
  };
  if (!s.length) return <div></div>;
  return (
    <div onMouseMove={onMouseMove}>
      <svg
        width="100vw"
        height="100vh"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        ref={svgRef}
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
      <button
        style={{ display: buttonVisible ? "" : "none" }}
        onClick={exportSVG}
        className="exportButton"
      >
        Export
      </button>
    </div>
  );
};

export default App;

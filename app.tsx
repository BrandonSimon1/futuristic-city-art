import React, { useEffect, useState, useRef, Fragment } from "react";
import "./style.css";
import Scene from "./scene";

const App = () => {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [buttonTimer, setButtonTimer] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const exportSVG = () => {
    const blob = new Blob([svgRef.current?.outerHTML ?? ""], {
      type: "image/svg+xml"
    });
    const exportUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = exportUrl;
    a.download = "futuristic-city-art";
    a.click();
  };
  const onMouseMove = () => {
    setButtonVisible(true);
    if (buttonTimer) {
      window.clearTimeout(buttonTimer);
    }
    const timeout = window.setTimeout(() => {
      setButtonVisible(false);
    }, 50);
    setButtonTimer(timeout);
  };
  return (
    <div onMouseMove={onMouseMove}>
      <Scene svgRef={svgRef} />
      <button
        style={{ display: buttonVisible ? "" : "none" }}
        onClick={exportSVG}
        className="exportButton"
      >
        Export SVG
      </button>
    </div>
  );
};

export default App;

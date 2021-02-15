import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import App from "./app";

console.log(renderToStaticMarkup(<App />));

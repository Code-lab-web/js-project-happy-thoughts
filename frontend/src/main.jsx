import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../components/App.js";
import { App } from "../components/App.js";
import "../components/index.css";
import Form from "../components/form.jsx";
import Card from "../components/Card.tsx";
import "../components/Card.css";
import "../components/App.tsx";
import "../components/animation.js";
import "../components/animation.css";
import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

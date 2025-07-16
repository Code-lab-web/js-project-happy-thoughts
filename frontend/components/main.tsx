import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "../src/App.jsx";
import Card from "./Card.tsx";
import "./Card.css";
// Removed conflicting import of App
import { Form } from "./form.jsx";
import Main from "./main.tsx";
import indexData from "./index.json";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
export default App;

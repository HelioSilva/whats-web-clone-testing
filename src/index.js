import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextApp } from "./context/application";

ReactDOM.render(
  <React.StrictMode>
    <ContextApp>
      <App />
    </ContextApp>
  </React.StrictMode>,
  document.getElementById("root")
);

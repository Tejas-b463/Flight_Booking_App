import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const Main = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<Main />);

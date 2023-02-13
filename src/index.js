import "./index.scss";
import App from "./App/App";
import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
const Root = ReactDOM.createRoot(document.getElementById("root"));

Root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

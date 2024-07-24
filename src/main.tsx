import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebSocketProvider from "./helpers/websocker.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </React.StrictMode>
);

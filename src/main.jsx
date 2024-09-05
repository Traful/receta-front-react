import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DataContext from "./store/DataContext.jsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContext>
      <App />
      <Toaster richColors />
    </DataContext>
  </React.StrictMode>,
)
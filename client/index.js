// Imports
import React from "react";
import { createRoot } from "react-dom/client";

// Components
import App from "./components/App";

// Inject into page
const root = createRoot(document.getElementById("app"));
root.render(<App />);

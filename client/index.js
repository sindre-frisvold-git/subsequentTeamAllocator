import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// import store from './store.js'
import App from "./components/App";

// Inject into page
const root = createRoot(document.getElementById("app"));
root.render(
  // {/* <Provider store={store}> */}
  <Router>
    <App />
  </Router>
  // </Provider>
);

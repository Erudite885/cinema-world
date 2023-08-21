import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./app/store";
import ToggleColorModeProvider from "./utils/ToggleColorMode";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <App />
    </ToggleColorModeProvider>
  </Provider>
);

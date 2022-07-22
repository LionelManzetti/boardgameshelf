import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ExportContextUser from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <ExportContextUser.UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExportContextUser.UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

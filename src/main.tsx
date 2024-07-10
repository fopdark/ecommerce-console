import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.css";
import "./css/satoshi.css";
import "./css/customs-antd.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import axios from "axios";
import { setupInterceptorsTo } from "./service/Interceptors";
import CommonProvider from "./context/CommonContext";

setupInterceptorsTo(axios);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <CommonProvider>
        <Router>
          <App />
        </Router>
      </CommonProvider>
    </I18nextProvider>
  // </React.StrictMode>
);

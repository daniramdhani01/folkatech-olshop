import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthInit, AuthProvider, } from "./moduls/Auth";
import reportWebVitals from "./reportWebVitals";
import AppRoutes from "./routing/AppRoutes";
import "./custom.scss";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <AuthInit> */}
        <AppRoutes />
      {/* </AuthInit> */}
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

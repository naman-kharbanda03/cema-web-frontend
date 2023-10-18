import React from "react";
import ReactDOM from "react-dom/client";

import "./asset/css/bootstrap.min.css";
import "./asset/css/bootstrap5.min.css";
import "./asset/css/animate.min.css";
import "./asset/css/iconfont.css";
import "./asset/css/themify-icons.css";
import "./asset/css/all.min.css";
import "./asset/css/font-awesome.css";
import "./asset/css/elegant.css";
import "./asset/css/slick.css";
import "./asset/css/slick-theme.css";
import "./asset/css/mmenu.min.css";

import Popper from "popper.js";
import "./index.css";

import "./asset/css/app.css";
import "./asset/css/responsive.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

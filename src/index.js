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
import "./asset/css/icomoon.css";
import "./asset/css/iconfont.css";
import "./asset/css/jslider.css";
import "./asset/css/select2.min.css";

import Popper from "popper.js";
import "./index.css";
import "./asset/css/app.css";
import "./asset/css/responsive.css";
import "./asset/fonts/icomoon.ttf";

// import "./asset/js/jquery.min.js";
// import "./asset/js/tmpl";
// import "./asset/js/slick.min.js";
// import "./asset/js/select2.min.js";
// import "./asset/js/popper.min.js";
// import "./asset/js/jquery.slider.js";
// import "./asset/js/jquery.mmenu.all.min.js";
// import "./asset/js/jquery.dependClass-0.1";
// import "./asset/js/jquery.countdown.min.js";
// import "./asset/js/draggable-0.1";
// import "./asset/js/jquery.min.js";

// import "./asset/js/app";
// import "./asset/js/app";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);
reportWebVitals();

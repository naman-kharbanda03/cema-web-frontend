import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ current }) => {
  return (
    <div id="title" className="page-title">
      <div className="section-container">
        <div className="content-title-heading">
          <h1 className="text-title-heading">{current}</h1>
        </div>
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span className="delimiter" />
          {current}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PageTitle = ({ current }) => {
  const { t } = useTranslation();
  return (
    <div id="title" className="page-title">
      <div className="section-container">
        <div className="content-title-heading">
          <h1 className="text-title-heading">{current}</h1>
        </div>
        <div className="breadcrumbs">
          <a href="/">{t("Home.Home")}</a>
          <span className="delimiter" />
          {current}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;

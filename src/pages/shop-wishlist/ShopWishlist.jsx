import React from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import WishListTable from "../../components/wishlist/WishListTable";
import { useTranslation } from "react-i18next";

const ShopWishlist = () => {
  const { t } = useTranslation();
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <PageTitle current={t("Wishlist.Wishlist")} />

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <WishListTable />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWishlist;

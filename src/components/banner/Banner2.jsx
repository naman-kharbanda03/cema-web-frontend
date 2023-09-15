import React from "react";
import banner_23 from "../../asset/images/banner/banner-23.jpg";
import banner_24 from "../../asset/images/banner/banner-24.jpg";

const Banner2 = () => {
  return (
    <div className="block-widget-wrap">
      <div className="row">
        <div className="col-md-6">
          <div className="block-widget-banner layout-13 m-b-0">
            <div className="bg-banner">
              <div className="banner-wrapper banners">
                <div className="banner-image">
                  <a href="#">
                    <img
                      className="demo-img img-fluid"
                      src={banner_23}
                      alt="Banner Image"
                    />
                  </a>
                </div>
                <div className="banner-wrapper-infor">
                  <div className="info">
                    <div className="content">
                      <a className="link-title" href="#">
                        <h3 className="title-banner">
                          20 - 60% <br /> Demo Product
                        </h3>
                      </a>
                      <div className="banner-image-description">
                        This is latest high selling decar
                      </div>
                      <a className="button button-outline white" href="#">
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="block-widget-banner layout-13">
            <div className="bg-banner">
              <div className="banner-wrapper banners">
                <div className="banner-image">
                  <a href="#">
                    <img
                      className="demo-img img-fluid"
                      src={banner_24}
                      alt="Banner Image"
                    />
                  </a>
                </div>
                <div className="banner-wrapper-infor">
                  <div className="info">
                    <div className="content">
                      <a className="link-title" href="#">
                        <h3 className="title-banner">
                          30 - 50%
                          <br /> Demo Product
                        </h3>
                      </a>
                      <div className="banner-image-description">
                        Your Wall get fresh with this
                      </div>
                      <a className="button button-outline white" href="#">
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;

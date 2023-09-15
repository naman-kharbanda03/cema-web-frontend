import React from "react";
import banner_11 from "../../asset/images/banner/banner-11.jpg";
import banner_12 from "../../asset/images/banner/banner-12.jpg";
import banner_13 from "../../asset/images/banner/banner-13.jpg";
import banner_14 from "../../asset/images/banner/banner-14.jpg";

const Banner = () => {
  return (
    <div className="block block-banners layout-6 banners-effect no-space">
      <div className="row">
        <div className="col-md-6 left">
          <div className="block-widget-banner layout-8">
            <div className="bg-banner">
              <div className="banner-wrapper banners">
                <div className="banner-image">
                  <a href="#">
                    <img
                      width={959}
                      height={837}
                      src={banner_11}
                      alt="Banner Image"
                    />
                  </a>
                </div>
                <div className="banner-wrapper-infor">
                  <div className="info">
                    <div className="content">
                      <div className="banner-image-subtitle">
                        NEW COLLECTION
                      </div>
                      <a className="link-title" href="#">
                        <h3 className="title-banner">Decor accessories</h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 right">
          <div className="row">
            <div className="col-md-12">
              <div className="block-widget-banner layout-8">
                <div className="bg-banner">
                  <div className="banner-wrapper banners">
                    <div className="banner-image">
                      <a href="#">
                        <img
                          width={961}
                          height={419}
                          src={banner_12}
                          alt="Banner Image"
                        />
                      </a>
                    </div>
                    <div className="banner-wrapper-infor">
                      <div className="info">
                        <div className="content">
                          <div className="banner-image-subtitle">FAVOURITE</div>
                          <a className="link-title" href="#">
                            <h3 className="title-banner">
                              Dining &amp; Kitchen
                            </h3>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="block-widget-banner layout-8">
                <div className="bg-banner">
                  <div className="banner-wrapper banners">
                    <div className="banner-image">
                      <a href="#">
                        <img
                          width={481}
                          height={419}
                          src={banner_13}
                          alt="Banner Image"
                        />
                      </a>
                    </div>
                    <div className="banner-wrapper-infor">
                      <div className="info">
                        <div className="content">
                          <div className="banner-image-subtitle">
                            FREE SHIPPING
                          </div>
                          <a className="link-title" href="#">
                            <h3 className="title-banner">Home Decor</h3>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="block-widget-banner layout-8">
                <div className="bg-banner">
                  <div className="banner-wrapper banners">
                    <div className="banner-image">
                      <a href="#">
                        <img
                          width={481}
                          height={419}
                          src={banner_14}
                          alt="Banner Image"
                        />
                      </a>
                    </div>
                    <div className="banner-wrapper-infor">
                      <div className="info">
                        <div className="content">
                          <div className="banner-image-subtitle">30% OFF</div>
                          <a className="link-title" href="#">
                            <h3 className="title-banner">Interior lighting</h3>
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
      </div>
    </div>
  );
};

export default Banner;

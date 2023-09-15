import React from "react";
import banner_28 from "../../asset/images/banner/28.jpg";
import banner_29 from "../../asset/images/banner/29r.jpg";
import banner_30 from "../../asset/images/banner/30.jpg";
import Slider from "react-slick";
import $ from "jquery";

const Sliders = () => {
  const settings = {
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    dots: true,
    arrows: false,
    cssEase: "linear",
    autoplaySpeed: 5000,
  };

  return (
    <div className="block block-sliders layout-9 diff-col nav-left auto-height m-b-0">
      <Slider {...settings}>
        <div className="item slick-slide">
          <div className="item-content">
            <div className="item-info">
              <div className="content background-1">
                <div className="content-wrap">
                  <h2 className="title-slider">
                    Easy <br />
                    Living
                  </h2>
                  <div className="description-slider">
                    Best collections for your home
                  </div>
                  <a className="button-slider button-black" href="#">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="content-image">
              <img
                width={959}
                height={963}
                src={banner_28}
                alt="Image Slider"
              />
            </div>
          </div>
        </div>
        <div className="item slick-slide">
          <div className="item-content">
            <div className="item-info">
              <div className="content background-2">
                <div className="content-wrap">
                  <h2 className="title-slider">
                    Home
                    <br />
                    Best decor
                  </h2>
                  <div className="description-slider">
                    Make your home bright
                  </div>
                  <a className="button-slider button-black" href="#">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="content-image">
              <img
                className="demo-img-1 img-fluid"
                src={banner_29}
                alt="Image Slider"
              />
            </div>
          </div>
        </div>
        <div className="item slick-slide">
          <div className="item-content">
            <div className="item-info">
              <div className="content background-3">
                <div className="content-wrap">
                  <h2 className="title-slider">
                    Best <br />
                    Collection
                  </h2>
                  <div className="description-slider">
                    World wide best collections
                  </div>
                  <a className="button-slider button-black" href="#">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="content-image">
              <img
                width={959}
                height={963}
                src={banner_30}
                alt="Image Slider"
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Sliders;

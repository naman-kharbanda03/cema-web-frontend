import React from "react";
import product_h3 from "../../asset/images/product/h3.jpg";
import product_d5 from "../../asset/images/product/d5.jpg";
import product_be2 from "../../asset/images/product/be2.jpg";
import product_l3 from "../../asset/images/product/l3.jpg";
import product_of3 from "../../asset/images/product/of3.jpg";
import Slider from "react-slick";
const ProductSlider = () => {
  const settings = {
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    focusOnSelect: true,
    dots: false,
    arrows: true,
    cssEase: "linear",
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slick-sliders content-category">
      <Slider {...settings}>
        <div className="item item-product-cat slick-slide">
          <div className="item-product-cat-content">
            <a href="#" tabIndex={-1}>
              <div className="item-image">
                <img
                  width={258}
                  height={258}
                  src={product_h3}
                  alt="home-decor"
                />
              </div>
            </a>
            <div className="product-cat-content-info">
              <h2 className="item-title">
                <a href="#" tabIndex={-1}>
                  Home Decoration
                </a>
              </h2>
            </div>
          </div>
        </div>
        <div className="item item-product-cat slick-slide">
          <div className="item-product-cat-content">
            <a href="#" tabIndex={-1}>
              <div className="item-image">
                <img width={258} height={258} src={product_d5} alt="lighting" />
              </div>
            </a>
            <div className="product-cat-content-info">
              <h2 className="item-title">
                <a href="#" tabIndex={-1}>
                  Dining Room
                </a>
              </h2>
            </div>
          </div>
        </div>
        <div className="item item-product-cat slick-slide">
          <div className="item-product-cat-content">
            <a href="#" tabIndex={-1}>
              <div className="item-image">
                <img
                  width={258}
                  height={258}
                  src={product_be2}
                  alt="bed-bath"
                />
              </div>
            </a>
            <div className="product-cat-content-info">
              <h2 className="item-title">
                <a href="#" tabIndex={-1}>
                  Bedroom
                </a>
              </h2>
            </div>
          </div>
        </div>
        <div className="item item-product-cat slick-slide">
          <div className="item-product-cat-content">
            <a href="#" tabIndex={-1}>
              <div className="item-image">
                <img width={258} height={258} src={product_l3} alt="office" />
              </div>
            </a>
            <div className="product-cat-content-info">
              <h2 className="item-title">
                <a href="#" tabIndex={-1}>
                  Living Room
                </a>
              </h2>
            </div>
          </div>
        </div>
        <div className="item item-product-cat slick-slide">
          <div className="item-product-cat-content">
            <a href="#" tabIndex={-1}>
              <div className="item-image">
                <img width={258} height={258} src={product_of3} alt="outdoor" />
              </div>
            </a>
            <div className="product-cat-content-info">
              <h2 className="item-title">
                <a href="#" tabIndex={-1}>
                  {" "}
                  Office
                </a>
              </h2>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ProductSlider;

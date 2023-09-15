import React from "react";
import product_6_16 from "../../asset/images/product/6-16.png";
import product_6_17 from "../../asset/images/product/6-17.png";
import product_6_19 from "../../asset/images/product/6-19.png";
import product_6_5 from "../../asset/images/product/6-5.png";
import product_6_4 from "../../asset/images/product/6-4.png";

import Slider from "react-slick";
const BestSellerSlider = () => {
  const settings = {
    pauseOnHover: false,
    slidesToShow: 5,
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
    <div className="slick-sliders products-list sestsellers grid">
      <Slider {...settings}>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_16}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_17}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-lable">
                <div className="onsale">-33%</div>
              </div>
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_19}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_5}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-lable">
                <div className="onsale">-33%</div>
              </div>
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_4}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-lable">
                <div className="onsale">-33%</div>
              </div>
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_4}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item item-product slick-slide">
          <div className="products-entry clearfix product-wapper">
            <div className="products-thumb">
              <div className="product-lable">
                <div className="onsale">-33%</div>
              </div>
              <div className="product-thumb-hover">
                <a href="#">
                  <img
                    width={600}
                    height={600}
                    src={product_6_4}
                    className="hover-image back"
                    alt
                  />
                </a>
              </div>
              <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                  <a rel="nofollow" href="#" className="product-btn button">
                    Add to cart
                  </a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                  <button className="product-btn">Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="products-content">
              <div className="contents text-center">
                <h3 className="product-title">
                  <a href="#">Demo Product</a>
                </h3>
                <span className="price">KD150.00</span>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default BestSellerSlider;

import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
const BestSellerSlider = () => {
  const { handleAddRemoveWishlist, AddToCart } = useShoppingCart();
  const settings = {
    pauseOnHover: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    dots: false,
    arrows: false,
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
  const [data, setData] = useState([]);

  const fetchDetails = () => {
    const apiUrl = apiConfig.listingAPI;
    fetch(`${apiUrl}?best_seller=1`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log("test", data.data.data);
        setData(data.data.data);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="slick-sliders products-list sestsellers grid">
      <Slider {...settings}>
        {data.map((product) => (
          <div className="item item-product slick-slide">
            <div className="products-entry clearfix product-wapper">
              <div className="products-thumb">
                <div className="product-thumb-hover">
                  {console.log("test product", product)}
                  <Link
                    to={`/product-details?product_id=${product?.product_gallery?.[0]?.product_id}`}
                  >
                    <img
                      width={600}
                      height={600}
                      src={product.image_path?.replace(
                        "gallery",
                        `${product?.thumbnail}`
                      )}
                      style={{ height: "328px", objectFit: "contain" }}
                      className="post-image"
                      alt
                    />
                    <img
                      width={600}
                      height={600}
                      style={{ height: "328px", objectFit: "contain" }}
                      src={product.image_path?.replace(
                        "gallery",
                        `${product?.hover_thumbnail}`
                      )}
                      className="hover-image back"
                      alt
                    />
                  </Link>
                </div>
                <div className="product-button">
                  <div className="btn-add-to-cart" data-title="Add to cart">
                    <a
                      rel="nofollow"
                      href="#"
                      className="product-btn button"
                      onClick={() => {
                        const prod = {
                          id: product.id,
                          product_name: { en: product.product_name?.en },
                          image_path: product?.images_path,
                          product_image: [`${product.product_image[0]}`],
                          stock: product.stock,
                        };
                        AddToCart(prod, 1);
                      }}
                    >
                      Add to cart
                    </a>
                  </div>
                  <div className="btn-wishlist" data-title="Wishlist">
                    <button
                      className="product-btn"
                      onClick={(e) => {
                        const prod = {
                          id: product.id,
                          product_name: { en: product.product_name?.en },
                          image_path: product.images_path,
                          product_image: [`${product.product_image[0]}`],
                          stock: product.stock,
                        };
                        handleAddRemoveWishlist(e, prod);
                      }}
                    >
                      Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div className="products-content">
                <div className="contents text-center">
                  <h3 className="product-title">
                    <a href="#">{product?.product_name?.en}</a>
                  </h3>
                  <span className="price">KD {product?.price} </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellerSlider;

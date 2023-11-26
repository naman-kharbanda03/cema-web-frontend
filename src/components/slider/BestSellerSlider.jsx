import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import './BestSellerSlider.css';
import ProductGrid from "../product-list/product-grid/ProductGrid";
const BestSellerSlider = () => {
  const { handleAddRemoveWishlist, AddToCart, wishListItems } = useShoppingCart();
  const [w, setW] = useState();
  const settings = {
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
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
        // const products = data.data.data.filter(pro=>{

        // })
        const products = data.data.data.map(product => {
          if (product?.type === 'simple_product') {
            const thumbnail = product?.thumbnail_path + '/' + product?.thumbnail;
            const hover = product?.thumbnail_path + '/' + product?.hover_thumbnail;
            const isInWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => item.product_id === product?.id) === -1
                ? 0
                : 1;
            return {
              // ...product,
              id: product?.id,
              variant_id: null,
              image_path: product?.image_path,
              product_image: product?.product_image?.[0],
              name: product?.product_name.en,
              price: product?.price,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product.id}`,
              stock: product?.stock,
              maxOrderLimit: product?.min_order_qty,
              type: 'simple_product',
              inWishlist: isInWishlist
            }
          }

          else if (product?.subvariants) {
            const thumbnail = product?.image_path + '/' + product?.subvariants?.[0].variantimages.main_image;
            const hover = product?.image_path + '/' + product?.subvariants?.[0].variantimages.image1;
            const stock = product?.subvariants[0]?.stock;
            const InWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => (item.product_id === product?.id && item.type === 'variant')) === -1
                ? 0
                : 1;
            return {
              // ...product,
              id: product?.id,
              variant_id: product?.subvariants[0]?.id,
              image_path: product?.image_path,
              product_image: product?.subvariants[0]?.variantimages.main_image,
              name: product?.name.en,
              price: product?.subvariants[0]?.price,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product.id}&variant_id=${product?.subvariants?.[0].id}`,
              stock: stock,
              maxOrderLimit: product?.subvariants[0]?.min_order_qty,
              type: 'variant',
              inWishlist: InWishlist,
            }
          }

        });
        const productsNotOutOfStock = products.filter(pro => pro.stock > 0);
        console.log(productsNotOutOfStock);
        setData(productsNotOutOfStock);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <div className="slick-sliders products-list bestsellers grid">
        <Slider {...settings}>
          {
            data.slice(0, 4).map((product) => {

              return (
                // <ProductGrid current={product} />
                <div className="item item-product slick-slide">
                  <div className="products-entry clearfix product-wapper">
                    <div className="products-thumb">
                      <div className="product-thumb-hover">
                        <a
                          href={product?.address}
                        >
                          <img
                            width={600}
                            height={600}
                            src={product?.image[0]}
                            style={{ width: '300px', height: '328px', objectFit: 'contain' }}
                            className="post-image"
                            alt
                          />
                          <img
                            width={600}
                            height={600}
                            style={{ width: '300px', height: '328px', objectFit: 'contain' }}
                            src={product?.image[1]}
                            className="hover-image back"
                            alt
                          />
                        </a>
                      </div>
                      <div className="product-button">
                        <div className="btn-add-to-cart" data-title="Add to cart">
                          <button
                            rel="nofollow"
                            href="#"
                            className="product-btn button"
                            onClick={() => {
                              const prod = {
                                id: product.id,
                                variant_id: product?.variant_id,
                                product_name: { en: product?.name },
                                image_path: product?.image_path,
                                product_image: [`${product.product_image}`],
                                stock: product.stock,
                                max_order_limit: product?.maxOrderLimit,
                                type: product?.type,
                                price: product?.price
                              };
                              AddToCart(prod, 1);
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                        <div className="btn-wishlist" data-title="Wishlist">
                          <button
                            className={product.inWishlist ? `product-btn-active` : `product-btn`}
                            onClick={(e) => {
                              // setData(prev => {

                              // })
                              // toggle();
                              product.inWishlist = product.inWishlist === 0 ? 1 : 0;
                              const prod = {
                                id: product.id,
                                variant_id: product?.variant_id,
                                product_name: { en: product?.name },
                                image_path: product.image_path,
                                product_image: [`${product.product_image}`],
                                stock: product.stock,
                                max_order_limit: product?.maxOrderLimit,
                                type: product?.type,
                                price: product?.price
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
                          <a href={product?.address}>{product?.name}</a>
                        </h3>
                        <span className="price">KD {product?.price} </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Slider>
      </div>
    </>

  );
};

export default BestSellerSlider;

import React, { useEffect, useState } from "react";
import product_6_13 from "../../asset/images/product/6-13.png";
import product_6_11 from "../../asset/images/product/6-11.png";
import product_6_10 from "../../asset/images/product/6-10.png";
import product_6_9 from "../../asset/images/product/6-9.png";
import product_6_8 from "../../asset/images/product/6-8.png";
import product_6_7 from "../../asset/images/product/6-7.png";
import product_6_6 from "../../asset/images/product/6-6.png";
import product_6_4 from "../../asset/images/product/6-4.png";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export function AddToCart(product) {
  const formData = {
    quantity: 1,
    product_id: product?.id,
    type: product?.type,
    price: product?.actual_selling_price,
    offerprice: product?.actual_offer_price,
  };

  const bearerToken = localStorage.getItem("accessToken");
  console.log("bearerToken", bearerToken);

  fetch("https://cema-backend.plasium.com/api/addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const NewArrival = () => {
  const [data, setData] = useState([{}]);
  const token = localStorage.getItem("accessToken");
  const { handleAddRemoveWishlist } = useShoppingCart();



  const fetchDetails = () => {
    fetch(
      "https://cema-backend.plasium.com/api/products?per_page=10&page=1&new_arrival=1",
      {
        method: "GET",
      }
    )
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
    <div className="products-list grid">
      <div className="row">
        {data.map((product) => (
          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6" key={product.id}>
            <div className="items">
              <div className="products-entry clearfix product-wapper">
                <div className="products-thumb">
                  <div className="product-lable">
                    <div className="onsale">-23%</div>
                    {/*/to ask what to show */}
                    <div className="hot">Hottest</div>
                  </div>
                  <div className="product-thumb-hover">
                    <Link to={`/product-details?product_id=${product.id}`}>
                      <img
                        width={600}
                        height={600}
                        src={`${product.image_path}/${product.product_image?.[0]}`}
                        className="hover-image back"
                        alt="image not available"
                      />
                    </Link>
                  </div>
                  <div className="product-button">
                    <div className="btn-add-to-cart" data-title="Add to cart">
                      <a
                        rel="nofollow"
                        className="product-btn button"
                        onClick={() => AddToCart(product)}
                      >
                        Add to cart
                      </a>
                    </div>
                    <div className="btn-wishlist" data-title="Wishlist">
                      <button className="product-btn"
                        onClick={(e) => {
                          handleAddRemoveWishlist(e, product.id)
                        }}
                      >Add to wishlist</button>
                    </div>
                  </div>
                </div>
                <div className="products-content">
                  <div className="contents text-center">
                    <h3 className="product-title">
                      <a href="#">{product?.product_name?.en}</a>
                    </h3>
                    <span className="price">
                      KD {product.actual_selling_price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ProductGrid from "../product-list/product-grid/ProductGrid";


const NewArrival = ({ section }) => {
  const [data, setData] = useState([{}]);
  const token = localStorage.getItem("accessToken");
  const { AddToCart, handleAddRemoveWishlist, wishListItems } = useShoppingCart();



  const fetchDetails = () => {
    fetch(
      `${apiConfig.listingAPI}?per_page=12&page=1&${section}=1`,
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
        const products = data.data.data.map(product => {
          if (product?.type === 'simple_product') {
            const thumbnail = product?.thumbnail_path + '/' + product?.thumbnail;
            const hover = product?.thumbnail_path + '/' + product?.hover_thumbnail;
            const stock = product?.stock;
            const isInWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => item.product_id === product?.id) === -1
                ? 0
                : 1;
            return {
              // ...product,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product.id}`,
              stock: stock,
              InWishlist: isInWishlist,

              //Later properties
              id: product.id,
              variant_id: null,
              product_name: { en: product?.product_name?.en },
              image_path: product?.thumbnail_path,
              product_image: [
                `${product.thumbnail}`,
              ],
              stock: product?.stock,
              max_order_limit: product?.max_order_qty,
              price: product?.price,
              type: "simple_product",
              link: `/product-details?product_id=${product.id}`,
              hot_product: product.hot_product,
              reviews: product?.reviews,
              product_rating: product?.product_rating
            }
          }

          else if (product?.subvariants) {
            const thumbnail = product?.image_path + '/' + product?.subvariants?.[0].variantimages.main_image;
            const hover = product?.image_path + '/' + product?.subvariants?.[0].variantimages.image1;
            const stock = product?.subvariants[0]?.stock;
            const isInWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => (item.product_id === product?.id && item.type === 'variant')) === -1
                ? 0
                : 1;
            return {
              // ...product,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product?.id}&variant_id=${product?.subvariants?.[0].id}`,
              stock: stock,
              InWishlist: isInWishlist,

              id: product.id,
              variant_id: product.subvariants?.[0]?.id,
              product_name: { en: product?.product_name?.en },
              image_path: product?.image_path,
              product_image: [
                `${product.subvariants?.[0]?.variantimages?.image1}`,
              ],
              stock: product?.subvariants?.[0]?.stock,
              max_order_limit: product?.subvariants?.[0]?.max_order_qty,
              price: product?.subvariants?.[0]?.price,
              type: "variant",
              link: `/product-details?product_id=${product.id}&variant_id=${product.subvariants?.[0]?.id}`,
              hot_product: product.hot_product,
              reviews: product?.reviews,
              product_rating: product?.product_rating
            }
          }

        });
        const productsNotOutOfStock = products.filter(pro => pro.stock > 0);
        setData(productsNotOutOfStock);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="products-list grid">
      <div className="row">
        {data.slice(0, 4).map((product) => (
          <ProductGrid current={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;

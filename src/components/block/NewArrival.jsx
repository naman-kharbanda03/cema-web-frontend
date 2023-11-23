import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ProductGrid from "../product-list/product-grid/ProductGrid";

// export function AddToCart(product) {
//   const formData = {
//     quantity: 1,
//     product_id: product?.id,
//     type: product?.type,
//     price: product?.actual_selling_price,
//     offerprice: product?.actual_offer_price,
//   };

//   const bearerToken = localStorage.getItem("accessToken");
//   console.log("bearerToken", bearerToken);


//   fetch("https://www.demo609.amrithaa.com/backend-cema/public/addToCart", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     body: JSON.stringify(formData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Response:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

const NewArrival = () => {
  const [data, setData] = useState([{}]);
  const token = localStorage.getItem("accessToken");
  const { AddToCart, handleAddRemoveWishlist, wishListItems } = useShoppingCart();



  const fetchDetails = () => {
    fetch(
      "https://www.demo609.amrithaa.com/backend-cema/public/api/products?per_page=12&page=1&new_arrival=1",
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
              ...product,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product.id}`,
              stock: stock,
              isInWishlist: isInWishlist
            }
          }

          else if (product?.subvariants) {
            const thumbnail = product?.image_path + '/' + product?.subvariants?.[0].variantimages.main_image;
            const hover = product?.image_path + '/' + product?.subvariants?.[0].variantimages.image1;
            const stock = product?.subvariants[0]?.stock;
            const isInWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => (item.product_id === product?.id && item.variant_id === product.subvariants[0].id)) === -1
                ? 0
                : 1;
            return {
              ...product,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product?.id}&variant_id=${product?.subvariants?.[0].id}`,
              stock: stock,
              isInWishlist: isInWishlist
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
          // <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6" key={product.id}>
          //   <div className="items">
          //     <div className="products-entry clearfix product-wapper">
          //       <div className="products-thumb">
          //         <div className="product-lable">
          //           <div className="onsale">-23%</div>
          //           {/*/to ask what to show */}
          //           <div className="hot">Hottest</div>
          //         </div>
          //         <div className="product-thumb-hover">
          //           <Link to={`/product-details?product_id=${product.id}`}>
          //             <img
          //               width={600}
          //               height={600}
          //               src={`${product.image_path}/${product.product_image?.[0]}`}
          //               className="hover-image back"
          //               alt="image not available"
          //             />
          //           </Link>
          //         </div>
          //         <div className="product-button">
          //           <div className="btn-add-to-cart" data-title="Add to cart">
          //             <a
          //               rel="nofollow"
          //               className="product-btn button"
          //               onClick={() => {
          //                 const prod = {
          //                   id: product.id,
          //                   price: product.actual_selling_price,
          //                   image_path: product.image_path,
          //                   product_image: [`${product.product_image[0]}`],
          //                   product_name: { en: product.product_name.en }
          //                 }
          //                 AddToCart(prod);
          //               }}
          //             >
          //               Add to cart
          //             </a>
          //           </div>
          //           <div className="btn-wishlist" data-title="Wishlist">
          //             <button className="product-btn"
          //               onClick={(e) => {
          //                 const prod = {
          //                   id: product.id,
          //                   price: product.actual_selling_price,
          //                   image_path: product.image_path,
          //                   product_image: [`${product.product_image[0]}`],
          //                   product_name: { en: product.product_name.en }
          //                 }
          //                 handleAddRemoveWishlist(e, prod)
          //               }}
          //             >Add to wishlist</button>
          //           </div>
          //         </div>
          //       </div>
          //       <div className="products-content">
          //         <div className="contents text-center">
          //           <h3 className="product-title">
          //             <Link to={`/product-details?product_id=${product.id}`}>{product?.product_name?.en}</Link>
          //           </h3>
          //           <span className="price">
          //             KD {product.actual_selling_price}
          //           </span>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <ProductGrid current={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;

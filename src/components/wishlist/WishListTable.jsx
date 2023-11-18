import { UNSAFE_warning } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";



const WishListTable = () => {
    const [data, setData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const { AddToCart, wishListToggle, handleAddRemoveWishlist } = useShoppingCart();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const apiUrl = apiConfig.wishListAPI;
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Add other headers as needed
                },
            }).then((response) => {
                if (!response.ok) throw new Error("Network Issue");
                return response.json();
            }).then((datar) => {
                if (datar.success) {
                    console.log(datar);
                    setData(datar.data);
                    setOrderData([]);
                    datar.data?.forEach(prod => {
                        if (prod.simple_product) {
                            let product = {
                                product_id: prod?.simple_pro_id,
                                type: 'simple_product',
                                image_path: prod.simple_product.image_path,
                                product_image: prod.simple_product.product_image[0],
                                product_name: { en: prod.simple_product.product_name.en },
                                stock: prod.simple_product.stock,
                                link: `/product-details?product_id=${prod?.simple_pro_id}`,
                                max_order_limit: prod.simple_product.max_order_qty,
                                price: prod.simple_product.offer_price
                            }
                            setOrderData(prev => ([...prev, product]));
                        } else {
                            let product = {
                                product_id: prod?.pro_id,
                                variant_id: prod.variant?.id,
                                type: 'variant',
                                image_path: prod.variant?.products.image_path,
                                product_image: prod.variant?.variantimages.image1,
                                product_name: { en: prod.variant?.products.name.en },
                                stock: prod.variant?.stock,
                                link: `/product-details?product_id=${prod?.pro_id}&variant_id=${prod.variant?.id}`,
                                max_order_limit: prod.variant.max_order_qty,
                                price: prod.variant.price,

                            }
                            setOrderData(prev => ([...prev, product]));
                        }
                    });
                    return datar;
                } else {
                    alert("Fetch error");
                }
            }).catch((error) => console.error("Problem with fetch", error));
        } else {
            const wishlistLocalOrder = JSON.parse(localStorage.getItem('wishlist'));
            setOrderData(wishlistLocalOrder?.Items);
        }
    }, [wishListToggle]);



    return (
        <>
            <div className="shop-wishlist">
                {orderData?.length > 0 ?
                    <table className="wishlist-items">
                        <tbody>
                            {orderData.map(order => (
                                <>
                                    <tr className="wishlist-item">
                                        <td className="wishlist-item-remove" onClick={(e) => {
                                            const prod = {
                                                id: order?.product_id,
                                                type: order?.type
                                            }
                                            handleAddRemoveWishlist(e, prod);
                                        }}>
                                            <span></span>
                                        </td>
                                        <td className="wishlist-item-image">
                                            <Link to={order.link}>
                                                <a href="shop-details.html">
                                                    <img
                                                        width="600"
                                                        height="600"
                                                        src={order?.image_path + '/' + order?.product_image}
                                                        alt=""
                                                    />
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="wishlist-item-info">
                                            <div className="wishlist-item-name">
                                                <Link to={order.link}>
                                                    <a href="shop-details.html">
                                                        {order?.product_name?.en}
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className="wishlist-item-price">
                                                {/* <span>{order.simple_product.price}</span> */}
                                            </div>
                                            <div className="wishlist-item-time">June 6, 2022</div>
                                        </td>
                                        <td className="wishlist-item-actions">
                                            <div className="wishlist-item-stock">{order?.stock > 0 ? "In Stock" : "Out of Stock"}</div>

                                            <div className="wishlist-item-add">
                                                <div
                                                    className="btn-add-to-cart"
                                                    data-title="Add to cart"
                                                >
                                                    {order?.stock > 0
                                                        ? <a
                                                            rel="nofollow"
                                                            href="#"
                                                            className="product-btn button"
                                                            onClick={() => {
                                                                const prod = {
                                                                    id: order?.product_id,
                                                                    price: order?.price,
                                                                    image_path: order?.image_path,
                                                                    product_image: [`${order?.product_image}`],
                                                                    product_name: { en: order?.product_name?.en },
                                                                    type: order?.type || "simple_product",
                                                                    stock: order?.stock,
                                                                    variant_id: order?.type !== 'simple_product' ? order?.variant_id : null,
                                                                    max_order_limit: order?.max_order_limit,
                                                                    link: order?.link,
                                                                }
                                                                console.log(prod);
                                                                AddToCart(prod, 1);
                                                            }}
                                                        >
                                                            Add to cart
                                                        </a>
                                                        : ''}
                                                    {" "}
                                                    &nbsp;&nbsp;
                                                    <a
                                                        rel="nofollow"
                                                        href="#"
                                                        className="product-btn button"
                                                        onClick={(e) => {
                                                            const prod = {
                                                                id: order?.product_id,
                                                                type: order?.type
                                                            }
                                                            handleAddRemoveWishlist(e, prod)
                                                        }}
                                                    >
                                                        Remove
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="shop-cart-empty">
                        <div className="notices-wrapper">
                            <p className="cart-empty">
                                Your Wishlist is currently empty.
                            </p>
                        </div>
                        <div className="return-to-shop">
                            <a className="button" href="/products" >
                                Return to shop
                            </a>
                        </div>
                    </div>}

            </div>
        </>
    )
}
export default WishListTable;

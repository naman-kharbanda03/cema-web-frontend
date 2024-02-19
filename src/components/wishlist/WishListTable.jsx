import { UNSAFE_warning } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useTranslation } from "react-i18next";



const WishListTable = () => {
    const [data, setData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const { AddToCart, wishListToggle, handleAddRemoveWishlist, showSuccessToastMessage } = useShoppingCart();
    const { t } = useTranslation();
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
                                product_id: prod?.variant.pro_id,
                                variant_id: prod.variant?.id,
                                type: 'variant',
                                image_path: prod.variant?.products.image_path,
                                product_image: prod.variant?.variantimages.image1,
                                product_name: { en: prod.variant?.products.name.en },
                                stock: prod.variant?.stock,
                                link: `/product-details?product_id=${prod?.variant?.pro_id}&variant_id=${prod.variant?.id}`,
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

    // useEffect(() => { console.log(orderData) }, [orderData]);

    return (
        <>
            <div className="shop-wishlist">
                {orderData?.length > 0 ?
                    <table className="wishlist-items">
                        <tbody>
                            {orderData?.map(order => (
                                <>
                                    <tr className="wishlist-item">
                                        <td className="wishlist-item-remove" onClick={(e) => {
                                            const prod = {
                                                id: order?.product_id,
                                                variant_id: order?.type !== 'simple_product' ? order?.variant_id : null,
                                                type: order?.type
                                            }
                                            handleAddRemoveWishlist(e, prod).then(result => {
                                                if (result.result) {
                                                    showSuccessToastMessage(result.message)
                                                }
                                            });
                                        }}>
                                            <span></span>
                                        </td>
                                        <td className="wishlist-item-image">
                                            <a href={order.link}>
                                                <img
                                                    width="600"
                                                    height="600"
                                                    src={order?.image_path + '/' + order?.product_image}
                                                    alt=""
                                                    style={{ border: '1px solid' }}
                                                />
                                            </a>
                                        </td>
                                        <td className="wishlist-item-info">
                                            <div className="wishlist-item-name">
                                                <a href={order.link}>
                                                    {order?.product_name?.en}
                                                </a>
                                            </div>
                                            <div className="wishlist-item-price">
                                                <span>KD {order.price}</span>
                                            </div>
                                            {/* <div className="wishlist-item-time">June 6, 2022</div> */}
                                        </td>
                                        <td className="wishlist-item-actions">
                                            <div className="wishlist-item-stock">{order?.stock > 0 ? t('Wishlist.In Stock') : t('Wishlist.Out of Stock')}</div>

                                            <div className="wishlist-item-add">
                                                <div
                                                    className="btn-add-to-cart"
                                                    data-title="Add to cart"
                                                >
                                                    {order?.stock > 0
                                                        ? <button
                                                            rel="nofollow"
                                                            href="#"
                                                            style={{ border: '1px solid' }}
                                                            className="product-btn button"
                                                            onClick={(e) => {
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
                                                                // console.log(order);
                                                                AddToCart(prod, 1)
                                                                    .then((result) => {
                                                                        if (result.result)
                                                                            handleAddRemoveWishlist(e, prod).then(result => {
                                                                                if (result.result) {
                                                                                    showSuccessToastMessage('Item removed from wishlist and added to cart')
                                                                                }
                                                                            });
                                                                    })
                                                                // handleAddRemoveWishlist(e, prod);
                                                            }}
                                                        >
                                                            {t('Wishlist.Move to cart')}
                                                        </button>
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
                                                                variant_id: order?.type !== 'simple_product' ? order?.variant_id : null,
                                                                type: order?.type
                                                            }
                                                            handleAddRemoveWishlist(e, prod).then(result => {
                                                                if (result.result) {
                                                                    showSuccessToastMessage(result.message)
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        {t('Wishlist.Remove')}
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
                                {t('Wishlist.Your Wishlist is currently empty.')}
                            </p>
                        </div>
                        <div className="return-to-shop">
                            <a className="button" href="/products" >
                                {t('Wishlist.Return to shop')}
                            </a>
                        </div>
                    </div>}

            </div>
        </>
    )
}
export default WishListTable;

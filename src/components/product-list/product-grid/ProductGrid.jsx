import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
const ProductGrid = (props) => {
    const { AddToCart, handleAddRemoveWishlist, showInfoToastMessage } = useShoppingCart();
    const product = props.current;

    const [productAddress, setProductAddress] = useState();
    const [image, setImage] = useState([]);
    const [stock, setStock] = useState();


    // useEffect(() => {
    //     setImage([]);
    //     if (product?.type) {
    //         setProductAddress(`/product-details?product_id=${product.id}`);
    //         const thumbnail = product?.thumbnail_path + '/' + product?.thumbnail;
    //         const hover = product?.thumbnail_path + '/' + product?.hover_thumbnail;
    //         setImage([thumbnail, hover]);
    //         setStock(product?.stock);
    //     }
    //     else {
    //         setProductAddress(`/product-details?product_id=${product?.id}&variant_id=${product?.subvariants?.[0].id}`);
    //         const thumbnail = product?.image_path + '/' + product?.subvariants?.[0].variantimages.main_image;
    //         const hover = product?.image_path + '/' + product?.subvariants?.[0].variantimages.image1;
    //         setImage([thumbnail, hover]);
    //         setStock(product?.subvariants?.[0].stock);
    //     }
    // }, []);
    return (
        <>
            <div
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                key={product.id}
            >
                <div className="items">
                    <div className="products-entry clearfix product-wapper">
                        <div className="products-thumb" >
                            {/* <div className="product-lable">
                                <div className="onsale">-23%</div>
                                <div className="hot">Hot</div>
                            </div> */}
                            <div className="product-thumb-hover">
                                <a href={product.address} target="_blank" rel="noopener noreferrer">
                                    <img
                                        width={600}
                                        style={{ width: '300px', height: '328px', objectFit: 'contain' }}
                                        src={product.image?.[0]}
                                        // src={product.image_path?.replace('gallery', `${product?.thumbnail}`)}
                                        className="post-image "
                                        alt="image not available"
                                    />
                                    <img
                                        width="600"
                                        height="600"
                                        style={{ width: '300px', height: '328px', objectFit: 'contain' }}
                                        src={product.image?.[1]}
                                        // src={product.image_path?.replace('gallery', `${product?.hover_thumbnail}`)}
                                        // src={product.image_path + '/' + product.hover_thumbnail}
                                        className="hover-image back"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="product-button">
                                <div
                                    className="btn-add-to-cart"
                                    data-title={product.stock > 0 ? 'Add to cart' : 'Out of stock'}
                                    aria-disabled
                                >
                                    <a
                                        rel="nofollow"
                                        onClick={() => {
                                            let prod = {};
                                            if (product?.type === 'simple_product') {
                                                if (product.stock > 0)
                                                    AddToCart(product, 1);
                                                else showInfoToastMessage('Out Of Stock')
                                            }
                                            else {
                                                if (product?.subvariants?.[0]?.stock > 0) {
                                                    prod = {
                                                        id: product.id,
                                                        variant_id: product.subvariants?.[0]?.id,
                                                        product_name: { en: product?.product_name?.en },
                                                        image_path: product?.image_path,
                                                        product_image: [
                                                            `${product.subvariants?.[0]?.variantimages?.image1}`,
                                                        ],
                                                        stock: product?.subvariants?.[0]?.stock,
                                                        price: product?.subvariants?.[0]?.price,
                                                        type: "variant",
                                                        link: `/product-details?product_id=${product.id}&variant_id=${product.subvariants?.[0]?.id}`,
                                                    }
                                                    AddToCart(prod, 1);
                                                } else showInfoToastMessage('Out Of Stock')
                                            }
                                        }
                                        }
                                        className="product-btn button"
                                    >
                                        {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
                                    </a>
                                </div>
                                <div
                                    className="btn-wishlist"
                                    data-title="Wishlist"
                                >
                                    <button className="product-btn"
                                        onClick={(e) => {
                                            let prod = {};
                                            if (product?.type === "simple_product") {
                                                prod = product;
                                            }
                                            else {
                                                prod = {
                                                    id: product.id,
                                                    variant_id: product.subvariants?.[0]?.id,
                                                    product_name: { en: product?.product_name?.en },
                                                    image_path: product?.image_path,
                                                    product_image: [
                                                        `${product.subvariants?.[0]?.variantimages?.image1}`,
                                                    ],
                                                    stock: product?.subvariants?.[0]?.stock,
                                                    price: product?.subvariants?.[0]?.price,
                                                    type: "variant",
                                                    link: `/product-details?product_id=${product.id}&variant_id=${product.subvariants?.[0]?.id}`,
                                                };
                                            }
                                            handleAddRemoveWishlist(e, prod)
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
                                    <a href={product.address} target="_blank" rel="noopener noreferrer">
                                        {product?.product_name?.en}
                                    </a>
                                </h3>
                                <span className="price">
                                    {product.stock > 0 ? `KD ${product.offer_price}` : `Out Of Stock`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductGrid;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
// import { AddToCart } from "../../block/NewArrival";
import './product.css';
import { useTranslation } from "react-i18next";


const Product = (props) => {

    const product = props.current;
    const [desc, setDesc] = useState(product.product_detail);
    // console.log(product.thumbpath + '/' + product.images[0].image);
    const { increaseItem, getQuantity } = useShoppingCart();
    const token = localStorage.getItem('accessToken');
    const { handleAddRemoveWishlist, AddToCart, showInfoToastMessage, showSuccessToastMessage } = useShoppingCart();
    const [productAddress, setProductAddress] = useState();
    const [image, setImage] = useState();
    const [stock, setStock] = useState();
    const [isInWishlist, setIsInWishlist] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        setIsInWishlist(product.InWishlist);
        return () => setIsInWishlist(0);
    }, [product])



    return (
        <>
            <div className="products-entry clearfix product-wapper">
                <div className="row">
                    <div className="col-md-42">

                        {/* Products Thumb  */}
                        <div className="products-thumb">
                            {
                                product?.hot_product === 1 ?
                                    <div className="product-lable">
                                        <div className="hot">{t("Product.Hot")}</div>
                                    </div>
                                    : ''
                            }
                            <div className="product-thumb-hover">
                                <a href={product?.address} target="_blank" rel="noopener noreferrer">


                                    <img
                                        width="600"
                                        height="600"
                                        src={product?.image?.[0]}
                                        className="post-image"
                                        alt=""
                                    />
                                    <img
                                        width="600"
                                        height="600"
                                        src={product.image?.[1]}
                                        className="hover-image back"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="products-content">
                            <a href={product?.address} target="_blank" rel="noopener noreferrer">

                                <h3 className="product-title">
                                    <a href={product.address}>{product?.product_name?.en}</a>
                                </h3>
                            </a>
                            <span className="price">KD {product?.price}</span>
                            <div className="rating">
                                <div className="rating">
                                    <StarRatings
                                        rating={product?.product_rating}
                                        starRatedColor="gold"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                    <br />
                                    <span>{t("Product.Rating")}: {product?.product_rating} {t("Product.out of 5")}</span>
                                </div>
                                {
                                    product?.reviews?.length !== 0 ?
                                        <div className="review">
                                            ({product?.reviews?.length}<span> {t('Product.Reviews')}</span>)
                                        </div> : ''
                                }

                            </div>
                            <div className="product-button">
                                <div
                                    className="btn-add-to-cart"
                                    data-title="Add to cart"
                                    style={{ cursor: 'pointer' }}
                                // onClick={() => increaseItem(product.id, 1)}
                                >
                                    <a
                                        rel="nofollow"
                                        onClick={() => {
                                            let prod = {};
                                            if (product?.type === 'simple_product') {
                                                if (product.stock > 0) {
                                                    prod = {
                                                        id: product?.id,
                                                        variant_id: null,
                                                        product_name: { en: product?.product_name?.en },
                                                        image_path: product?.image_path,
                                                        product_image: [
                                                            `${product?.thumbnail}`,
                                                        ],
                                                        stock: product?.stock,
                                                        max_order_limit: product?.max_order_qty,
                                                        price: product?.offer_price,
                                                        type: "simple_product",
                                                        link: `/product-details?product_id=${product?.id}`,
                                                    }
                                                    AddToCart(product, 1).then(result => {
                                                        if (result.result) {
                                                            showSuccessToastMessage(result.message)
                                                        } else {
                                                            showInfoToastMessage(result.message)
                                                        }
                                                    });
                                                }
                                                else showInfoToastMessage(t('Product.Out Of Stock'))
                                            }
                                            else {
                                                if (product?.stock > 0) {
                                                    prod = {
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
                                                        link: `/product-details?product_id=${product?.id}&variant_id=${product.subvariants?.[0]?.id}`,
                                                    }
                                                    AddToCart(product, 1).then(result => {
                                                        if (result.result) {
                                                            showSuccessToastMessage(result.message)
                                                        } else {
                                                            showInfoToastMessage(result.message)
                                                        }
                                                    });;
                                                }
                                                else showInfoToastMessage(t('Product.Out Of Stock'))
                                            }
                                        }
                                        }
                                        className="product-btn button"
                                    >
                                        {product.stock > 0 ? t('Product.Add to Cart') : t('Product.Out Of Stock')}
                                    </a>
                                </div>
                                <div
                                    className="btn-wishlist"
                                    data-title="Wishlist"
                                >
                                    <button className={isInWishlist ? "product-btn-active" : 'product-btn'}

                                        onClick={(e) => {
                                            setIsInWishlist(prev => !prev);
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
                                            handleAddRemoveWishlist(e, product).then(result => {
                                                if (result.result) {
                                                    showSuccessToastMessage(result.message);
                                                }
                                            })
                                        }}
                                    >
                                        {t('Product.Add to wishlist')}
                                    </button>
                                    <br />

                                </div>
                            </div>
                            <div className="product-description">
                                <div dangerouslySetInnerHTML={{ __html: product.desc.length > 50 ? product?.desc.slice(0, 50) + '...' : product?.desc }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Product;
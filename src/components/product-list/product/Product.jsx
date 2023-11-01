import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
// import { AddToCart } from "../../block/NewArrival";


const Product = (props) => {

    const product = props.current;
    const [desc, setDesc] = useState(product.product_detail);
    // console.log(product.thumbpath + '/' + product.images[0].image);
    const { increaseItem, getQuantity } = useShoppingCart();
    const token = localStorage.getItem('accessToken');
    const { handleAddRemoveWishlist, AddToCart } = useShoppingCart();
    const [productAddress, setProductAddress] = useState();
    const [image, setImage] = useState();
    const [stock, setStock] = useState();


    // useEffect(() => {
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
            <div className="products-entry clearfix product-wapper">
                <div className="row">
                    <div className="col-md-4">

                        {/* Products Thumb  */}
                        <div className="products-thumb">
                            <div className="product-lable">
                                <div className="hot">Hot</div>
                            </div>
                            <div className="product-thumb-hover">
                                <a href={product.address} target="_blank" rel="noopener noreferrer">


                                    <img
                                        width="600"
                                        height="600"
                                        src={product.image?.[0]}
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
                            {/* <span
                                className="product-quickview"
                                data-title="Quick View"
                            >
                                <a
                                    href="#"
                                    className="quickview quickview-button"
                                >
                                    Quick View <i className="icon-search"></i>
                                </a>
                            </span> */}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="products-content">
                            <a href={product.address} target="_blank" rel="noopener noreferrer">

                                <h3 className="product-title">
                                    <a href="shop-details.html">{product?.product_name?.en}</a>
                                </h3>
                            </a>
                            <span className="price">KD {product.offer_price}</span>
                            <div className="rating">
                                <div className="rating">
                                    <StarRatings
                                        rating={product.product_rating}
                                        starRatedColor="gold"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="24px"
                                        starSpacing="2px"
                                    />
                                    <p>Rating: {product.product_rating} out of 5</p>
                                </div>
                                <div className="review-count">
                                    ({product.reviews.length}<span> review</span>)
                                </div>
                            </div>
                            <div className="product-button">
                                <div
                                    className="btn-add-to-cart"
                                    data-title="Add to cart"
                                // onClick={() => increaseItem(product.id, 1)}
                                >
                                    <a
                                        rel="nofollow"
                                        onClick={() => {
                                            let prod = {};
                                            if (product?.type === 'simple_product') {
                                                if (product.stock > 0)
                                                    AddToCart(product, 1);
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
                                                }
                                            }
                                        }
                                        }
                                        className="product-btn button"
                                    >
                                        {product.stock > 0 ? 'Add to cart' : 'Out of Stock'}
                                    </a>
                                </div>
                                <div
                                    className="btn-wishlist"
                                    data-title="Wishlist"
                                >
                                    <button className="product-btn"
                                        // style={{ backgroundColor: 'black', color: 'white' }}
                                        // onClick={(e) => {
                                        //     handleAddRemoveWishlist(e, product);
                                        //     // document.documentElement.style.setProperty('--wishlist-color', 'white');
                                        //     // document.documentElement.style.setProperty('--wishlist-bk-color', 'black');
                                        // }}
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
                                {/* <div
                                    className="btn-compare"
                                    data-title="Compare"
                                >
                                    <button className="product-btn">
                                        Compare
                                    </button>
                                </div> */}
                            </div>
                            <div className="product-description">
                                {/* <div dangerouslySetInnerHTML={{ __html: product.product_detail }} /> */}
                                {/* <span>Read more</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Product;
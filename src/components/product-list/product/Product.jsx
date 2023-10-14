import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
// import { AddToCart } from "../../block/NewArrival";


const Product = (props) => {

    const product = props.current;
    const [desc, setDesc] = useState(product.description)
    // console.log(product.thumbpath + '/' + product.images[0].image);
    const { increaseItem, getQuantity } = useShoppingCart();
    const token = localStorage.getItem('accessToken');
    const { handleAddRemoveWishlist, AddToCart } = useShoppingCart();





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
                                <Link to={`/product-details?product_id=${product.id}`}>
                                    <img
                                        width="600"
                                        height="600"
                                        src={product.image_path.replace('gallery', `${product.thumbnail}`)}
                                        className="post-image"
                                        alt=""
                                    />
                                    <img
                                        width="600"
                                        height="600"
                                        src={product.image_path.replace('gallery', `${product.hover_thumbnail}`)}
                                        className="hover-image back"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <span
                                className="product-quickview"
                                data-title="Quick View"
                            >
                                <a
                                    href="#"
                                    className="quickview quickview-button"
                                >
                                    Quick View <i className="icon-search"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="products-content">
                            <Link to={`/product-details?product_id=${product.id}`}>

                                <h3 className="product-title">
                                    <a href="shop-details.html">{product.product_name.en}</a>
                                </h3>
                            </Link>
                            <span className="price">KD{product.actual_selling_price}</span>
                            <div className="rating">
                                <div className="rating">
                                    <StarRatings
                                        rating={2.5}
                                        starRatedColor="gold"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="24px"
                                        starSpacing="2px"
                                    />
                                    <p>Rating: {2.5} out of 5</p>
                                </div>
                                <div className="review-count">
                                    (1<span> review</span>)
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
                                            const prod = {
                                                id: product.id,
                                                price: product.actual_selling_price,
                                                image_path: product.image_path,
                                                product_image: [`${product.product_image[0]}`],
                                                product_name: { en: product.product_name.en }
                                            }
                                            AddToCart(prod, 1);
                                        }}
                                        className="product-btn button"
                                    >
                                        Add to cart
                                    </a>
                                </div>
                                <div
                                    className="btn-wishlist"
                                    data-title="Wishlist"
                                >
                                    <button className="product-btn"
                                        onClick={(e) => {

                                            handleAddRemoveWishlist(e, product)
                                            // document.documentElement.style.setProperty('--wishlist-color', 'white');
                                            // document.documentElement.style.setProperty('--wishlist-bk-color', 'black');
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
                                <div dangerouslySetInnerHTML={{ __html: desc }} />
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
import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
    return (
        <>
            <div className="products-entry clearfix product-wapper">
                <div className="row">
                    <div className="col-md-4">
                        <div className="products-thumb">
                            <div className="product-lable">
                                <div className="hot">Hot</div>
                            </div>
                            <div className="product-thumb-hover">
                                <Link href="shop-details.html" to="/shop-details">
                                    <img
                                        width="600"
                                        height="600"
                                        src="images/product/6.jpg"
                                        className="post-image"
                                        alt=""
                                    />
                                    <img
                                        width="600"
                                        height="600"
                                        src="images/product/6-2.jpg"
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
                            <h3 className="product-title">
                                <a href="shop-details.html">Dining Table</a>
                            </h3>
                            <span className="price">KD150.00</span>
                            <div className="rating">
                                <div className="star star-5"></div>
                                <div className="review-count">
                                    (1<span> review</span>)
                                </div>
                            </div>
                            <div className="product-button">
                                <div
                                    className="btn-add-to-cart"
                                    data-title="Add to cart"
                                >
                                    <a
                                        rel="nofollow"
                                        href="#"
                                        className="product-btn button"
                                    >
                                        Add to cart
                                    </a>
                                </div>
                                <div
                                    className="btn-wishlist"
                                    data-title="Wishlist"
                                >
                                    <button className="product-btn">
                                        Add to wishlist
                                    </button>
                                </div>
                                <div
                                    className="btn-compare"
                                    data-title="Compare"
                                >
                                    <button className="product-btn">
                                        Compare
                                    </button>
                                </div>
                            </div>
                            <div className="product-description">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis…
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Product;
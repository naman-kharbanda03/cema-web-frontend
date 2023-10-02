import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../../context/ShoppingCartContext";

const Product = (props) => {
    const product = props.current;
    const [desc,setDesc]= useState(product.description)
    // console.log(product.thumbpath + '/' + product.images[0].image);
    const { increaseItem, getQuantity } = useShoppingCart();
    // console.log(getQuantity(1));
    console.log("itss",product)

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
                                <Link to={`/product-details?product_id=${product.productid}`}>
                                    <img
                                        width="600"
                                        height="600"
                                        src={product.thumbpath + "/" + product.images[0].image}
                                        className="post-image"
                                        alt=""
                                    />
                                    <img
                                        width="600"
                                        height="600"
                                        src={product.thumbpath + "/" + product.images[1].image}
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
                            <Link to={`/product-details?product_id=${product.productid}`}>

                                <h3 className="product-title">
                                    <a href="shop-details.html">{product.productname.en}</a>
                                </h3>
                            </Link>
                            <span className="price">{product.symbol}{product.mainprice}</span>
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
                                    onClick={() => increaseItem(product.id, 1)}
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
                                
                                <div dangerouslySetInnerHTML={{ __html: desc }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Product;
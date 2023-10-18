import React from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
const ProductGrid = (props) => {
    const { AddToCart, handleAddRemoveWishlist } = useShoppingCart();
    const product = props.current;
    return (
        <>
            <div
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                key={product.id}
            >
                <div className="items">
                    <div className="products-entry clearfix product-wapper">
                        <div className="products-thumb" >
                            <div className="product-lable">
                                <div className="onsale">-23%</div>
                                {/*/to ask what to show */}
                                <div className="hot">Hot</div>
                            </div>
                            <div className="product-thumb-hover">
                                <Link
                                    to={`/product-details?product_id=${product.id}`}
                                >
                                    <img
                                        width={600}
                                        style={{ width: '300px', height: '328px', objectFit: 'contain' }}
                                        // src={product.image_path + '/' + product.thumbnail}
                                        src={product.image_path?.replace('gallery', `${product?.thumbnail}`)}
                                        className="post-image "
                                        alt="image not available"
                                    />
                                    <img
                                        width="600"
                                        height="600"
                                        style={{ width: '300px', height: '328px', objectFit: 'contain' }}

                                        src={product.image_path?.replace('gallery', `${product?.hover_thumbnail}`)}
                                        // src={product.image_path + '/' + product.hover_thumbnail}
                                        className="hover-image back"
                                        alt=""
                                    />
                                </Link>
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
                                            if (product.stock > 0) AddToCart(product, 1)
                                        }}
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
                                            handleAddRemoveWishlist(e, product)
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
                                    <Link to={`/product-details?product_id=${product.id}`}>
                                        {product?.product_name?.en}
                                    </Link>
                                </h3>
                                <span className="price">
                                    KD{product.actual_selling_price}
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
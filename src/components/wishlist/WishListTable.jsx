import React from "react";

const WishListTable = () => {
    return (
        <>
            <table className="wishlist-items">
                <tbody>
                    <tr className="wishlist-item">
                        <td className="wishlist-item-remove">
                            <span></span>
                        </td>
                        <td className="wishlist-item-image">
                            <a href="shop-details.html">
                                <img
                                    width="600"
                                    height="600"
                                    src="media/product/3.jpg"
                                    alt=""
                                />
                            </a>
                        </td>
                        <td className="wishlist-item-info">
                            <div className="wishlist-item-name">
                                <a href="shop-details.html">
                                    Chair Oak Matt Lacquered
                                </a>
                            </div>
                            <div className="wishlist-item-price">
                                <span>KD150.00</span>
                            </div>
                            <div className="wishlist-item-time">June 6, 2022</div>
                        </td>
                        <td className="wishlist-item-actions">
                            <div className="wishlist-item-stock">In stock</div>
                            <div className="wishlist-item-add">
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
                                    </a>{" "}
                                    &nbsp;&nbsp;
                                    <a
                                        rel="nofollow"
                                        href="#"
                                        className="product-btn button"
                                    >
                                        Remove
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
export default WishListTable;
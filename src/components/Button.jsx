import React from "react";

const Button = () => {
    return (
        <>
            <div className="products-list list">
                <div className="product-wapper">
                    <div className="products-content">
                        <div className="product-button">
                            <div
                                className="btn-add-to-cart"
                                data-title=" Filter"
                            >
                                <a
                                    rel="nofollow"
                                    href="#"
                                    className="product-btn button"
                                >
                                    Filter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Button;
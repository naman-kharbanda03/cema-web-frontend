import React from "react";
import PageTitle from "../../components/page-tittle/PageTitle";

const ShopWishlist = () => {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <PageTitle current={"Wishlist"} />

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="shop-wishlist">
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
                      <tr className="wishlist-item">
                        <td className="wishlist-item-remove">
                          <span></span>
                        </td>
                        <td className="wishlist-item-image">
                          <a href="shop-details.html">
                            <img
                              width="600"
                              height="600"
                              src="media/product/4.jpg"
                              alt=""
                            />
                          </a>
                        </td>
                        <td className="wishlist-item-info">
                          <div className="wishlist-item-name">
                            <a href="shop-details.html">
                              Pillar Dining Table Round
                            </a>
                          </div>
                          <div className="wishlist-item-price">
                            <del aria-hidden="true">
                              <span>KD150.00</span>
                            </del>
                            <ins>
                              <span>KD100.00</span>
                            </ins>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWishlist;

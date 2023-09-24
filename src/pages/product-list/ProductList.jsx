import React from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import Category from "../../components/product-list/Category";
import Product from "../../components/product-list/product/Product";




const ProductList = () => {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">

          <PageTitle current={"Wall & Living"} />

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div class="row">
                  <div class="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50">

                    {/* Categories */}
                    <div class="block block-product-cats">
                      <div class="block-title">
                        <h2>Categories</h2>
                      </div>
                      <div class="block-content">
                        <div className="product-cats-list">
                          <ul>
                            <Category />
                            <Category />
                            <li>
                              <a href="shop-grid-left.html">
                                Furniture <span className="count">4</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="block block-product-filter">
                      <div className="block-title">
                        <h2>Price</h2>
                      </div>
                      <div className="block-content">
                        <div id="slider-range" className="price-filter-wrap">
                          <div className="filter-item price-filter">
                            <div className="layout-slider">
                              <input
                                id="price-filter"
                                name="price"
                                value="0;100"
                              />
                            </div>
                            <div className="layout-slider-settings"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Size  */}
                    <div className="block block-product-filter clearfix">
                      <div className="block-title">
                        <h2>Size</h2>
                      </div>
                      <div className="block-content">
                        <ul className="filter-items text">
                          <li>
                            <span>L</span>
                          </li>
                          <li>
                            <span>M</span>
                          </li>
                          <li>
                            <span>S</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Brands  */}
                    <div className="block block-product-filter clearfix">
                      <div className="block-title">
                        <h2>Brands</h2>
                      </div>
                      <div className="block-content">
                        <ul className="filter-items image">
                          <li>
                            <span>
                              <img src="images/brand/1.jpg" alt="Brand" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <img src="images/brand/2.jpg" alt="Brand" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <img src="images/brand/3.jpg" alt="Brand" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <img src="images/brand/4.jpg" alt="Brand" />
                            </span>
                          </li>
                          <li>
                            <span>
                              <img src="images/brand/5.jpg" alt="Brand" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Feature Products  */}
                    <div className="block block-products">
                      <div className="block-title">
                        <h2>Feature Product</h2>
                      </div>
                      <div className="block-content">
                        <ul className="products-list">
                          <li className="product-item">
                            <a
                              href="shop-details.html"
                              className="product-image"
                            >
                              <img src="images/product/6.png" />
                            </a>
                            <div className="product-content">
                              <h2 className="product-title">
                                <a href="shop-details.html">Dining Table</a>
                              </h2>
                              <div className="rating small">
                                <div className="star star-5"></div>
                              </div>
                              <span className="price">
                                <del aria-hidden="true">
                                  <span>KD150.00</span>
                                </del>
                                <ins>
                                  <span>KD100.00</span>
                                </ins>
                              </span>
                            </div>
                          </li>
                          <li className="product-item">
                            <a
                              href="shop-details.html"
                              className="product-image"
                            >
                              <img src="images/product/8.png" />
                            </a>
                            <div className="product-content">
                              <h2 className="product-title">
                                <a href="shop-details.html">
                                  Spinning Pendant Lamp
                                </a>
                              </h2>
                              <div className="rating small">
                                <div className="star star-0"></div>
                              </div>
                              <span className="price">KD120.00</span>
                            </div>
                          </li>
                          <li className="product-item">
                            <a
                              href="shop-details.html"
                              className="product-image"
                            >
                              <img src="images/product/9.png" />
                            </a>
                            <div className="product-content">
                              <h2 className="product-title">
                                <a href="shop-details.html">Bora Armchair</a>
                              </h2>
                              <div className="rating small">
                                <div className="star star-5"></div>
                              </div>
                              <span className="price">
                                <del aria-hidden="true">
                                  <span>KD200.00</span>
                                </del>
                                <ins>
                                  <span>KD180.00</span>
                                </ins>
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing all 21 results
                        </div>
                      </div>

                      <div className="products-topbar-right">
                        <div className="products-sort dropdown">
                          <span
                            className="sort-toggle dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            Default sorting
                          </span>
                          <ul
                            className="sort-list dropdown-menu"
                            x-placement="bottom-start"
                          >
                            <li className="active">
                              <a href="#">Default sorting</a>
                            </li>
                            <li>
                              <a href="#">Sort by popularity</a>
                            </li>
                            <li>
                              <a href="#">Sort by average rating</a>
                            </li>
                            <li>
                              <a href="#">Sort by latest</a>
                            </li>
                            <li>
                              <a href="#">Sort by price: low to high</a>
                            </li>
                            <li>
                              <a href="#">Sort by price: high to low</a>
                            </li>
                          </ul>
                        </div>
                        <ul className="layout-toggle nav nav-tabs">
                          <li className="nav-item">
                            <a
                              className="layout-grid nav-link"
                              data-toggle="tab"
                              href="#layout-grid"
                              role="tab"
                            >
                              <span className="icon-column">
                                <span className="layer first">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </span>
                                <span className="layer middle">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </span>
                                <span className="layer last">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </span>
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="layout-list nav-link active"
                              data-toggle="tab"
                              href="#layout-list"
                              role="tab"
                            >
                              <span className="icon-column">
                                <span className="layer first">
                                  <span></span>
                                  <span></span>
                                </span>
                                <span className="layer middle">
                                  <span></span>
                                  <span></span>
                                </span>
                                <span className="layer last">
                                  <span></span>
                                  <span></span>
                                </span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Grid Version  */}
                    <div className="tab-content">
                      <div
                        className="tab-pane fade"
                        id="layout-grid"
                        role="tabpanel"
                      >
                        <div className="products-list grid">
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
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
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Dining Table
                                      </a>
                                    </h3>
                                    <span className="price">KD150.00</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="onsale">-33%</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/4.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/4-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Pillar Dining Table Round
                                      </a>
                                    </h3>
                                    <span className="price">
                                      <del aria-hidden="true">
                                        <span>KD150.00</span>
                                      </del>
                                      <ins>
                                        <span>KD100.00</span>
                                      </ins>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/7.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/7-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Mags Sofa 2.5 Seater
                                      </a>
                                    </h3>
                                    <span className="price">KD150.00</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="onsale">-33%</div>
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/8.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/8-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Spinning pendant lamp
                                      </a>
                                    </h3>
                                    <span className="price">
                                      <del aria-hidden="true">
                                        <span>KD150.00</span>
                                      </del>
                                      <ins>
                                        <span>KD100.00</span>
                                      </ins>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="onsale">-23%</div>
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/9.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/9-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Bora Armchair
                                      </a>
                                    </h3>
                                    <span className="price">
                                      <del aria-hidden="true">
                                        <span>KD100.00</span>
                                      </del>
                                      <ins>
                                        <span>KD90.00</span>
                                      </ins>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="onsale">-37%</div>
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/10.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/10-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Panton Dining Table
                                      </a>
                                    </h3>
                                    <span className="price">
                                      <del aria-hidden="true">
                                        <span>KD79.00</span>
                                      </del>
                                      <ins>
                                        <span>KD50.00</span>
                                      </ins>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/11.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/11-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Kittchen Table
                                      </a>
                                    </h3>
                                    <span className="price">KD120.00</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="onsale">-10%</div>
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/12.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/12-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Mundo Sofa With Cushion
                                      </a>
                                    </h3>
                                    <span className="price">
                                      <del aria-hidden="true">
                                        <span>KD200.00</span>
                                      </del>
                                      <ins>
                                        <span>KD180.00</span>
                                      </ins>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="products-entry clearfix product-wapper">
                                <div className="products-thumb">
                                  <div className="product-lable">
                                    <div className="hot">Hot</div>
                                  </div>
                                  <div className="product-thumb-hover">
                                    <a href="shop-details.html">
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/5.jpg"
                                        className="post-image"
                                        alt=""
                                      />
                                      <img
                                        width="600"
                                        height="600"
                                        src="images/product/5-2.jpg"
                                        className="hover-image back"
                                        alt=""
                                      />
                                    </a>
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
                                    <span
                                      className="product-quickview"
                                      data-title="Quick View"
                                    >
                                      <a
                                        href="#"
                                        className="quickview quickview-button"
                                      >
                                        Quick View{" "}
                                        <i className="icon-search"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="products-content">
                                  <div className="contents text-center">
                                    <h3 className="product-title">
                                      <a href="shop-details.html">
                                        Amp Pendant Light Large
                                      </a>
                                    </h3>
                                    <span className="price">KD140.00</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* List Version  */}
                      <div
                        className="tab-pane fade show active"
                        id="layout-list"
                        role="tabpanel"
                      >
                        <div className="products-list list">
                          <Product />
                          <Product />
                          <Product />
                        </div>
                      </div>
                    </div>

                    <nav className="pagination">
                      <ul className="page-numbers">
                        <li>
                          <a className="prev page-numbers" href="#">
                            Previous
                          </a>
                        </li>
                        <li>
                          <span
                            aria-current="page"
                            className="page-numbers current"
                          >
                            1
                          </span>
                        </li>
                        <li>
                          <a className="page-numbers" href="#">
                            2
                          </a>
                        </li>
                        <li>
                          <a className="page-numbers" href="#">
                            3
                          </a>
                        </li>
                        <li>
                          <a className="next page-numbers" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

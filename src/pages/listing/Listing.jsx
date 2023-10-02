import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";

import P613 from "../../asset/images/product/6-13.png";
import P611 from "../../asset/images/product/6-11.png";
import P64 from "../../asset/images/product/6-4.png";
import P66 from "../../asset/images/product/6-6.png";
import P67 from "../../asset/images/product/6-7.png";
import P68 from "../../asset/images/product/6-8.png";
import P69 from "../../asset/images/product/6-9.png";
import P610 from "../../asset/images/product/6-10.png";
import P615 from "../../asset/images/product/6-15.png";
import { Link, useLocation } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import Category from "../../components/product-list/Category";

const Listing = () => {
  const [data, setData] = useState();
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const products = params.get("products");
  const location = useLocation();
  const name = location.state ? location.state.name : null;
  console.log("location", location, name);

  const [categoryList, setCategoryList] = useState([]);
  console.log("categoryList",categoryList)
  const categoryListAPI = apiConfig.categoryListAPI;
  const fetchDetails = () => {
    fetch(
      `https://cema-backend.plasium.com/api/products?per_page=10&page=1&${products}=1`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log("test", data.data.data);
        setData(data.data.data);
      })
      .catch((error) => console.error("Problem with fetch operations", error));

    fetch(categoryListAPI, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((datar) => {
        setCategoryList(datar.categories.data);
        return datar;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* Page Info */}
            <PageTitle current={name} />
            {/* Page Content  */}
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50">
                      <div className="block block-product-cats">
                        <div className="block-title">
                          <h2>Categories</h2>
                        </div>
                        <div className="block-content">
                          <div className="product-cats-list">
                          <ul>
                            {categoryList.map(category => (
                              <Category current={category} />
                            ))}
                          </ul>
                          </div>
                        </div>
                      </div>

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
                                  style={{ display: "none" }}
                                />
                                <span className="jslider jslider_plastic">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="jslider-bg">
                                            <i className="l"></i>
                                            <i className="f"></i>
                                            <i className="r"></i>
                                            <i
                                              className="v"
                                              style={{
                                                left: "0%",
                                                width: "100%",
                                              }}
                                            ></i>
                                          </div>
                                          <div
                                            className="jslider-pointer"
                                            style={{ left: "0%" }}
                                          ></div>
                                          <div
                                            className="jslider-pointer jslider-pointer-to"
                                            style={{ left: "100%" }}
                                          ></div>
                                          <div
                                            className="jslider-label"
                                            style={{ display: "none" }}
                                          >
                                            <span>0</span>
                                          </div>
                                          <div
                                            className="jslider-label jslider-label-to"
                                            style={{ display: "none" }}
                                          >
                                            <span>100</span>&nbsp;KD
                                          </div>
                                          <div
                                            className="jslider-value"
                                            style={{
                                              left: "0%",
                                              marginLeft: "0px",
                                              right: "auto",
                                              visibility: "visible",
                                            }}
                                          >
                                            <span>0</span>&nbsp;KD
                                          </div>
                                          <div
                                            className="jslider-value jslider-value-to"
                                            style={{
                                              visibility: "visible",
                                              left: "auto",
                                              marginLeft: "0px",
                                              right: "0px",
                                            }}
                                          >
                                            <span>100</span>&nbsp;KD
                                          </div>
                                          <div className="jslider-scale"></div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </span>
                              </div>
                              <div className="layout-slider-settings"></div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                      <div className="products-topbar clearfix">
                        <div className="products-topbar-left">
                          <div className="products-count">
                            Showing all {data?.length} results
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
                        </div>
                      </div>

                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="layout-grid"
                          role="tabpanel"
                        >
                          <div className="products-list grid">
                            <div className="row">
                              {data?.map((product) => (
                                <div
                                  className="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                                  key={product.id}
                                >
                                  <div className="items">
                                    <div className="products-entry clearfix product-wapper">
                                      <div className="products-thumb">
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
                                              height={600}
                                              src={`${product.image_path}/${product.product_image?.[0]}`}
                                              className="hover-image back"
                                              alt="image not available"
                                            />
                                          </Link>
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
                                        </div>
                                      </div>
                                      <div className="products-content">
                                        <div className="contents text-center">
                                          <h3 className="product-title">
                                            <a href="#">
                                              {product?.product_name?.en}
                                            </a>
                                          </h3>
                                          <span className="price">
                                            KD{product.actual_selling_price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
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
    </>
  );
};

export default Listing;

import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import { Link, useLocation } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import Category from "../../components/product-list/Category";
// import { AddToCart } from "../../components/block/NewArrival";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import Product from "../../components/product-list/product/Product";
import ProductGrid from "../../components/product-list/product-grid/ProductGrid";

const Listing = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastpage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const products = params.get("products");
  const location = useLocation();
  const name = products.split('_').join(' ');

  const token = localStorage.getItem("accessToken");
  const categoryListAPI = apiConfig.categoryListAPI;
  const { handleAddRemoveWishlist, AddToCart, wishListItems, cartItems } = useShoppingCart();
  const [view, setView] = useState("grid");

  const fetchDetails = () => {
    const apiUrl = apiConfig.listingAPI;
    const token = localStorage.getItem('accessToken');
    fetch(`${apiUrl}?per_page=12&page=${currentPage}&${products}=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log("test", data.data.data);
        // setData(data.data.data);
        setLastpage(data.data.last_page);
        const products = data.data.data.map(product => {
          if (product?.type === 'simple_product') {
            const thumbnail = product?.thumbnail_path + '/' + product?.thumbnail;
            const hover = product?.thumbnail_path + '/' + product?.hover_thumbnail;
            const stock = product?.stock;
            const isInWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => item.product_id === product?.id) === -1
                ? 0
                : 1;
            const InCart = localStorage.getItem('accessToken')
              ? product?.is_in_cart
              : cartItems.Items?.findIndex(item => item.product_id === product?.id) === -1
                ? 0
                : 1;

            return {
              // ...product,
              stock: stock,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product.id}`,
              desc: product?.product_detail.en,
              InWishlist: isInWishlist,
              InCart: InCart,
              id: product.id,
              variant_id: null,
              product_name: {
                en: product?.product_name?.en
              },
              image_path: product?.thumbnail_path,
              product_image: [
                `${product.thumbnail}`,
              ],
              stock: product?.stock,
              max_order_limit: product?.max_order_qty,
              price: product?.offer_price > 0 ? product?.offer_price : product?.price,
              type: "simple_product",
              link: `/product-details?product_id=${product.id}`,
              hot_product: product.hot_product,
              reviews: product?.reviews,
              product_rating: product?.product_rating
            }
          }

          else {
            const thumbnail = product?.image_path + '/' + product?.subvariants?.[0].variantimages.main_image;
            const hover = product?.image_path + '/' + product?.subvariants?.[0].variantimages.image1;
            const stock = product?.subvariants?.[0].stock;
            const isInWishlist = localStorage.getItem('accessToken')
              ? product?.is_in_wishlist
              : wishListItems.Items?.findIndex(item => (item.product_id === product?.id && item.type === 'variant')) === -1
                ? 0
                : 1;
            const InCart = localStorage.getItem('accessToken')
              ? product?.is_in_cart
              : cartItems.Items?.findIndex(item => (item.product_id === product?.id && item.type === 'variant')) === -1
                ? 0
                : 1;

            return {
              // ...product,
              stock: stock,
              image: [thumbnail, hover],
              address: `/product-details?product_id=${product?.id}&variant_id=${product?.subvariants?.[0].id}`,
              desc: product?.des.en,
              InWishlist: isInWishlist,
              InCart: InCart,
              id: product.id,
              variant_id: product.subvariants?.[0]?.id,
              product_name: { en: product?.product_name?.en },
              image_path: product?.image_path,
              product_image: [
                `${product.subvariants?.[0]?.variantimages?.image1}`,
              ],
              stock: product?.subvariants?.[0]?.stock,
              max_order_limit: product?.subvariants?.[0]?.max_order_qty,
              price: product?.subvariants?.[0]?.offer ? product?.subvariants?.[0]?.offer : product?.subvariants?.[0]?.price,
              type: "variant",
              link: `/product-details?product_id=${product.id}&variant_id=${product.subvariants?.[0]?.id}`,
              hot_product: product.hot_product,
              reviews: product?.reviews,
              product_rating: product?.product_rating
            }
          }

        })
        setData(products);
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
  }, [currentPage, location.search]);

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
                              {categoryList.map((category) => (
                                <Category current={category} />
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* <div className="block block-product-filter">
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
                      </div> */}

                      {/* <div className="block block-product-filter clearfix">
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
                      </div> */}
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                      <div className="products-topbar clearfix">
                        <div className="products-topbar-left">
                          <div className="products-count">
                            Showing all {data?.length} results
                          </div>
                        </div>
                        <div className="products-topbar-right">
                          {/* <div className="products-sort dropdown">
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
                          </div> */}
                          <ul className="layout-toggle nav nav-tabs">
                            <li
                              className="nav-item"
                              onClick={() => setView("grid")}
                              style={{ cursor: "pointer" }}
                            >
                              <a
                                className={`layout-grid nav-link ${view === "grid" ? "active" : ""
                                  }`}
                                data-toggle="tab"
                                role="tab"
                              >
                                <span className="icon-column">
                                  <span class="layer first">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </span>
                                  <span class="layer middle">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </span>
                                  <span class="layer last">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </span>
                                </span>
                              </a>
                            </li>
                            <li
                              className="nav-item"
                              onClick={() => setView("list")}
                              style={{ cursor: "pointer" }}
                            >
                              <a
                                className={`layout-list nav-link ${view === "list" ? "active" : ""
                                  }`}
                                data-toggle="tab"
                                role="tab"
                              >
                                <span className="icon-column">
                                  <span class="layer first">
                                    <span></span>
                                    <span></span>
                                  </span>
                                  <span class="layer middle">
                                    <span></span>
                                    <span></span>
                                  </span>
                                  <span class="layer last">
                                    <span></span>
                                    <span></span>
                                  </span>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="tab-content">
                        {/* List Version  */}
                        <div
                          className={`tab-pane fade ${view === "list" ? "show active" : ""
                            }`}
                          id="layout-list"
                          role="tabpanel"
                        >
                          <div className="products-list list">
                            {data?.map((product) => (
                              <Product current={product} />
                            ))}
                          </div>
                        </div>

                        <div
                          className={`tab-pane fade ${view === "grid" ? "show active" : ""
                            }`}
                          id="layout-grid"
                          role="tabpanel"
                        >
                          <div className="products-list grid">
                            <div className="row">
                              {data?.map(product => (
                                <>
                                  <ProductGrid current={product} />
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pagination  */}
                      <nav className="pagination">
                        <ul className="page-numbers">
                          {currentPage !== 1 ? (
                            <li
                              onClick={() => setCurrentPage((pre) => pre - 1)}
                            >
                              <a className="prev page-numbers" href="#">
                                Previous
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {currentPage - 1 > 0 ? (
                            <li
                              onClick={() => setCurrentPage((page) => page - 1)}
                            >
                              <a class="page-numbers" href="#">
                                {currentPage - 1}
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {currentPage <= lastPage ?
                            <li>
                              <span
                                aria-current="page"
                                class="page-numbers current"
                              >
                                {currentPage}
                              </span>
                            </li> : ''
                          }
                          {currentPage + 1 <= lastPage ? (
                            <li
                              onClick={() => setCurrentPage((page) => page + 1)}
                            >
                              <a class="page-numbers" href="#">
                                {currentPage + 1}
                              </a>
                            </li>
                          ) : (
                            ""
                          )}

                          {currentPage !== lastPage ? (
                            <li
                              onClick={() => setCurrentPage((pre) => pre + 1)}
                            >
                              <a className="next page-numbers" href="#">
                                Next
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
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

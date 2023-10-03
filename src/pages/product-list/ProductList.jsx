import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import PageTitle from "../../components/page-tittle/PageTitle";
import PreLoader from "../../components/pre-loader/PreLoader";
import Brands from "../../components/product-list/Brands";
import Category from "../../components/product-list/Category";
import Product from "../../components/product-list/product/Product";
import apiConfig from "../../config/apiConfig";
import Error from "../error/Error";



const ProductList = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastpage] = useState(1);

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [brands, setBrands] = useState([]);



  const [categoryDetails, setCategoryDetails] = useState({
    category: {},
    products: []
  });
  const [categories, setCategories] = useState({});
  const [productsLoaded, setProductsLoaded] = useState(false);

  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');



  const fetchDetails = (categoryListAPI, categoryDetailsAPI, brandsAPI) => {
    // const productListAPI = apiConfig.productListAPI;

    fetch(categoryListAPI, {
      method: "GET"
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

    fetch(categoryDetailsAPI, {
      method: "GET"
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((datar) => {
        console.log(datar);
        if (datar.status) return "";
        else {
          setProductList(datar.products.data);
          setCurrentPage(datar.products.current_page);
          setLastpage(datar.products.last_page);

          return datar;
        }

      })
      .catch((error) => console.error("Problem with fetch operations", error));

    fetch(brandsAPI, {
      method: "GET"
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((datar) => {
        if (datar.status) return "";
        else {
          setBrands(datar);
          return datar;
        }

      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryID = queryParams.get('id');
    let categoryDetailsAPI = "";

    if (categoryID === null) {
      categoryDetailsAPI = `https://cema-backend.plasium.com/api/category/0?currency=INR&page=${currentPage}&per_page=3`;
    }
    else {
      categoryDetailsAPI = `https://cema-backend.plasium.com/api/category/${categoryID}?currency=INR&page=${currentPage}&per_page=3`;
    }
    const categoryListAPI = apiConfig.categoryListAPI;
    const brandsAPI =

      apiConfig.brandsAPI;
    const productListAPI = apiConfig.productListAPI;

    fetchDetails(categoryListAPI, categoryDetailsAPI, brandsAPI);
  }, [location.search, currentPage]);

  // useEffect(() => {
  //   console.log(categoryList, brands);
  // }, [categoryList, brands]);

  useEffect(() => {
    // setProductList(categoryDetails.products);
    setFilteredProductList(productList);
    setProductsLoaded(true);
  }, [productList])


  const handleSizeChange = (event) => {
    console.log(event.target.getAttribute('value'));
    const newSize = event.target.getAttribute('value');

    setSelectedSize(newSize);
    // Filter products based on selected size, price range, and brand
    filterProducts(newSize, selectedPrice, selectedBrand);
  };

  const handleBrandChange = (newBrand) => {
    // const newBrand = event.target.value;
    console.log(newBrand);
    setSelectedBrand(newBrand);

    // Filter products based on selected size, price range, and brand
    filterProducts(selectedSize, selectedPrice, newBrand);
  };

  const filterProducts = (size, price, brand) => {
    let filtered = productList;
    // Filter by size
    if (size !== 'All') {
      filtered = filtered.filter((product) => product.type === size);
    }

    // Filter by price range
    if (price !== '') {
      filtered = filtered.filter((product) => product.price <= parseInt(price));
    }

    // Filter by brand
    if (brand !== 'All') {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    // Update the filtered products state
    setFilteredProductList(filtered);
  };
  const handlePage = (page) => {
    setCurrentPage(page);
  }



  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">

          <PageTitle current={category === null ? "Products" : category} />

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
                            {categoryList.map(category => (
                              <Category current={category} />
                            ))}
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
                      <div className="block-content" >
                        <ul className="filter-items text" onClick={handleSizeChange}>
                          <li>
                            <span value="l" >L</span>
                          </li>
                          <li>
                            <span value="m" >M</span>
                          </li>
                          <li>
                            <span value="s" >S</span>
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
                          {brands.map(brand => <Brands brand={brand} bf={handleBrandChange} />)}
                        </ul>
                      </div>
                    </div>


                    {/* Feature Products  */}
                    {/* <div className="block block-products">
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
                    </div> */}
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing all {filteredProductList.length} results
                        </div>
                      </div>

                      {/* <div className="products-topbar-right">
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
                      </div> */}
                    </div>


                    {/* Grid Version  */}
                    <div className="tab-content">
                      <div
                        className="tab-pane fade"
                        id="layout-grid"
                        role="tabpanel"
                      >
                        {/* <div className="products-list grid">
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
                        </div> */}
                      </div>

                      {/* List Version  */}
                      <div
                        className="tab-pane fade show active"
                        id="layout-list"
                        role="tabpanel"
                      >
                        <div className="products-list list">
                          {filteredProductList.map(product => (
                            <Product current={product} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pagination  */}
                    <nav className="pagination">
                      <ul className="page-numbers">
                        {currentPage !== 1 ?
                          <li onClick={() => setCurrentPage(pre => pre - 1)}>
                            <a className="prev page-numbers" href="#">
                              Previous
                            </a>
                          </li> : ""
                        }

                        {[...Array(lastPage)].map((e, i) => (
                          <>
                            <li key={i} value={i + 1} onClick={() => handlePage(i + 1)} >
                              <a href="#">
                                <span
                                  aria-current="page"
                                  className={`page-numbers ${currentPage === i + 1 ? "current" : ""}`}
                                >
                                  {i + 1}
                                </span>
                              </a>
                            </li>
                          </>
                        ))}

                        {currentPage !== lastPage ?
                          <li onClick={() => setCurrentPage(pre => pre + 1)}>
                            <a className="next page-numbers" href="#">
                              Next
                            </a>
                          </li> : ""
                        }

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

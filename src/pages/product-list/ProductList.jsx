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
      categoryDetailsAPI = `https://cema-backend.plasium.com/api/category/0?currency=INR&page=${currentPage}&per_page=2`;
    }
    else {
      categoryDetailsAPI = `https://cema-backend.plasium.com/api/category/${categoryID}?currency=INR&page=${currentPage}&per_page=2`;
    }
    const categoryListAPI = apiConfig.categoryListAPI;
    const brandsAPI = apiConfig.brandsAPI;
    const productListAPI = apiConfig.productListAPI;

    fetchDetails(categoryListAPI, categoryDetailsAPI, brandsAPI);
  }, [location.search, currentPage]);


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
      filtered = filtered.filter((product) => product.brand_name === brand);
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
                          <ul onClick={() => setCurrentPage(1)}>
                            {
                              categoryList.map(category => (
                                <Category current={category} />
                              ))
                            }
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
                        <ul className="filter-items text" onClick={(e) => handleSizeChange(e)}>
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
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing all {filteredProductList.length} results
                        </div>
                      </div>
                    </div>

                    {/* List Version  */}
                    <div className="tab-content">
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
                        {currentPage - 1 > 0 ? <li onClick={() => setCurrentPage(page => page - 1)}><a class="page-numbers" href="#">{currentPage - 1}</a></li> : ""}
                        <li><span aria-current="page" class="page-numbers current">{currentPage}</span></li>
                        {currentPage + 1 <= lastPage ? <li onClick={() => setCurrentPage(page => page + 1)}><a class="page-numbers" href="#">{currentPage + 1}</a></li> : ""}

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

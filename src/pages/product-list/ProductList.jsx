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
import { ToastContainer, toast } from "react-toastify";
import Dropdown from 'react-bootstrap/Dropdown';
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ProductGrid from "../../components/product-list/product-grid/ProductGrid";






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
  const [p, setP] = useState([]);
  const { AddToCart, handleAddRemoveWishlist, wishListItems, cartItems } = useShoppingCart();
  const [categoryName, setCategoryName] = useState();

  const [categoryDetails, setCategoryDetails] = useState({
    category: {},
    products: []
  });
  const [categories, setCategories] = useState({});
  const [productsLoaded, setProductsLoaded] = useState(false);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [filterToggle, setFilterToggle] = useState(false);
  const [view, setView] = useState('grid');

  const handleFilter = (e) => {
    setFilter(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const clearFilter = () => {
    setFilter({
      minPrice: 0,
      maxPrice: 1000000,
      brand: ''
    });
    setFilterToggle(prev => !prev);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryID = queryParams.get('id');
    const query = {
      currency: "INR",
      page: currentPage,
      per_page: 10,
      price_range: `${filter?.minPrice}-${filter?.maxPrice}`,
      brand: filter.brand ? filter.brand : '',
    };
    const queryString = new URLSearchParams(query).toString();
    let urlAPI = "";
    const categoryDetailAPI = apiConfig.categoryDetailsAPI;
    if (categoryID === null) {
      urlAPI = `${categoryDetailAPI}/0?${queryString}`;
    }
    else {
      urlAPI = `${categoryDetailAPI}/${categoryID}?${queryString}`;
    }
    const request = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
    fetch(urlAPI, request)
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((datar) => {
        // console.log(datar);
        if (datar.status) return "";
        else {
          setCategoryName(datar.category?.name?.en);
          setProductList(datar.products.data);
          setCurrentPage(datar.products.current_page);
          setLastpage(datar.products.last_page);
          return datar;
        }
      })
      .catch((error) => console.error("Problem with fetch operations", error));


  }, [location.search, currentPage, filterToggle]);

  useEffect(() => {
    const categoryListAPI = apiConfig.categoryListAPI;
    const brandsAPI = apiConfig.brandsAPI;

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


  }, []);


  useEffect(() => {
    // console.log(wishListItems)
    const products = productList.map(product => {
      if (product?.type) {
        const thumbnail = product?.thumbnail_path + '/' + product?.thumbnail;
        const hover = product?.thumbnail_path + '/' + product?.hover_thumbnail;
        const stock = product?.stock;
        const address = `/product-details?product_id=${product.id}`;
        const price = product.price;
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
          address: address,
          image: [thumbnail, hover],
          desc: product?.product_detail.en,
          InWishlist: isInWishlist,
          InCart: InCart,
          // price: price,

          //Later properties
          id: product.id,
          variant_id: null,
          product_name: { en: product?.product_name?.en },
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
      } else {
        const thumbnail = product?.thumbnail_path;
        const hover = product?.hover_thumbnail_path;
        const stock = product?.subvariants?.[0].stock;
        const address = `/product-details?product_id=${product?.id}&variant_id=${product?.subvariants?.[0].id}`;

        const InWishlist = localStorage.getItem('accessToken')
          ? product?.is_in_wishlist
          : wishListItems.Items?.findIndex(item => (item.product_id === product?.id && item.type === 'variant')) === -1
            ? 0
            : 1;

        const InCart = localStorage.getItem('accessToken')
          ? product?.is_in_cart
          : cartItems.Items?.findIndex(item => (item.product_id === product?.id && item.type === 'variant')) === -1
            ? 0
            : 1;
        // console.log(address, InWishlist)
        return {
          // ...product,
          stock: stock,
          address: address,
          image: [thumbnail, hover],
          desc: product?.des.en,
          InWishlist: InWishlist,
          InCart: InCart,
          // price: price,

          //Late properties
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
    // console.log(products);
    setFilteredProductList(products);
    setProductsLoaded(true);
  }, [productList])

  const handlePage = (page) => {
    setCurrentPage(page);
  }



  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">

          <PageTitle current={categoryName ? categoryName : 'Products'} />

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
                                <Category current={category} clear={clearFilter} />
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>



                    <div className="block block-product-filter">
                      {/* <div className="block-title">
                        <h2>Price</h2>
                      </div> */}
                      <div className="block-content">
                        <button
                          style={{ width: '30%' }}
                          onClick={() => clearFilter()}
                        >
                          Reset Filter
                        </button>
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
                            <div className="layout-slider" style={{ display: 'flex' }}>
                              <input
                                id="price-filter"
                                name="minPrice"
                                style={{ width: '20%', textAlign: 'center' }}
                                onChange={(e) => handleFilter(e)}
                                value={filter.minPrice === 0 ? '' : filter.minPrice}
                                placeholder='Min'
                              />
                              <br />
                              <input
                                id="price-filter"
                                name="maxPrice"
                                style={{ marginLeft: '3%', width: '20%', textAlign: 'center' }}
                                onChange={(e) => handleFilter(e)}
                                value={filter.maxPrice === 1000000 ? '' : filter.maxPrice}
                                placeholder='Max'
                              />
                              <button
                                style={{ marginLeft: '5%', width: '20%' }}
                                onClick={() => setFilterToggle(prev => !prev)}
                              >
                                Go
                              </button>
                            </div>
                            <div className="layout-slider-settings"></div>
                          </div>
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
                              />
                            </div>
                            <div className="layout-slider-settings"></div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Size  */}
                    {/* <div className="block block-product-filter clearfix">
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
                    </div> */}

                    {/* Brands  */}
                    <div className="block block-product-filter clearfix">
                      <div className="block-title">
                        <h2>Brands</h2>
                      </div>
                      <div className="block-content">
                        <ul className="filter-items image">
                          {brands.map(brand => <Brands brand={brand} bf={setFilter} ft={setFilterToggle} f={filter} />)}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">

                      <div className="products-topbar-left" style={{ display: 'flex' }}>
                        <div>
                          <input placeholder="Search products" style={{ border: '1px solid #e1e1e1', paddingLeft: '10px' }} />
                        </div>

                      </div>
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing all {filteredProductList.length} results
                        </div>
                      </div>
                      <div className="products-topbar-right">
                        <ul className="layout-toggle nav nav-tabs">
                          <li className="nav-item" onClick={() => setView('grid')}>
                            <a className={`layout-grid nav-link ${view === 'grid' ? 'active' : ''}`} data-toggle="tab" href="#layout-grid" role="tab">
                              <span className="icon-column">
                                <span class="layer first"><span></span><span></span><span></span></span><span class="layer middle"><span></span><span></span><span></span></span><span class="layer last"><span></span><span></span><span></span></span></span></a>
                          </li>
                          <li className="nav-item" onClick={() => setView('list')}>
                            <a className={`layout-list nav-link ${view === 'list' ? 'active' : ''}`} data-toggle="tab" href="#layout-list" role="tab"><span className="icon-column"><span class="layer first"><span></span><span></span></span><span class="layer middle"><span></span><span></span></span><span class="layer last"><span></span><span></span></span></span></a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {filteredProductList?.length === 0
                      ?
                      <>
                        <div className="no-products" style={{ display: 'flex', margin: "auto", justifyContent: 'center' }}>
                          No Products Available

                        </div>
                      </>
                      :
                      <>
                        <div className="tab-content">
                          {/* List Version  */}
                          <div
                            className={`tab-pane fade ${view === 'list' ? 'show active' : ''}`}
                            id="layout-list"
                            role="tabpanel"
                          >
                            <div className="products-list list">
                              {filteredProductList.map(product => (
                                <Product current={product} />
                              ))}
                            </div>
                          </div>

                          {/* Grid Version  */}
                          <div
                            className={`tab-pane fade ${view === 'grid' ? 'show active' : ''}`}
                            id="layout-grid"
                            role="tabpanel"
                          >
                            <div className="products-list grid">
                              <div className="row">
                                {filteredProductList?.map((product) => (
                                  <>
                                    <ProductGrid current={product} />
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    }




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
                        {currentPage <= lastPage ? <li><span aria-current="page" class="page-numbers current">{currentPage}</span></li> : ''}
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
      </div >
    </div >
  );
};

export default ProductList;

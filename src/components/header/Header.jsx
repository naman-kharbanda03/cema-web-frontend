import React, { useContext, useEffect, useState, useTransition } from "react";
import logo from "../../asset/images/logo.png";
import product_1 from "../../asset/images/product/1.jpg";
import product_3 from "../../asset/images/product/3.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { UserData } from "../../context/UserContext";
import styles from './Header.module.css'
import { useTranslation } from "react-i18next";
import { Translate } from '@google-cloud/translate';

const translateClient = new Translate({ key: 'AIzaSyBcdlNrQoO3pvPrrlS_uebDkU81sY0qj3E' });

function translatePageContent(targetLanguage) {
  const elements = document.querySelectorAll('body *');

  elements.forEach(async (element) => {
    const text = element.innerText;
    const [translation] = await translateClient.translate(text, targetLanguage);
    element.innerText = translation;
  });
}

const Header = ({ setOpenDrawer }) => {
  const navigate = useNavigate();
  const handleNavigate = (name, link) => {
    navigate(`/listings?products=${link}`, { state: { name } });
  };

  const { LOGGEDIN } = useContext(UserData); // Variable Description
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const { wishListCount, cartItemsCount } = useShoppingCart(); // Imported Functions from Global Variables or States or Context
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || ''
  const [selectedLanguage, setSelectedLanguage] = useState('en');


  const fetchDetails = () => {
    const apiUrl = apiConfig.navCategoriesAPI;
    fetch(
      apiUrl,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
    // console.log(styles)
    fetch(apiConfig.categoryListAPI, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setCategoryList(data.categories.data);
      })
  }, []);

  useEffect(() => {
    (
      function () {
        fetch(apiConfig.topMenu)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setMenuItems(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    )();

  }, []);

  const fetchCategoryById = (id) => {
    const category = categoryList.filter(category => category.id === id);
    return category[0]?.title?.en;
  };
  function onLangChange(e) {

    i18n.changeLanguage(e.target.value);

  }
  const [query, setQuery] = useState(search);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  }
  const onSearch = () => {
    window.location.href = `/products?search=${query}`
  }
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    translatePageContent(newLanguage);
  };

  return (
    <header
      id="site-header"
      className="site-header header-v2 large-height"
      style={{ zIndex: 1000 }}
    >
      <div id="header-topbar" className="topbar-v1 hidden-sm hidden-xs">
        <div className="topbar-inner">
          <div className="section-padding">
            <div className="section-container large p-l-r">
              <div className="row">
                <div className="col-md-6 topbar-left">
                  <div className="block block-html">
                    <div className="email hidden-xs">
                      <i className="ti-email" />
                      <a href="mailto:support@cema.online">
                        support@cema.online
                      </a>
                    </div>
                    {/* <div className="currency has-n-select d-inline-block">
                      <select name="currency" id="currency">
                        <option value="KWD">KWD</option>
                        <option value="USD">USD</option>
                      </select>
                    </div> */}
                    <div className="language has-n-select d-inline-block">
                      <select name="language" id="language" onChange={handleLanguageChange} value={selectedLanguage}>
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                      </select>
                    </div>
                    <div id="google_translate_element"></div>

                  </div>
                </div>
                <div className="col-md-6 topbar-right">
                  <ul id="topbar-menu" className="menu">
                    <li>
                      <div class="input-group">
                        <input type="text" class="form-control" value={query} onChange={handleSearch} placeholder="Search Product" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span class="input-group-text" id="basic-addon2" onClick={onSearch}>
                          <i class="fa-solid fa-magnifying-glass" ></i>
                        </span>
                      </div>
                    </li>
                    <li className="menu-item">
                      <Link to="/contact">{t('Header.Contact')}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-mobile">
        <div className="section-padding">
          <div className="section-container large">
            <div className="row">

              {/* Left Icon */}
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                <div className="navbar-header">
                  <button
                    type="button"
                    id="show-megamenu"
                    className="navbar-toggle"
                    onClick={() => setOpenDrawer(prev => !prev)}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
                <div className="site-logo">
                  <a href="/">
                    <img
                      width={400}
                      height={79}
                      src={logo}
                      alt="cema – Furniture HTML Theme"
                    />
                  </a>
                </div>
              </div>

              {/* Right Cart Icon */}
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                <div className="user-box" style={{ width: '30px', fontSize: '19px', marginRight: '8px' }}>
                  <Link to="/account">
                    <i class="fa-regular fa-user" />                  </Link>

                </div>
                <div className="wishlist-box" style={{ width: '30px', fontSize: '20px', marginRight: '8px' }}>
                  <Link to="/wishlist">
                    <i className="ti-heart" />
                  </Link>
                  <span className="" style={{
                    // border: '1px solid black',
                    borderRadius: '50%',
                    color: 'white',
                    backgroundColor: 'black',
                    position: 'relative',
                    bottom: '16px',
                    fontSize: '13.5px',
                    // width: '100px',
                    padding: '1px 6px 1px 6px'
                  }}>{wishListCount}</span>
                </div>

                <div className="cema-topcart dropdown">
                  <div className="dropdown mini-cart top-cart">
                    <div className="remove-cart-shadow" />
                    <a
                      className="dropdown-toggle cart-icon"
                      href="/cart"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div className="icons-cart">
                        <i className="ti-bag" />
                        <span className="cart-count">{cartItemsCount}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-desktop">
        <div className="header-wrapper">
          <div className="section-padding">
            <div className="section-container large p-l-r">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 header-left">
                  <div className="site-navigation">
                    <nav id="main-navigation">
                      <ul id="menu-main-menu" className="menu">
                        <li
                          className="level-0 menu-item"
                          key='1'
                        >
                          <a href={`/listings?products=new_arrival`}>
                            <span className="menu-item-text">{t('Header.New Arrivals')}</span>
                          </a>
                        </li>
                        <li
                          className="level-0 menu-item"
                          key='2'
                        >
                          <a href={`/listings?products=best_sellers`}>
                            <span className="menu-item-text">{t('Header.Best Sellers')}</span>
                          </a>
                        </li>
                        <li className="level-0 menu-item menu-item-has-children mega-menu level-menu-fullwidth" key='3'>
                          <a href={`/`}>
                            <span className="menu-item-text">{t('Header.More')}</span>
                          </a>
                          <div className={`sub-menu`}>
                            <div className="row">
                              {menuItems?.map((items, key) => {
                                if (items.link_by === 'url')
                                  return (
                                    <div className="col-md-4">
                                      <div className="menu-section">
                                        <Link
                                          to={items.url}
                                        >
                                          <h2 className="sub-menu-title">
                                            {items?.title?.en}
                                          </h2>
                                        </Link>

                                      </div>
                                    </div>
                                  );
                                return (
                                  <div className="col-md-4">
                                    <div className="menu-section" style={{ marginBottom: '10px' }}>

                                      <h2 className="sub-menu-title" style={{ marginBottom: 0, }}>
                                        {items?.title?.en}
                                      </h2>
                                      <ul className="menu-list" style={{ marginTop: 0, }}>
                                        {items?.linked_parent?.map(
                                          (cat, index) => (
                                            <a
                                              href={`/products?id=${cat}`}
                                            >
                                              <li key={index}>
                                                <span className="menu-item-text">
                                                  {fetchCategoryById(parseInt(cat))}
                                                </span>
                                              </li>
                                            </a>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </li>
                        <li className="level-0 menu-item menu-item-has-children mega-menu level-menu-fullwidth" key='4'>
                          <a href={`/products`}>
                            <span className="menu-item-text">{t('Header.Products')}</span>
                          </a>
                          <div className="sub-menu">
                            <div className="row">
                              {categories?.map((category) => (
                                <div className="col-md-4">
                                  <div className="menu-section">
                                    <a
                                      href={`/products?category=${category.title?.en}&id=${category.id}`}
                                    >
                                      <h2 className="sub-menu-title">
                                        {category?.title?.en}
                                      </h2>
                                    </a>
                                    <ul className="menu-list">
                                      {category?.subcategory?.map(
                                        (subCategory) => (
                                          <Link
                                            to={{
                                              pathname: "/products",
                                              // search: `?category=${subCategory.title.en}&id=${subCategory.id}`,
                                            }}
                                          >
                                            <li>
                                              <span className="menu-item-text">
                                                {subCategory?.title?.en}
                                              </span>
                                            </li>
                                          </Link>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </li>




                        <li className="level-0 menu-item" key='5'>
                          <Link to="/contact">
                            <span className="menu-item-text">{t('Header.Contact')}</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 text-center header-center">
                  <div className="site-logo">
                    <Link to="/">
                      <img
                        width={400}
                        height={79}
                        src={logo}
                        alt="cema – Furniture HTML Theme"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 header-right">
                  <div className="header-page-link">
                    {/* Login */}
                    <div className="login-header">
                      {LOGGEDIN ? (
                        <Link to="/account"> {t('Header.Account')}</Link>
                      ) : (
                        <Link className="active-login" to="/login">
                          {t('Header.Login')}
                        </Link>
                      )}

                    </div>

                    <div className="wishlist-box">
                      <Link to="/wishlist">
                        <i className="ti-heart" />
                      </Link>
                      <span className="count-wishlist">{wishListCount}</span>
                    </div>
                    {/* Cart */}
                    <div className="cema-topcart dropdown light">
                      <div className="dropdown mini-cart top-cart">
                        <div className="remove-cart-shadow" />
                        <Link
                          className="dropdown-toggle cart-icon"
                          to="/cart"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div className="icons-cart">
                            <i className="ti-bag" />
                            <span className="cart-count">{cartItemsCount}</span>
                          </div>
                        </Link>
                        {/* <div className="dropdown-menu cart-popup">
                          <div className="cart-empty-wrap">
                            <ul className="cart-list">
                              <li className="empty">
                                <span>No products in the cart.</span>
                                <a className="go-shop" href="javascript:;">
                                  GO TO SHOP
                                  <i
                                    aria-hidden="true"
                                    className="arrow_right"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="cart-list-wrap">
                            <ul className="cart-list">
                              <li className="mini-cart-item">
                                <a
                                  href="#"
                                  className="remove"
                                  title="Remove this item"
                                >
                                  <i className="icon_close" />
                                </a>
                                <a href="#" className="product-image">
                                  <img
                                    width={600}
                                    height={600}
                                    src={product_3}
                                    alt
                                  />
                                </a>
                                <a href="#" className="product-name">
                                  Chair Oak Matt Lacquered
                                </a>
                                <div className="quantity">Qty: 1</div>
                                <div className="price">KD150.00</div>
                              </li>
                              <li className="mini-cart-item">
                                <a
                                  href="#"
                                  className="remove"
                                  title="Remove this item"
                                >
                                  <i className="icon_close" />
                                </a>
                                <a href="#" className="product-image">
                                  <img
                                    width={600}
                                    height={600}
                                    src={product_1}
                                    alt
                                  />
                                </a>
                                <a href="#" className="product-name">
                                  Zunkel Schwarz
                                </a>
                                <div className="quantity">Qty: 1</div>
                                <div className="price">KD100.00</div>
                              </li>
                            </ul>
                            <div className="total-cart">
                              <div className="title-total">Total:</div>
                              <div className="total-price">
                                <span>KD100.00</span>
                              </div>
                            </div>
                            <div className="free-ship">
                              <div className="title-ship">
                                Buy <strong>KD400</strong> more to enjoy{" "}
                                <strong>FREE Shipping</strong>
                              </div>
                            </div>
                            <div className="buttons">
                              <a
                                href="shop-cart.html"
                                className="button btn view-cart btn-primary"
                              >
                                View cart
                              </a>
                              <a
                                href="shop-checkout.html"
                                className="button btn checkout btn-default"
                              >
                                Check out
                              </a>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

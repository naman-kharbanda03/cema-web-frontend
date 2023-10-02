import React, { useEffect, useState } from "react";
import logo from "../../asset/images/logo.png";
import product_1 from "../../asset/images/product/1.jpg";
import product_3 from "../../asset/images/product/3.jpg";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const handleNavigate = (name, link) => {
    navigate(`/listings?products=${link}`, { state: { name } });
  };

  const [categories, setCategories] = useState();
  console.log("testing3", categories);

  const fetchDetails = () => {
    fetch("https://cema-backend.plasium.com/api/navCategories", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log("testing", data.data);
        setCategories(data.data);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <header id="site-header" className="site-header header-v2 large-height">
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
                    {/* <div className="language has-n-select d-inline-block">
                      <select name="language" id="language">
                        <option value="english">English</option>
                        <option value="arabic">Arabic</option>
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-6 topbar-right">
                  <ul id="topbar-menu" className="menu">
                    {/* <li>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Delivery Location"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <span className="input-group-text" id="basic-addon2">
                          <i className="fa-solid fa-magnifying-glass" />
                        </span>
                      </div>
                    </li> */}
                    {/* <li className="menu-item">
                      <a href="#">Gift Cards</a>
                    </li> */}
                    {/* <li className="menu-item">
                      <a href="#">FAQs</a>
                    </li> */}
                    <li className="menu-item">
                      <Link to="/contact">Contact</Link>
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
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                <div className="navbar-header">
                  <button
                    type="button"
                    id="show-megamenu"
                    className="navbar-toggle"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
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
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                <div className="cema-topcart dropdown">
                  <div className="dropdown mini-cart top-cart">
                    <div className="remove-cart-shadow" />
                    <a
                      className="dropdown-toggle cart-icon"
                      href="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div className="icons-cart">
                        <i className="icon-large-paper-bag" />
                        <span className="cart-count">2</span>
                      </div>
                    </a>
                    <div className="dropdown-menu cart-popup">
                      <div className="cart-empty-wrap">
                        <ul className="cart-list">
                          <li className="empty">
                            <span>No products in the cart.</span>
                            <a className="go-shop" href="javascript:;">
                              GO TO SHOP
                              <i aria-hidden="true" className="arrow_right" />
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
                          <div className="total-percent">
                            <div className="percent" style={{ width: "20%" }} />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-mobile-fixed">
          {/* Shop */}
          <div className="shop-page">
            <a href="javascript:;">
              <i className="wpb-icon-shop" />
            </a>
          </div>
          {/* Login */}
          <div className="my-account">
            <div className="login-header">
              <a href="page-my-account.html">
                <i className="wpb-icon-user" />
              </a>
            </div>
          </div>
          {/* Search */}
          <div className="search-box">
            <div className="search-toggle">
              <i className="wpb-icon-magnifying-glass" />
            </div>
          </div>
          {/* Wishlist */}
          <div className="wishlist-box">
            <a href="#">
              <i className="wpb-icon-heart" />
            </a>
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
                          onClick={() =>
                            handleNavigate("New Arrivals", "new_arrival")
                          }
                        >
                          <Link to="">
                            <span className="menu-item-text">New Arrivals</span>
                          </Link>
                        </li>
                        <li
                          className="level-0 menu-item"
                          onClick={() =>
                            handleNavigate("Best Sellers", "best_sellers")
                          }
                        >
                          <Link to="">
                            <span className="menu-item-text">Best Sellers</span>
                          </Link>
                        </li>
                        <li className="level-0 menu-item menu-item-has-children mega-menu mega-menu-fullwidth">
                          <a href="javascript:;">
                            <Link to="/products">
                              <span className="menu-item-text">Products</span>
                            </Link>
                          </a>
                          <div className="sub-menu">
                            <div className="row">
                              {categories?.map((category) => (
                                <div className="col-md-4">
                                  <div className="menu-section">
                                    <Link
                                      to={{
                                        pathname: "/products",
                                        search: `?category=${category.title?.en}&id=${category.id}`,
                                      }}
                                    >
                                      <h2 className="sub-menu-title">
                                        {category?.title?.en}
                                      </h2>
                                    </Link>
                                    <ul className="menu-list">
                                      {category?.subcategory.map(
                                        (subCategory) => (
                                          <Link
                                            to={{
                                              pathname: "/products",
                                              search: `?category=${subCategory.title.en}&id=${subCategory.id}`,
                                            }}
                                          >
                                            <li>
                                              <a href="javascript:;">
                                                <span className="menu-item-text">
                                                  {subCategory?.title?.en}
                                                </span>
                                              </a>
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
                        <li className="level-0 menu-item">
                          <Link to="/contact">
                            <span className="menu-item-text">Contact</span>
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
                      {props.auth ? (
                        <Link to="/account"> My Account</Link>
                      ) : (
                        <Link className="active-login" to="/login">
                          Login
                        </Link>
                      )}

                      {/* <div className="form-login-register">
                        <div className="box-form-login">
                          <div className="active-login" />
                          <div className="box-content">
                            <div className="form-login active">
                              <form
                                id="login_ajax"
                                method="post"
                                className="login"
                              >
                                <h2>Sign in</h2>
                                <p className="status" />
                                <div className="content">
                                  <div className="username">
                                    <input
                                      type="text"
                                      required="required"
                                      className="input-text"
                                      name="username"
                                      id="username"
                                      placeholder="Your name"
                                    />
                                  </div>
                                  <div className="password">
                                    <input
                                      className="input-text"
                                      required="required"
                                      type="password"
                                      name="password"
                                      id="password"
                                      placeholder="Password"
                                    />
                                  </div>
                                  <div className="rememberme-lost">
                                    <div className="rememberme">
                                      <input
                                        name="rememberme"
                                        type="checkbox"
                                        id="rememberme"
                                        defaultValue="forever"
                                      />
                                      <label
                                        htmlFor="rememberme"
                                        className="inline"
                                      >
                                        Remember me
                                      </label>
                                    </div>
                                    <div className="lost_password">
                                      <a href="forgot-password.html">
                                        Lost your password?
                                      </a>
                                    </div>
                                  </div>
                                  <div className="button-login">
                                    <input
                                      type="submit"
                                      className="button"
                                      name="login"
                                      defaultValue="Login"
                                    />
                                  </div>
                                  <div className="button-next-reregister">
                                    Create An Account
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="form-register">
                              <form method="post" className="register">
                                <h2>REGISTER</h2>
                                <div className="content">
                                  <div className="email">
                                    <input
                                      type="email"
                                      className="input-text"
                                      placeholder="Email"
                                      name="email"
                                      id="reg_email"
                                      defaultValue
                                    />
                                  </div>
                                  <div className="password">
                                    <input
                                      type="password"
                                      className="input-text"
                                      placeholder="Password"
                                      name="password"
                                      id="reg_password"
                                    />
                                  </div>
                                  <div className="button-register">
                                    <input
                                      type="submit"
                                      className="button"
                                      name="register"
                                      defaultValue="Register"
                                    />
                                  </div>
                                  <div className="button-next-login">
                                    Already has an account
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    {/* Search */}
                    {/* <div className="search-box">
                      <div className="search-toggle">
                        <i className="ti-search" />
                      </div>
                    </div> */}
                    {/* Wishlist */}
                    <div className="wishlist-box">
                      <Link to="/wishlist">
                        <i className="ti-heart" />
                      </Link>
                      <span className="count-wishlist">1</span>
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
                            <span className="cart-count">2</span>
                          </div>
                        </Link>
                        <div className="dropdown-menu cart-popup">
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
                        </div>
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

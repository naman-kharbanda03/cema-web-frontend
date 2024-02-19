import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/page-tittle/PageTitle";
import WishListTable from "../../components/wishlist/WishListTable";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { UserData } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isAuthenticated, setIsAuthentcated] = useState(false);
  const { setCartToggle, setWishListToggle, AddToCart2, addToWishlist2, showInfoToastMessage } = useShoppingCart();
  const navigate = useNavigate();

  const { SETLOGGEDIN } = useContext(UserData);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (event, formType) => {
    const { name, value } = event.target;
    if (formType === "login") {
      setLoginData((prevLoginData) => ({
        ...prevLoginData,
        [name]: value,
      }));
    } else if (formType === "register") {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); // login logic is executed without causing the page to refresh when the form is submitted

    const formData = new FormData();
    formData.append("email", loginData.email);
    formData.append("password", loginData.password);

    const apiUrl = apiConfig.loginAPI;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Add any other headers your API requires
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ responseMessage: data.message }); // Handle the response data
        if (data.access_token) {

          localStorage.setItem("tokenType", data.token_type); // Store the token in localStorage
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("expiresIn", data.expires_in);
          localStorage.setItem("refreshToken", data.refresh_token);

          addLocalCartToDB();
          SETLOGGEDIN(true);
          // window.location.href = '/'

        } else if (data.status === "fail") showInfoToastMessage(data.msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const addLocalCartToDB = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    AddToCart2(cart);
    addToWishlist2(wishlist);

  };

  const handleRegister = function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", registerData.name);
    formData.append("email", registerData.email);
    formData.append("mobile", registerData.mobile);
    formData.append("password", registerData.password);

    const api = apiConfig.registerAPI;
    fetch(api, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Add any other headers your API requires
      },
      // body: JSON.stringify(registerData), // Convert the data to JSON format
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.accessToken) {
          // localStorage.setItem("tokenType", data.token_type); // Store the token in localStorage
          localStorage.setItem("accessToken", data.accessToken);
          // localStorage.setItem("expiresIn", data.expires_in);
          // localStorage.setItem("refreshToken", data.refresh_token);
          // props.auth(true);

          addLocalCartToDB();
          SETLOGGEDIN(true);

        } else if (data.status === "fail") showInfoToastMessage(data.msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const { t } = useTranslation();

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* page info */}
            <PageTitle current={t("Login.Login")} />
            {/* form */}
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="page-login-register">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 sm-m-b-50">
                        <div className="box-form-login">
                          <h2>{t('Login.Login')}</h2>
                          < div className="box-content" >
                            <div className="form-login">
                              <form method="post" className="login">
                                <div className="email">
                                  <label>
                                    {t('Login.E-mail address')}{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="email"
                                    id="email"
                                    onChange={(e) => handleChange(e, "login")}
                                  />
                                </div>
                                <div className="password">
                                  <label htmlFor="password">
                                    {t('Login.Password')} <span className="required">*</span>
                                  </label>
                                  <input
                                    className="input-text"
                                    type="password"
                                    name="password"
                                    onChange={(e) => handleChange(e, "login")}
                                  />
                                </div>
                                <div className="rememberme-lost">
                                  {/* <div className="remember-me">
                                    <input
                                      name="rememberme"
                                      type="checkbox"
                                      defaultValue="forever"
                                    />
                                    <label className="inline">
                                      Remember me
                                    </label>
                                  </div> */}
                                  <div className="lost-password">
                                    <Link to="/forgot-password">
                                      {t('Login.Lost your password?')}
                                    </Link>
                                  </div>
                                </div>
                                <div className="button-login">
                                  <button
                                    type="submit"
                                    className="button"
                                    name="login"
                                    style={{ backgroundColor: 'black', color: 'white', textTransform: 'uppercase', letterSpacing: '0.010416667in', fontWeight: '500', height: '3.4375pc', width: '100%', fontSize: '9.75pt' }}
                                    defaultValue="Login"
                                    onClick={(e) => handleLogin(e)}
                                  >{t('Login.Submit')}</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="box-form-login">
                          <h2 className="register">{t('Login.Register')}</h2>
                          <div className="box-content">
                            <div className="form-register">
                              <form method="post" className="register">
                                <div className="name">
                                  <label>
                                    {t('Login.Name')} <span className="required">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="name"
                                    onChange={(e) =>
                                      handleChange(e, "register")
                                    }
                                  />
                                </div>
                                <br />
                                <div className="mobile-phone">
                                  <label>
                                    {t('Login.Mobile Number')}{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="input-text"
                                    name="mobile"
                                    onChange={(e) =>
                                      handleChange(e, "register")
                                    }
                                  />
                                </div>
                                <br />
                                <div className="email">
                                  <label>
                                    {t('Login.Email address')}{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="input-text"
                                    name="email"
                                    onChange={(e) =>
                                      handleChange(e, "register")
                                    }
                                  />
                                </div>
                                <div className="password">
                                  <label>
                                    {t('Login.Password')} <span className="required">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="input-text"
                                    name="password"
                                    onChange={(e) =>
                                      handleChange(e, "register")
                                    }
                                  />
                                </div>
                                <div className="button-register">
                                  <button
                                    type="submit"
                                    style={{ backgroundColor: 'black', color: 'white', textTransform: 'uppercase', letterSpacing: '0.010416667in', fontWeight: '500', height: '3.4375pc', width: '100%', fontSize: '9.75pt' }}
                                    className="button"
                                    name="register"
                                    defaultValue="Register"
                                    onClick={(e) => handleRegister(e)}
                                  >{t('Login.Submit')}</button>
                                </div>
                              </form>
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
      </div >
    </>
  );
};

export default Login;

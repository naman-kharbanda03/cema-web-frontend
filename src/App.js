import BackToTop from "./components/back-to-top/BackToTop";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Contact from "./pages/contact/Contact";
import Cart from "./pages/cart/Cart";
import Listing from "./pages/listing/Listing";
import MyAccount from "./pages/my-account/MyAccount";
import ProductList from "./pages/product-list/ProductList";
import ShopCheckout from "./pages/shop-checkout/ShopCheckout";
import ShopWishlist from "./pages/shop-wishlist/ShopWishlist";
import ShopDetails from "./pages/shop-details/ShopDetails";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Error from "./pages/error/Error";
import { useEffect, useState } from "react";
import CreateEditAddress from "./pages/createEditAddress/CreateEditAddress";
import { UserContextWrapper } from "./context/UserContext";
import HiddenPostLogin from "./routeHandlers/HiddenPostLogin/HiddenPostLogin";
import Protected from "./routeHandlers/AvailabePostLogin/Projected";
import CookieBanner from "./components/CookieBanner/cookie";
import CookieConsent from "react-cookie-consent";
import PreLoader from "./components/pre-loader/PreLoader";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => console.log(isLoggedIn), [isLoggedIn]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  });
  return (
    <div
      id="page"
      className="min-vh-100 d-flex flex-column border-danger hfeed page-wrapper"
    >
      <UserContextWrapper>
        <ShoppingCartProvider>
          <Header />
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* login */}
            <Route
              path="/login"
              element={
                <HiddenPostLogin>
                  <Login />
                </HiddenPostLogin>
              }
            />
            {/* forgot-password */}
            <Route
              path="/forgot-password"
              element={
                <HiddenPostLogin>
                  <ForgotPassword />
                </HiddenPostLogin>
              }
            />
            {/* cart */}
            <Route path="/cart" element={<Cart />} />

            {/* contact */}
            <Route path="/contact" element={<Contact />} />

            {/* listings */}
            <Route path="/listings" element={<Listing />} />

            {/* account */}
            <Route
              path="/account"
              element={
                <Protected>
                  <MyAccount />
                </Protected>
              }
            />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/shop-checkout"
              element={
                <Protected>
                  <ShopCheckout />
                </Protected>
              }
            />
            <Route path="/wishlist" element={<ShopWishlist />} />
            <Route path="/product-details" element={<ShopDetails />} />
            <Route path="/edit-address" element={<CreateEditAddress />} />
          </Routes>
          {loading === true ? "" : <PreLoader />}
          <CookieConsent
            location="bottom"
            buttonText="I understand"
            cookieName="myCookieConsent"
            style={{ background: "#333" }}
            buttonStyle={{ background: "#007BFF" }}
          >
            This website uses cookies to ensure you get the best experience on
            our website.
          </CookieConsent>
          <Footer />
          {/* <PreLoader /> */}
          {/* <BackToTop /> */}
        </ShoppingCartProvider>
      </UserContextWrapper>
    </div>
  );
}

export default App;

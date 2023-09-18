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

function App() {
  return (
    <div
      id="page"
      className="min-vh-100 d-flex flex-column border-danger hfeed page-wrapper"
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/shop-checkout" element={<ShopCheckout />} />
        <Route path="/shop-wishlist" element={<ShopWishlist />} />
      </Routes>
      <Footer />

      <BackToTop />
    </div>
  );
}

export default App;

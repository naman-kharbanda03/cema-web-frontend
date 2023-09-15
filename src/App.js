import BackToTop from "./components/back-to-top/BackToTop";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Contact from "./pages/contact/Contact";
import Cart from "./pages/cart/Cart";

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
      </Routes>
      <Footer />

      <BackToTop />
    </div>
  );
}

export default App;

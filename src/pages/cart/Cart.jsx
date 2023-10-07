import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import CartProduct from "../../components/cart-product/CartProduct";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [orders, setOrders] = useState();
  const [total, setTotal] = useState();
  const [qtyChanged, setQtyChanged] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [isCouponSuccess, setCoupanSuccess] = useState(false);
  const [couponData, setCouponData] = useState();
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    setCoupanSuccess(false);
  };
  const showInfoToastMessage = () => {
    toast.info("Invalid Coupon code !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  console.log("tikku", couponCode);

  const setQtyChange = (qty) => setQtyChanged(qty);
  console.log("qtyChanged", qtyChanged);

  const applyCoupon = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      code: couponCode,
      currency: "INR",
    };
    fetch("https://cema-backend.plasium.com/api/apply-coupan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("status", result?.["status"]);
        result.status == "fail" && showInfoToastMessage();
        if (result.status == "success") {
          showSuccessToastMessage(result?.msg);
          setCoupanSuccess(true);
          setCouponData(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  function getCartDetails() {
    const bearerToken = localStorage.getItem("accessToken");
    console.log("bearerToken", orders);

    fetch("https://cema-backend.plasium.com/api/getCartData", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("getCartData:", data.total);
        setTotal(data.total);
        setOrders(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  useEffect(() => {
    getCartDetails();
  }, [qtyChanged]);

  return (
    <div>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* Page Info */}
            <PageTitle current={"Shopping Cart"} />

            {/* page body */}
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  {orders?.length ? (
                    <div className="shop-cart">
                      <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                          <form className="cart-form" action method="post">
                            <div className="table-responsive">
                              <table
                                className="cart-items table"
                                cellSpacing={0}
                              >
                                <thead>
                                  <tr>
                                    <th className="product-thumbnail">
                                      Product
                                    </th>
                                    <th className="product-price">Price</th>
                                    <th className="product-quantity">
                                      Quantity
                                    </th>
                                    <th className="product-subtotal">
                                      Subtotal
                                    </th>
                                    <th className="product-remove">&nbsp;</th>
                                  </tr>
                                </thead>
                                {orders?.map((order) => (
                                  <tbody>
                                    <CartProduct
                                      orderQtyChanged={setQtyChange}
                                      ordersData={order}
                                    />
                                  </tbody>
                                ))}

                                <tfoot>
                                  <tr>
                                    <td
                                      colSpan={6}
                                      className="actions"
                                      style={{ borderTopWidth: "0px" }}
                                    >
                                      <div className="bottom-cart">
                                        <div className="coupon">
                                          <input
                                            type="text"
                                            name="coupon_code"
                                            className="input-text"
                                            id="coupon-code"
                                            placeholder="Coupon code"
                                            value={couponCode}
                                            onChange={handleCouponCodeChange}
                                          />
                                          <div
                                            type="submit"
                                            name="apply_coupon"
                                            className="button"
                                            value="Apply coupon"
                                            onClick={applyCoupon}
                                          >
                                            {isCouponSuccess
                                              ? "Applied"
                                              : "Apply coupon"}
                                          </div>
                                        </div>
                                        {/* <h2>
                                      <a href="shop-grid-left.html">
                                        Continue Shopping
                                      </a>
                                    </h2> */}
                                        <Link to={"/products"}>
                                          <div
                                            type="submit"
                                            name="update_cart"
                                            className="button"
                                            value="Update cart"
                                          >
                                            Continue Shopping
                                          </div>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12 col-12">
                          <div className="cart-totals">
                            <h2>Cart totals</h2>
                            <div>
                              <div className="cart-subtotal">
                                <div className="title">Subtotal</div>
                                <div>
                                  <span>KD{couponData?.subtotal || total}</span>
                                </div>
                              </div>

                              {isCouponSuccess && (
                                <div className="cart-subtotal">
                                  <div className="title">Discount</div>
                                  <div>
                                    <span>KD{couponData?.coupan_discount}</span>
                                  </div>
                                </div>
                              )}
                              <div className="shipping-totals">
                                <div className="title">Shipping</div>
                                <div>
                                  {/* <ul className="shipping-methods custom-radio">
                                  <li>
                                    <input
                                      type="radio"
                                      name="shipping_method"
                                      data-index={0}
                                      defaultValue="free_shipping"
                                      className="shipping_method"
                                      defaultChecked="checked"
                                    />
                                    <label>Free shipping</label>
                                  </li>
                                  <li>
                                    <input
                                      type="radio"
                                      name="shipping_method"
                                      data-index={0}
                                      defaultValue="flat_rate"
                                      className="shipping_method"
                                    />
                                    <label>Flat rate</label>
                                  </li>
                                </ul> */}
                                  <p className="shipping-desc">
                                    Shipping options will be updated during
                                    checkout.
                                  </p>
                                </div>
                              </div>
                              <div className="order-total">
                                <div className="title">Total</div>
                                <div>
                                  <span>KD{total}</span>
                                </div>
                              </div>
                            </div>
                            <div className="proceed-to-checkout">
                              <Link to="/shop-checkout">
                                <div
                                  href="shop-checkout.html"
                                  className="checkout-button button"
                                >
                                  Proceed to checkout
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="shop-cart-empty">
                      <div className="notices-wrapper">
                        <p className="cart-empty">
                          Your cart is currently empty.
                        </p>
                      </div>
                      <Link to={'/products'}>
                      <div className="return-to-shop">
                        <a className="button" >
                          Return to shop
                        </a>
                      </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;

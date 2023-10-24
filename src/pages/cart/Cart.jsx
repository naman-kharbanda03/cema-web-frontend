import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import CartProduct from "../../components/cart-product/CartProduct";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from "../../config/apiConfig";

const Cart = () => {
  const [orderData, setOrderData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState();
  const [qtyChanged, setQtyChanged] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [isCouponSuccess, setCoupanSuccess] = useState(false);
  const [couponData, setCouponData] = useState();
  const { cartItemsCount, cartData } = useShoppingCart();

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


  const setQtyChange = (qty) => setQtyChanged(qty);

  const applyCoupon = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      code: couponCode,
      currency: "INR",
    };
    const apiUrl = apiConfig.applyCouponAPI;
    fetch(apiUrl, {
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
    const apiUrl = apiConfig.getCartDataAPI;

    if (bearerToken) {
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          // Add other headers as needed
        },
      }).then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      }).then((datar) => {
        console.log("Cart Data", datar);
        setOrderData(datar);
        setTotal(datar?.total);
        let order = {};
        setOrders([]);
        datar.data?.forEach(order => {
          if (order.simple_product) {
            order = {
              product_name: { en: order.simple_product.product_name.en },
              price: order.simple_product.actual_selling_price,
              product_id: order.simple_product.id,
              product_image: order.simple_product.product_image[0],
              image_path: order.simple_product.image_path,
              qty: order.qty,
              stock: order.simple_product.stock,
              cart_id: order.id,
              link: `/product-details?product_id=${order?.simple_product?.id}`
            };
            setOrders(prev => ([...prev, order]));

          } else {
            order = {
              product_name: { en: order.product.name.en },
              price: parseInt(order.price_total) + parseInt(order.product.price),
              product_id: order.pro_id,
              product_image: order.variant.variantimages.main_image,
              image_path: order.product.image_path,
              qty: order.qty,
              stock: order?.product?.stock,
              variant_id: order.variant_id,
              cart_id: order.id,
              link: `/product-details?product_id=${order?.pro_id}&variant_id=${order?.variant_id}`
            }
            setOrders(prev => ([...prev, order]));
          }
        })
        return datar;

      }).catch((error) => console.error("Problem with fetch", error));

    } else {
      const orders = JSON.parse(localStorage.getItem('cart'));
      setOrders(orders?.Items);
      setTotal(() => {
        return orders?.Items.reduce((acc, item) => {
          return acc + (item.qty * item.price);
        }, 0);

      })
    }
  }
  useEffect(() => {
    getCartDetails();
  }, [cartItemsCount]);

  useEffect(() => {
    getCartDetails();
  }, [qtyChanged]);

  // useEffect(() => {
  //   let order = {};
  //   setOrders([]);
  //   orderData?.forEach(order => {
  //     if (order.simple_product) {
  //       order = {
  //         product_name: { en: order.simple_product.product_name.en },
  //         price: order.simple_product.actual_selling_price,
  //         product_id: order.simple_product.id,
  //         product_image: order.simple_product.product_image[0],
  //         image_path: order.simple_product.image_path,
  //         qty: order.qty,
  //         stock: order.simple_product.stock,
  //         cart_id: order.id,
  //         link: `/product-details?product_id=${order?.simple_product?.id}`
  //       };
  //       setOrders(prev => ([...prev, order]));

  //     } else {
  //       order = {
  //         product_name: { en: order.product.name.en },
  //         price: parseInt(order.price_total) + parseInt(order.product.price),
  //         product_id: order.pro_id,
  //         product_image: order.variant.variantimages.main_image,
  //         image_path: order.product.image_path,
  //         qty: order.qty,
  //         stock: order?.product?.stock,
  //         variant_id: order.variant_id,
  //         cart_id: order.id,
  //         link: `/product-details?product_id=${order?.pro_id}&variant_id=${order?.variant_id}`
  //       }
  //       setOrders(prev => ([...prev, order]));
  //     }
  //   })
  // }, [orderData])

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
                                  <span>KD {couponData?.subtotal || total}</span>
                                </div>
                              </div>

                              {isCouponSuccess && (
                                <div className="cart-subtotal">
                                  <div className="title">Discount</div>
                                  <div>
                                    <span>-KD{couponData?.coupan_discount}</span>
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
                                  <span>KD {total}</span>
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

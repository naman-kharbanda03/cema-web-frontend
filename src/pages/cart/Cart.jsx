import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import CartProduct from "../../components/cart-product/CartProduct";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from "../../config/apiConfig";
import { data } from "jquery";

const Cart = () => {
  const [orderData, setOrderData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState();
  const [qtyChanged, setQtyChanged] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [isCouponSuccess, setCoupanSuccess] = useState(false);
  const [couponData, setCouponData] = useState();
  const { cartItemsCount, cartItems, setCartItemsCount } = useShoppingCart();
  const [cost, setCost] = useState({});

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    setCoupanSuccess(false);
  };
  const showInfoToastMessage = (msg) => {
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };


  const setQtyChange = (qty) => setQtyChanged(qty);

  const applyCoupon = async () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      code: couponCode,
      currency: "INR",
    };
    const apiUrl = apiConfig.applyCouponAPI;
    return fetch(apiUrl, {
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
        result.status === "fail" && showInfoToastMessage();
        if (result.status === "success") {
          showSuccessToastMessage(result?.msg);
          getCartDetails();
          setCoupanSuccess(true);
        }
      })
      .catch((error) => console.log("error", error));
  };
  async function removeCoupan() {
    const bearerToken = localStorage.getItem('accessToken');
    const formdata = {
      coupan_id: couponData.id,
      currency: 'KD'
    };
    console.log(formdata);
    return fetch(apiConfig.removeCoupanAPI, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata)
    }).then(response => {
      if (!response.ok) throw new Error('Network Error');
      return response.json();
    }).then(data => {
      console.log(data);
      if (data.status === 'success') {
        showSuccessToastMessage(data.msg);
        getCartDetails();
      }
      else {
        console.log(data.msg)
        showInfoToastMessage(data.msg);
      }
    }).catch(error => {
      console.error('Network Issue', error);
    })
  }

  function applyRemoveCoupon() {
    if (couponData !== null) return removeCoupan();
    return applyCoupon();
  }



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
        // console.log("Cart Data", datar);
        setCost({
          total: datar?.grand_total,
          subtotal: datar?.total,
          shipping: datar?.shipping_charge,
          tax: datar?.total_tax_amount,
          discount: datar?.discount_amount,
        })
        setCouponData(datar.coupon_detail);
        setCartItemsCount(parseInt(datar?.count_product));
        let order = {};
        setOrders([]);
        datar.data?.forEach(order => {
          if (order.simple_product) {
            order = {
              product_name: { en: order?.simple_product?.product_name?.en },
              variant_id: null,
              price: order?.simple_product?.offer_price === null ? order?.simple_product.price : order?.simple_product?.offer_price,
              product_id: order?.simple_product?.id,
              product_image: order?.simple_product.product_image[0],
              image_path: order?.simple_product.image_path,
              qty: order?.qty,
              stock: order?.simple_product.stock,
              cart_id: order?.id,
              link: `/product-details?product_id=${order?.simple_product?.id}`,
              max_order_limit: order?.simple_product.max_order_qty,
            };
            setOrders(prev => ([...prev, order]));

          } else {
            order = {
              product_name: { en: order?.product?.name?.en },
              // variant_id: order?.variant?.id,
              price: order?.variant?.offer ? order.variant.offer : order.variant.price,
              product_id: order?.pro_id,
              product_image: order?.variant?.variantimages?.main_image,
              image_path: order?.product?.image_path,
              qty: order?.qty,
              stock: order?.product?.stock,
              variant_id: order?.variant_id,
              cart_id: order?.id,
              link: `/product-details?product_id=${order?.pro_id}&variant_id=${order?.variant_id}`,
              max_order_limit: order?.variant?.max_order_qty,
            }
            setOrders(prev => ([...prev, order]));
          }
        })
        return datar;

      }).catch((error) => console.error("Problem with fetch", error));

    }
    else {
      // console.log(2);
      const orders = JSON.parse(localStorage.getItem('cart'));
      setOrders(orders?.Items);
      setCost((prev) => {
        const subtotal = orders?.Items.reduce((acc, item) => {
          return acc + (item.qty * item.price);
        }, 0);
        return {
          ...prev,
          subtotal: subtotal
        }
      })
    }
  }


  useEffect(() => {
    console.log(cartItems);
    getCartDetails();
  }, [cartItems]);
  // useEffect(() => {
  //   console.log(cartItems);
  //   getCartDetails();
  // }, []);



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
                                      ordersData={order}
                                      getCartDetails={getCartDetails}
                                      coupanData={couponData}
                                      removeCoupon={removeCoupan}
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
                                        {localStorage.getItem('accessToken') && (
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
                                              onClick={() => applyRemoveCoupon()}
                                            >
                                              {couponData === null
                                                ? "Apply coupon"
                                                : "Remove Coupan"}
                                            </div>
                                          </div>
                                        )}

                                        <a href={"/products"}>
                                          <div
                                            type="submit"
                                            name="update_cart"
                                            className="button"
                                            value="Update cart"
                                          >
                                            Continue Shopping
                                          </div>
                                        </a>
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
                                  <span>KD {Math.round((cost?.subtotal) * 100) / 100}</span>
                                </div>
                              </div>


                              {/* <div className="order-total">
                                <div className="title">Shipping Charge</div>
                                <div>
                                  <span>KD {Math.round(cost?.shipping * 100) / 100}</span>
                                </div>
                              </div> */}
                              {localStorage.getItem('accessToken') ?
                                (
                                  <div className="order-total">
                                    <div className="title">Shipping Charge</div>
                                    <div>
                                      <span>KD {Math.round(cost?.shipping * 100) / 100}</span>
                                    </div>
                                  </div>

                                )
                                :
                                ''}

                              {cost.discount > 0 && (
                                <div className="cart-subtotal">
                                  <div className="title">Discount</div>
                                  <div>
                                    <span>-KD {Math.round(cost?.discount * 100) / 100}</span>
                                  </div>
                                </div>
                              )}
                              {localStorage.getItem('accessToken') && (
                                <div className="order-total">
                                  <div className="title">Total</div>
                                  <div>
                                    <span>KD {Math.round(cost?.total * 100) / 100}</span>
                                  </div>
                                </div>
                              )}

                            </div>
                            <div className="proceed-to-checkout">
                              <Link to="/shop-checkout">
                                <div
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
                      <div className="return-to-shop">
                        <a className="button" href='/products' >
                          Return to shop
                        </a>
                      </div>
                    </div>
                  )}
                  <br />
                  <br />
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

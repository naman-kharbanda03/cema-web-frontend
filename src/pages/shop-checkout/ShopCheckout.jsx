import React from "react";
import PageTitle from "../../components/page-tittle/PageTitle";

const ShopCheckout = () => {
  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">

          {/* Page Title */}
          <PageTitle current={"Shop Checkout"} />

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="shop-checkout">
                  <form
                    name="checkout"
                    method="post"
                    className="checkout"
                    action=""
                    autocomplete="off"
                  >
                    <div className="row">
                      <div className="col-xl-8 col-lg-7 col-md-12 col-12">
                        <div className="customer-details">
                          <div className="billing-fields">
                            <h3>Billing details</h3>
                            <div className="billing-fields-wrapper">
                              <p className="form-row form-row-first validate-required">
                                <label>
                                  First name{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_first_name"
                                    value=""
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-last validate-required">
                                <label>
                                  Last name{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_last_name"
                                    value=""
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-wide">
                                <label>
                                  Company name{" "}
                                  <span className="optional">(optional)</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_company"
                                    value=""
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-wide validate-required validate-phone">
                                <label>
                                  Phone{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="tel"
                                    className="input-text"
                                    name="billing_phone"
                                    value=""
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-wide validate-required validate-email">
                                <label>
                                  Email address{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="email"
                                    className="input-text"
                                    name="billing_email"
                                    value=""
                                    autocomplete="off"
                                  />
                                </span>
                              </p>

                              <p className="form-row address-field validate-required form-row-wide">
                                <label>
                                  Street address{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_address_1"
                                    placeholder="House number and street name"
                                    value=""
                                  />
                                </span>
                              </p>
                              <p className="form-row address-field form-row-wide">
                                <label>
                                  Apartment, suite, unit, etc.&nbsp;
                                  <span className="optional">(optional)</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_address_2"
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    value=""
                                  />
                                </span>
                              </p>

                              <p className="form-row form-row-wide validate-required">
                                <label>
                                  Country / Region{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <select
                                    name="billing_country"
                                    className="country-select custom-select"
                                  >
                                    <option value="">
                                      Select a country / region…
                                    </option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AX">Åland Islands</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AS">American Samoa</option>
                                    <option value="AD">Andorra</option>
                                  </select>
                                </span>
                              </p>
                              <p className="form-row address-field validate-required validate-state form-row-wide">
                                <label>
                                  State / County{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <select
                                    name="billing_state"
                                    className="state-select custom-select"
                                  >
                                    <option value="">
                                      Select a state / county…
                                    </option>
                                    <option value="VN">Vinnytsia Oblast</option>
                                    <option value="VL">Volyn Oblast</option>
                                    <option value="DP">
                                      Dnipropetrovsk Oblast
                                    </option>
                                    <option value="DT">Donetsk Oblast</option>
                                    <option value="ZT">Zhytomyr Oblast</option>
                                  </select>
                                </span>
                              </p>
                              <p className="form-row address-field validate-required form-row-wide">
                                <label for="billing_city" className="">
                                  Town / City{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_city"
                                    value=""
                                  />
                                </span>
                              </p>

                              <p className="form-row address-field validate-required validate-postcode form-row-wide">
                                <label>
                                  Postcode / ZIP{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_postcode"
                                    value=""
                                  />
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="account-fields">
                            <p className="form-row form-row-wide">
                              <label className="checkbox">
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  name="createaccount"
                                  value="1"
                                />
                                <span>Create an account?</span>
                              </label>
                            </p>
                            <div className="create-account">
                              <p className="form-row validate-required">
                                <label>
                                  Create account password{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper password-input">
                                  <input
                                    type="password"
                                    className="input-text"
                                    name="account_password"
                                    value=""
                                    autocomplete="off"
                                  />
                                  <span className="show-password-input"></span>
                                </span>
                              </p>
                              <div className="clear"></div>
                            </div>
                          </div>
                        </div>
                        <div className="shipping-fields">
                          <p className="form-row form-row-wide ship-to-different-address">
                            <label className="checkbox">
                              <input
                                className="input-checkbox"
                                type="checkbox"
                                name="ship_to_different_address"
                                value="1"
                              />
                              <span>Ship to a different address?</span>
                            </label>
                          </p>
                          <div className="shipping-address">
                            <p className="form-row form-row-first validate-required">
                              <label>
                                First name{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_first_name"
                                  value=""
                                />
                              </span>
                            </p>
                            <p className="form-row form-row-last validate-required">
                              <label>
                                Last name{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_last_name"
                                  value=""
                                />
                              </span>
                            </p>
                            <p className="form-row form-row-wide">
                              <label>
                                Company name{" "}
                                <span className="optional">(optional)</span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_company"
                                  value=""
                                />
                              </span>
                            </p>

                            <p className="form-row address-field validate-required form-row-wide">
                              <label>
                                Street address{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_address_1"
                                  placeholder="House number and street name"
                                  value=""
                                />
                              </span>
                            </p>
                            <p className="form-row address-field form-row-wide">
                              <label>
                                Apartment, suite, unit, etc.{" "}
                                <span className="optional">(optional)</span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_address_2"
                                  placeholder="Apartment, suite, unit, etc. (optional)"
                                  value=""
                                />
                              </span>
                            </p>

                            <p className="form-row form-row-wide address-field validate-required">
                              <label for="shipping_country" className="">
                                Country / Region{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <select
                                  name="billing_state"
                                  className="state-select custom-select"
                                >
                                  <option value="">
                                    Select a country / region…
                                  </option>
                                  <option value="VN">Vinnytsia Oblast</option>
                                  <option value="VL">Volyn Oblast</option>
                                  <option value="DP">
                                    Dnipropetrovsk Oblast
                                  </option>
                                  <option value="DT">Donetsk Oblast</option>
                                  <option value="ZT">Zhytomyr Oblast</option>
                                </select>
                              </span>
                            </p>
                            <p className="form-row address-field validate-required form-row-wide">
                              <label>
                                Town / City{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_city"
                                  value=""
                                />
                              </span>
                            </p>

                            <p className="form-row address-field validate-required validate-state form-row-wide">
                              <label for="shipping_state" className="">
                                State / County{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <select
                                  name="billing_state"
                                  className="state-select custom-select"
                                >
                                  <option value="">
                                    Select a state / county…
                                  </option>
                                  <option value="VN">Vinnytsia Oblast</option>
                                  <option value="VL">Volyn Oblast</option>
                                  <option value="DP">
                                    Dnipropetrovsk Oblast
                                  </option>
                                  <option value="DT">Donetsk Oblast</option>
                                  <option value="ZT">Zhytomyr Oblast</option>
                                </select>
                              </span>
                            </p>

                            <p className="form-row address-field validate-required validate-postcode form-row-wide">
                              <label>
                                Postcode / ZIP{" "}
                                <span className="required" title="required">
                                  *
                                </span>
                              </label>
                              <span className="input-wrapper">
                                <input
                                  type="text"
                                  className="input-text"
                                  name="shipping_postcode"
                                  value=""
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="additional-fields">
                          <p className="form-row notes">
                            <label>
                              Order notes{" "}
                              <span className="optional">(optional)</span>
                            </label>
                            <span className="input-wrapper">
                              <textarea
                                name="order_comments"
                                className="input-text"
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                rows="2"
                                cols="5"
                              ></textarea>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                        <div className="checkout-review-order">
                          <div className="checkout-review-order-table">
                            <div className="review-order-title">Product</div>
                            <div className="cart-items">
                              <div className="cart-item">
                                <div className="info-product">
                                  <div className="product-thumbnail">
                                    <img
                                      width="600"
                                      height="600"
                                      src="media/product/3.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="product-name">
                                    Chair Oak Matt Lacquered
                                    <strong className="product-quantity">
                                      QTY : 2
                                    </strong>
                                  </div>
                                </div>
                                <div className="product-total">
                                  <span>KD300.00</span>
                                </div>
                              </div>
                              <div className="cart-item">
                                <div className="info-product">
                                  <div className="product-thumbnail">
                                    <img
                                      width="600"
                                      height="600"
                                      src="media/product/1.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="product-name">
                                    Zunkel Schwarz
                                    <strong className="product-quantity">
                                      QTY : 1
                                    </strong>
                                  </div>
                                </div>
                                <div className="product-total">
                                  <span>KD180.00</span>
                                </div>
                              </div>
                            </div>
                            <div className="cart-subtotal">
                              <h2>Subtotal</h2>
                              <div className="subtotal-price">
                                <span>KD480.00</span>
                              </div>
                            </div>
                            <div className="shipping-totals shipping">
                              <h2>Shipping</h2>
                              <div data-title="Shipping">
                                <ul className="shipping-methods custom-radio">
                                  <li>
                                    <input
                                      type="radio"
                                      name="shipping_method"
                                      data-index="0"
                                      value="free_shipping"
                                      className="shipping_method"
                                      checked="checked"
                                    />
                                    <label>Free shipping</label>
                                  </li>
                                  <li>
                                    <input
                                      type="radio"
                                      name="shipping_method"
                                      data-index="0"
                                      value="flat_rate"
                                      className="shipping_method"
                                    />
                                    <label>Flat rate</label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="order-total">
                              <h2>Total</h2>
                              <div className="total-price">
                                <strong>
                                  <span>KD480.00</span>
                                </strong>
                              </div>
                            </div>
                          </div>
                          <div id="payment" className="checkout-payment">
                            <ul className="payment-methods methods custom-radio">
                              <li className="payment-method">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  name="payment_method"
                                  value="bacs"
                                  checked="checked"
                                />
                                <label for="payment_method_bacs">
                                  Direct bank transfer
                                </label>
                                <div className="payment-box">
                                  <p>
                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order will not be
                                    shipped until the funds have cleared in our
                                    account.
                                  </p>
                                </div>
                              </li>
                              <li className="payment-method">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  name="payment_method"
                                  value="cheque"
                                />
                                <label>Check payments</label>
                                <div className="payment-box">
                                  <p>
                                    Please send a check to Store Name, Store
                                    Street, Store Town, Store State / County,
                                    Store Postcode.
                                  </p>
                                </div>
                              </li>
                              <li className="payment-method">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  name="payment_method"
                                  value="cod"
                                />
                                <label>Cash on delivery</label>
                                <div className="payment-box">
                                  <p>Pay with cash upon delivery.</p>
                                </div>
                              </li>
                              <li className="payment-method">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  name="payment_method"
                                  value="paypal"
                                />
                                <label>PayPal</label>
                                <div className="payment-box">
                                  <p>
                                    Pay via PayPal; you can pay with your credit
                                    card if you don’t have a PayPal account.
                                  </p>
                                </div>
                              </li>
                            </ul>
                            <div className="form-row place-order">
                              <div className="terms-and-conditions-wrapper">
                                <div className="privacy-policy-text"></div>
                              </div>
                              <button
                                type="submit"
                                className="button alt"
                                name="checkout_place_order"
                                value="Place order"
                              >
                                Place order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;

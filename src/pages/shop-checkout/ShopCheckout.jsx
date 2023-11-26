import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import apiConfig from "../../config/apiConfig";

const ShopCheckout = () => {
  const [orders, setOrders] = useState();
  const [total, setTotal] = useState();
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [stateOptions, setStateOptions] = useState();
  const [countriesOptions, setCountriesOptions] = useState();
  const [citiesOptions, setCitiesOptions] = useState({});
  const [datta, setDatta] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  // billing fields
  const { showSuccessToastMessage, showInfoToastMessage } = useShoppingCart();


  const [state, setState] = useState({});

  const handleChange = (e) => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === 'state') getCities(e.target.value, 'billing');
  }
  useEffect(() => console.log(state), [state]);

  const [shipState, setShipState] = useState({});

  const handlesChange = (e) => {
    setShipState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === 'state') getCities(e.target.value, 'shipping');
  }

  useEffect(() => {
    console.log('shipState', shipState, citiesOptions);
  }, [shipState, citiesOptions])



  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked; // Get the new value of the checkbox
    setShipToDifferentAddress(newValue); // Update the state
    setShipState(state);
  };

  const addOrUpdateBillingAddress = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      name: state?.name,
      address: state?.address1,
      email: state?.email,
      phone: state?.phone,
      type: state?.type || 'other',
      pincode: state?.postcode,
      country_id: '101',
      state_id: state?.state,
      city_id: state?.city,
      defaddress: "1",
    };
    const api = apiConfig.createBillingAddress;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 'success') {
          toast.success(result?.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          window.location.reload();
        } else {
          toast.warning("Please fill in all details", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }

      })
      .catch((error) => console.log("error", error));
  };

  const addOrUpdateAddress = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      name: shipState?.name,
      address: shipState?.address,
      email: shipState?.email,
      phone: shipState?.phone,
      type: "Other",
      pincode: shipState?.postcode,
      country_id: shipState?.country,
      state_id: shipState?.state,
      city_id: shipState?.city,
      defaddress: "1",
    };

    console.log("phirAur", formdata);
    fetch(apiConfig.createAddressAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          console.log(result);
          toast.success(result?.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          window.location.reload();
        } else if (result.status === false) {
          showInfoToastMessage('Fill all details');
        }

      })
      .catch((error) => console.log("error", error));
  };
  const navigate = useNavigate()

  const placeOrder = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    const bearerToken = localStorage.getItem("accessToken");

    if (orders.length === 0) {
      showInfoToastMessage('Please add products')
    } else if (!state.id) {
      showInfoToastMessage('Please add billing address')
    } else if (!shipState.id) {
      showInfoToastMessage('Please add shipping address')
    }
    else {
      const formdata = {
        grand_total: datta?.grand_total,
        billing_id: state?.id,
        shipping_id: shipState?.id,
      };
      fetch(apiConfig.checkoutAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(formdata),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            toast.success(result.message, {
              position: toast.POSITION.BOTTOM_LEFT,
            });
            setTimeout(() => {
              window.location.href = `/account?activeTab=orders&orderId=${"EODD" + result?.order_id}`;
              // navigate(`/account?activeTab=orders&orderId=${"EODD" + result?.order_id}`)
            }, 1000)
          } else {
            showInfoToastMessage(result.message)
          }

        })
        .catch((error) => console.log("error", error));
    }

  };

  function getCartDetails() {
    const bearerToken = localStorage.getItem("accessToken");
    console.log("bearerToken", orders);
    const api = apiConfig.getCartDataAPI;

    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("getCartData:", data.total);
          setTotal(data.total);
          setDatta(data);
          setOrders([]);
          data.data.forEach(product => {
            var prod = {};
            if (product.simple_product) {
              prod = {
                price: product.price_total,
                qty: product.qty,
                name: product.simple_product.product_name.en,
                image_path: product.simple_product.image_path,
                image: product.simple_product.product_image?.[0],
                link: `/product-details?product_id=${product.simple_product?.id}`,
              }
            } else if (product.product) {
              prod = {
                price: product.price_total,
                qty: product.qty,
                name: product.product.product_name.en,
                image_path: product.product.image_path,
                image: product.variant.variantimages.main_image,
                link: `/product-details?product_id=${product.product?.id}&variant_id=${product.variant.id}`,
              }
            }
            // console.log(prod);
            setOrders(prev => ([...prev, prod]));
          });
          // setOrders(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getBillingDetails() {
    const bearerToken = localStorage.getItem("accessToken");
    console.log("bearerToken", orders);

    const api = apiConfig.getBillingAdddress;
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("BillingDetails:", data);
        getCities(data?.address?.state?.id, 'billing');
        setState({
          id: data?.address?.id,
          name: data?.address.name,
          address1: data.address?.address,
          address2: data?.address?.address2 || '',
          phone: data.address?.mobile,
          country: data.address?.country?.id,
          state: data.address?.state.id,
          city: data.address?.city.id,
          postcode: data.address?.pincode,
          email: data.address?.email
        });
        // setAddressData(data?.address);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function getShippingDetails() {
    const bearerToken = localStorage.getItem("accessToken");
    console.log("bearerToken", orders);

    const api = apiConfig.getAddressAPI;
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ShippingDetails:", data);
        getCities(data?.address.state.id, 'shipping');
        setShipState({
          id: data?.address?.id,
          name: data?.address.name,
          address: data.address?.address,
          address2: data?.address?.address2 || '',
          phone: data.address?.phone,
          country: data.address?.country?.id,
          state: data.address?.state.id,
          city: data.address?.city.id,
          postcode: data.address?.pin_code,
          email: data.address?.email
        });
        // setAddressData(data?.address);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function getCountryStates() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiConfig.getCountryStateAPI,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setStateOptions(result?.states);
        // console.log("states", stateOptions);
      })
      .catch((error) => console.log("error", error));
  }

  function getCountries() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiConfig.getCountriesAPI,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("countries", result.countries);
        setCountriesOptions(result?.countries);
      })
      .catch((error) => console.log("error", error));
  }
  function getCities(id, type) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${apiConfig.getCitiesAPI}/${id}?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("city", result.cities);
        setCitiesOptions(prev => ({ ...prev, [type]: result?.cities }));
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => { console.log(citiesOptions) }, [citiesOptions])
  useEffect(() => {
    getCartDetails();
    getBillingDetails();
    getShippingDetails();
    getCountries();
    getCountryStates();
    // getCities();
  }, []);

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
                                  Full Name{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="name"
                                    value={state?.name}
                                    onChange={handleChange}
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
                                    name="phone"
                                    value={state?.phone}
                                    onChange={handleChange}
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
                                    name="email"
                                    value={state?.email}
                                    autocomplete="off"
                                    onChange={handleChange}
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
                                    name="address1"
                                    placeholder="House number and street name"
                                    value={state?.address1}
                                    onChange={handleChange}
                                  />
                                </span>
                              </p>
                              {/* <p className="form-row address-field form-row-wide">
                                <label>
                                  Apartment, suite, unit, etc.&nbsp;
                                  <span className="optional">(optional)</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="address_2"
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    value={state?.address2}
                                    onChange={handleChange}
                                  />
                                </span>
                              </p> */}
                              <p className="form-row form-row-wide validate-required">
                                <label>
                                  Country / Region{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <select
                                    name="country"
                                    className="country-select custom-select"
                                    value={state?.country} // Set the selected option based on state
                                    onChange={handleChange}
                                  >
                                    <option value="" key={0}> Select Country</option>
                                    {countriesOptions?.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
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
                                    name="state"
                                    className="state-select custom-select"
                                    value={state.state} // Set the selected option based on state
                                    onChange={handleChange} // Add an onChange event handler
                                  >
                                    <option value="" key={0}> Select State</option>
                                    {stateOptions?.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                  </select>
                                </span>
                              </p>
                              <p className="form-row address-field validate-required form-row-wide">
                                <label for="city" className="">
                                  Town / City{" "}
                                  <span className="required" title="required">
                                    *
                                  </span>
                                </label>
                                <span className="input-wrapper">
                                  <select
                                    name="city"
                                    className="country-select custom-select"
                                    value={state.city} // Set the selected option based on state
                                    onChange={handleChange}
                                  >
                                    <option value={''} key={0}>Select City</option>
                                    {citiesOptions?.billing?.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
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
                                    name="postcode"
                                    value={state.postcode}
                                    onChange={handleChange}
                                  />
                                </span>
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              background: "black",
                              color: "white",
                              display: "flex",
                              justifyContent: "center",
                              width: "140px",
                              cursor: "pointer",
                              marginBottom: "10px",
                            }}
                            onClick={addOrUpdateBillingAddress}
                          >
                            {state ? "Update Address" : "Add Address"}
                          </div>
                        </div>
                        <br />
                        <br />
                        <div className="customer-details">
                          <div className="billing-fields">
                            <p className="form-row form-row-wide ship-to-different-address">
                              <label className="checkbox">
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  name="ship_to_different_address"
                                  value="1"
                                  checked={shipToDifferentAddress} // Set the checkbox's checked state from the state
                                  onChange={handleCheckboxChange} // Add an onChange event handler
                                />
                                <span>Same as Billing Address</span>
                              </label>
                            </p>

                            {!shipToDifferentAddress && (
                              <>
                                <h3>Shipping details</h3>
                                <div className="billing-fields-wrapper">
                                  <p className="form-row form-row-first validate-required">
                                    <label>
                                      Full Name{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="name"
                                        value={shipState?.name}
                                        onChange={handlesChange}
                                      />
                                    </span>
                                  </p>
                                  {/* <p className="form-row form-row-last validate-required">
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
                                    value={"Amit Please send"}
                                  />
                                </span>
                              </p> */}
                                  {/* <p className="form-row form-row-wide">
                                <label>
                                  Company name{" "}
                                  <span className="optional">(optional)</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="billing_company"
                                    value={"Amit Please send"}
                                  />
                                </span>
                              </p> */}
                                  <p className="form-row form-row-wide validate-required validate-phone">
                                    <label>
                                      Phone{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="tel"
                                        className="input-text"
                                        name="phone"
                                        value={shipState?.phone}
                                        onChange={handlesChange}
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row form-row-wide validate-required validate-email">
                                    <label>
                                      Email address{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="email"
                                        className="input-text"
                                        name="email"
                                        value={shipState?.email}
                                        autocomplete="off"
                                        onChange={handlesChange}
                                      />
                                    </span>
                                  </p>

                                  <p className="form-row address-field validate-required form-row-wide">
                                    <label>
                                      Street address{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="address"
                                        placeholder="House number and street name"
                                        value={shipState?.address}
                                        onChange={handlesChange}
                                      />
                                    </span>
                                  </p>
                                  {/* <p className="form-row address-field form-row-wide">
                                    <label>
                                      Apartment, suite, unit, etc.&nbsp;
                                      <span className="optional">
                                        (optional)
                                      </span>
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
                                  </p> */}

                                  <p className="form-row form-row-wide validate-required">
                                    <label>
                                      Country / Region{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="country"
                                        className="country-select custom-select"
                                        value={shipState?.country} // Set the selected option based on state
                                        onChange={handlesChange}
                                      >
                                        <option value="" key={0}>Select Country</option>
                                        {countriesOptions?.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </select>
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required validate-state form-row-wide">
                                    <label>
                                      State / County{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="state"
                                        className="state-select custom-select"
                                        value={shipState?.state} // Set the selected option based on state
                                        onChange={handlesChange} // Add an onChange event handler
                                      >
                                        <option value="" key={0}>Select State</option>
                                        {stateOptions?.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </select>
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required form-row-wide">
                                    <label for="billing_city" className="">
                                      Town / City{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="city"
                                        className="country-select custom-select"
                                        value={shipState?.city} // Set the selected option based on state
                                        onChange={handlesChange}
                                      >
                                        <option value="" key={0}>Select City</option>
                                        {citiesOptions?.shipping?.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </select>
                                    </span>
                                  </p>

                                  <p className="form-row address-field validate-required validate-postcode form-row-wide">
                                    <label>
                                      Postcode / ZIP{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="postcode"
                                        value={shipState?.postcode}
                                        onChange={handlesChange}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div
                                  style={{
                                    background: "black",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "140px",
                                    cursor: "pointer",
                                    marginBottom: "10px",
                                  }}
                                  onClick={addOrUpdateAddress}
                                >
                                  {shipState ? 'Update Address' : 'Add Address'}
                                </div>
                              </>
                            )}


                          </div>
                        </div>
                        {/* <div className="additional-fields">
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
                        </div> */}
                      </div>
                      <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                        <div className="checkout-review-order">
                          <div className="checkout-review-order-table">
                            <div className="review-order-title">Products</div>
                            {orders?.map((order) => (
                              <div className="cart-items">
                                <div className="cart-item">
                                  <div className="info-product">
                                    <div className="product-thumbnail">
                                      <Link to={order.link}>
                                        <img
                                          width="600"
                                          height="600"
                                          src={`${order?.image_path}/${order?.image}`}
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                    <div className="product-name">
                                      <Link
                                        to={order.link}
                                      >
                                        {
                                          order?.name
                                        }
                                      </Link>
                                      <strong className="product-quantity">
                                        {"QTY: "}
                                        {parseInt(order?.qty)}
                                      </strong>
                                    </div>
                                  </div>
                                  <div className="product-total">
                                    <span>
                                      KD{" "}

                                      {
                                        order?.price
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="cart-subtotal">
                              <h2>Subtotal</h2>
                              <div className="subtotal-price">
                                <span>KD {total}</span>
                              </div>
                            </div>
                            <div className="cart-subtotal">
                              <h2>Discount</h2>
                              <div className="subtotal-price">
                                <span>KD {datta?.discount_amount}</span>
                              </div>
                            </div>
                            <div className="cart-subtotal">
                              <h2>Tax</h2>
                              <div className="subtotal-price">
                                <span>KD {datta?.total_tax_amount}</span>
                              </div>
                            </div>
                            <div className="order-total">
                              <h2>Total</h2>
                              <div className="total-price">
                                <strong>
                                  <span>KD {datta?.grand_total}</span>
                                </strong>
                              </div>
                            </div>
                          </div>
                          <div id="payment" className="checkout-payment">
                            <ul className="payment-methods methods custom-radio">
                              {/* <li className="payment-method">
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
                              </li> */}
                              <li className="payment-method">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  name="payment_method"
                                  value="cod"
                                  checked="checked"
                                />
                                <label>Cash on delivery</label>
                                <div className="payment-box">
                                  <p>Pay with cash upon delivery.</p>
                                </div>
                              </li>
                              {/* <li className="payment-method">
                                <input
                                 checked="checked"
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
                              </li> */}
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
                                onClick={(e) => placeOrder(e)}
                                disabled={buttonClicked}
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

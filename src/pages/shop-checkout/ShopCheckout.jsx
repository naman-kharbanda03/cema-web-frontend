import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import { Link } from "react-router-dom";

const ShopCheckout = () => {
  const [orders, setOrders] = useState();
  const [total, setTotal] = useState();
  const [billingData, setBillingData] = useState();
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [selectedStateOption, setSelectedStateOption] = useState();
  const [stateOptions, setStateOptions] = useState();
  const [countriesOptions, setCountriesOptions] = useState();
  const [selectedConutryCode, setSelectedCountryCode] = useState();
  const [citiesOptions, setCitiesOptions] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [datta, setDatta] = useState();
  // billing fields

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState();
  const [pincode, setPincode] = useState();
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [cityId, setCityId] = useState();
  const [defaultAddress, setDefaultAddress] = useState();

  const [sname, ssetName] = useState();
  const [saddress, ssetAddress] = useState();
  const [semail, ssetEmail] = useState();
  const [sphone, ssetPhone] = useState();
  const [stype, ssetType] = useState();
  const [spincode, ssetPincode] = useState();
  const [scountryId, ssetCountryId] = useState();
  const [sstateId, ssetStateId] = useState();
  const [scityId, ssetCityId] = useState();
  const [sdefaultAddress, ssetDefaultAddress] = useState();

  const setAddressData = (billingData) => {
    setName(billingData?.name);
    setAddress(billingData?.address);
    setEmail(billingData?.email);
    setPhone(billingData?.mobile);
    setType(billingData?.type);
    setPincode(billingData?.pincode);
    setCountryId(billingData?.country_id);
    setStateId(billingData?.state_id);
    setCityId(billingData?.city_id);
  };

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    console.log("checkName", newValue);
    setName(newValue);
  };
  const handleAddressChange = (e) => {
    const newValue = e.target.value;
    setAddress(newValue);
  };
  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
  };
  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    setPhone(newValue);
  };
  const handleTypeChange = (e) => {
    const newValue = e.target.value;
    setType(newValue);
  };
  const handlePincodeChange = (e) => {
    const newValue = e.target.value;
    setPincode(newValue);
  };
  //

  const handleStateSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedStateOption(newValue);
    setStateId(newValue);
  };

  const handleCountrySelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedCountryCode(newValue);
    setCountryId(newValue);
  };

  const handleCitySelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedCity(newValue);
    setCityId(newValue);
  };

  const handlesNameChange = (e) => {
    const newValue = e.target.value;
    console.log("checkName", newValue);
    ssetName(newValue);
  };
  const handlesAddressChange = (e) => {
    const newValue = e.target.value;
    ssetAddress(newValue);
  };
  const handlesEmailChange = (e) => {
    const newValue = e.target.value;
    ssetEmail(newValue);
  };
  const handlesPhoneChange = (e) => {
    const newValue = e.target.value;
    ssetPhone(newValue);
  };
  const handlesTypeChange = (e) => {
    const newValue = e.target.value;
    ssetType(newValue);
  };
  const handlesPincodeChange = (e) => {
    const newValue = e.target.value;
    ssetPincode(newValue);
  };
  //

  const handlesStateSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedStateOption(newValue);
    ssetStateId(newValue);
  };

  const handlesCountrySelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedCountryCode(newValue);
    ssetCountryId(newValue);
  };

  const handlesCitySelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedCity(newValue);
    ssetCityId(newValue);
  };

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked; // Get the new value of the checkbox
    setShipToDifferentAddress(newValue); // Update the state
  };

  const addOrUpdateBillingAddress = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      name: name || billingData?.name,
      address: address || billingData?.address,
      email: email || billingData?.email,
      phone: phone || billingData?.mobile,
      type: "office",
      pincode: pincode || billingData?.pincode,
      country_id: countryId || billingData?.country["id"],
      state_id: stateId || billingData?.state["id"],
      city_id: cityId || billingData?.city["id"],
      defaddress: "1",
    };

    console.log("phirAur", formdata);
    fetch("https://www.demo609.amrithaa.com/backend-cema/public/api/create-billing-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const addOrUpdateAddress = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      name: sname,
      address: saddress,
      email: semail,
      phone: sphone,
      type: "office",
      pincode: spincode,
      country_id: scountryId || billingData?.country["id"],
      state_id: sstateId || billingData?.state["id"],
      city_id: scityId || billingData?.city["id"],
      defaddress: "1",
    };

    console.log("phirAur", formdata);
    fetch("https://www.demo609.amrithaa.com/backend-cema/public/api/create-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const placeOrder = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      grand_total: datta?.grand_total,
    };
    fetch("https://www.demo609.amrithaa.com/backend-cema/public/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  function getCartDetails() {
    const bearerToken = localStorage.getItem("accessToken");
    console.log("bearerToken", orders);

    fetch("https://www.demo609.amrithaa.com/backend-cema/public/api/getCartData", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("getCartData:", data.total);

        setTotal(data.total);
        setDatta(data);
        setOrders(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getBillingDetails() {
    const bearerToken = localStorage.getItem("accessToken");
    console.log("bearerToken", orders);

    fetch("https://www.demo609.amrithaa.com/backend-cema/public/api/billing-address", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("BillingDetails:", data.address);
        setBillingData(data?.address);
        setAddressData(data?.address);
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
      "https://www.demo609.amrithaa.com/backend-cema/public/api/states/101?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setStateOptions(result?.states);
        console.log("states", stateOptions);
      })
      .catch((error) => console.log("error", error));
  }

  function getCountries() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.demo609.amrithaa.com/backend-cema/public/api/countries?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("countries", result.countries);
        setCountriesOptions(result?.countries);
      })
      .catch((error) => console.log("error", error));
  }
  function getCities() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.demo609.amrithaa.com/backend-cema/public/api/city/12?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("city", result.cities);
        setCitiesOptions(result?.cities);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getCartDetails();
    getBillingDetails();
    getCountries();
    getCountryStates();
    getCities();
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
                                    name="billing_first_name"
                                    value={name}
                                    onChange={handleNameChange}
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
                                    value={phone}
                                    onChange={handlePhoneChange}
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
                                    value={email}
                                    autocomplete="off"
                                    onChange={handleEmailChange}
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
                                    value={address}
                                    onChange={handleAddressChange}
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
                                    value={selectedConutryCode} // Set the selected option based on state
                                    onChange={handleCountrySelectChange}
                                  >
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
                                    name="billing_state"
                                    className="state-select custom-select"
                                    value={selectedStateOption} // Set the selected option based on state
                                    onChange={handleStateSelectChange} // Add an onChange event handler
                                  >
                                    {stateOptions?.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
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
                                  <select
                                    name="billing_city"
                                    className="country-select custom-select"
                                    value={selectedCity} // Set the selected option based on state
                                    onChange={handleCitySelectChange}
                                  >
                                    {citiesOptions?.map((option) => (
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
                                    name="billing_postcode"
                                    value={pincode}
                                    onChange={handlePincodeChange}
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
                            {billingData ? "Update Address" : "Add Address"}
                          </div>
                        </div>

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
                                <span>Ship to a different address?</span>
                              </label>
                            </p>
                            {shipToDifferentAddress && (
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
                                        name="billing_first_name"
                                        value={sname}
                                        onChange={handlesNameChange}
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
                                        name="billing_phone"
                                        value={sphone}
                                        onChange={handlesPhoneChange}
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
                                        name="billing_email"
                                        value={semail}
                                        autocomplete="off"
                                        onChange={handlesEmailChange}
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
                                        name="billing_address_1"
                                        placeholder="House number and street name"
                                        value={saddress}
                                        onChange={handlesAddressChange}
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row address-field form-row-wide">
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
                                  </p>

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
                                        name="billing_country"
                                        className="country-select custom-select"
                                        value={selectedConutryCode} // Set the selected option based on state
                                        onChange={handlesCountrySelectChange}
                                      >
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
                                        name="billing_state"
                                        className="state-select custom-select"
                                        value={selectedStateOption} // Set the selected option based on state
                                        onChange={handlesStateSelectChange} // Add an onChange event handler
                                      >
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
                                        name="billing_city"
                                        className="country-select custom-select"
                                        value={selectedCity} // Set the selected option based on state
                                        onChange={handlesCitySelectChange}
                                      >
                                        {citiesOptions?.map((option) => (
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
                                        name="billing_postcode"
                                        value={spincode}
                                        onChange={handlesPincodeChange}
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
                                  Add Address
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
                                      <img
                                        width="600"
                                        height="600"
                                        src={`${order?.simple_product?.image_path}/${order?.simple_product?.product_image?.[0]}`}
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-name">
                                      <Link
                                        to={`/product-details?product_id=${order?.id}`}
                                      >
                                        {
                                          order?.simple_product?.product_name
                                            ?.en
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
                                      {" "}
                                      KD
                                      {
                                        order?.simple_product
                                          ?.actual_selling_price
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="cart-subtotal">
                              <h2>Subtotal</h2>
                              <div className="subtotal-price">
                                <span>{total}</span>
                              </div>
                            </div>
                            <div className="cart-subtotal">
                              <h2>Discount</h2>
                              <div className="subtotal-price">
                                <span>{datta?.discount_amount}</span>
                              </div>
                            </div>
                            <div className="cart-subtotal">
                              <h2>Shipping Charges</h2>
                              <div className="subtotal-price">
                                <span>Amit Please send</span>
                              </div>
                            </div>
                            <div className="order-total">
                              <h2>Total</h2>
                              <div className="total-price">
                                <strong>
                                  <span>KD{datta?.grand_total}</span>
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
                              <div
                                type="submit"
                                className="button alt"
                                name="checkout_place_order"
                                value="Place order"
                                onClick={placeOrder}
                              >
                                Place order
                              </div>
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

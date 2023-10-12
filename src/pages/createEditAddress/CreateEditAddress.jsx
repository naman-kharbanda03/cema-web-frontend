import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import { useSearchParams } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";


const CreateEditAddress = (props) => {
    console.log(props)
    const [countriesOptions, setCountriesOptions] = useState();
    const [stateOptions, setStateOptions] = useState();
    const [citiesOptions, setCitiesOptions] = useState();
    const [address, setAddress] = useState({});
    const setAddressData = (data) =>{
        setAddress({
            name: data?.name || "",
            address: data?.address || "",
            email: data?.email || "",
            phone: data?.mobile || data?.phone || "",
            pincode: data?.pincode || data?.pin_code || "",
            country_id: data?.country?.id || "",
            state_id: data?.state?.id || "",
            city_id: data?.city?.id || "", 
            defaddress: 1,
            address_2: ""
        })
    }
    const authToken = localStorage.getItem('accessToken');
    const handleChange = (e) => {
        setAddress(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (e.target.name === 'state_id')  getCities(e.target.value);
    }
    const addOrUpdateBillingAddress = (e) =>{
        e.preventDefault();
        console.log(searchParams.get("addressType") === "Shipping"  ? apiConfig.createUpdateShipAddress:apiConfig.createUpdateBillAddress)
        fetch( (searchParams.get("addressType") === "Shipping"  ? apiConfig.createUpdateShipAddress:apiConfig.createUpdateBillAddress), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(address),
          })
            .then((response) => {
              if (!response.ok) throw new Error("Network Issue");
              return response.json();
            })
            .then((data) => {
              console.log("Updated -->", data);
              if(!data?.status){
                Object.keys(data["data"]).map(key =>{
                    toast.warning(data?.data[key][0], {
                        position: toast.POSITION.BOTTOM_LEFT,
                      });
                })
              }else{
                toast.success(data?.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                  });
              }
              return data;
            })
            .catch((error) => console.error("Problem with fetch operations", error));

    }
    const getAddressDetails = (url) =>{
        searchParams.get("addressType") === "Shipping" &&
        fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          })
            .then((response) => {
              if (!response.ok) throw new Error("Network Issue");
              return response.json();
            })
            .then((data) => {
              console.log(data);
              setAddressData(data.address)
              getCities(data?.address?.state?.id);
              return data;
            })
            .catch((error) => console.error("Problem with fetch operations", error));
      
            searchParams.get("addressType") === "Billing" && fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          })
            .then((response) => {
              if (!response.ok) throw new Error("Network Issue");
              return response.json();
            })
            .then((data) => {
              console.log(data);
              setAddressData(data.address)
              getCities(data?.address?.state?.id);
              return data;
            })
            .catch((error) => console.error("Problem with fetch operations", error));
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
                setCountriesOptions(result?.countries);
            })
            .catch((error) => console.log("error", error));
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
            })
            .catch((error) => console.log("error", error));
    }
    function getCities(id) {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `https://www.demo609.amrithaa.com/backend-cema/public/api/city/${id}?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setCitiesOptions(result?.cities);
            })
            .catch((error) => console.log("error", error));
    }
  

    useEffect(() => {
        const shippingAddress = apiConfig.getAddressAPI;
        const billingAddress = apiConfig.getBillingAddressAPI;
        getAddressDetails( searchParams.get("addressType") === "Shipping" ? shippingAddress : billingAddress);
        getCountries();
        getCountryStates();
    }, [])

    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <div id="site-main" className="site-main" >
                <div id="main-content" className="main-content">
                    <div id="primary" className="content-area">
                        {/* Page Title */}
                        <PageTitle current={`${searchParams.get("addressType") || ""} Address `} />

                        <div id="content" className="site-content " role="main"  >
                            <div className="section-padding" >
                                <div className="section-container p-l-r" >
                                    <div className="shop-checkout" >
                                        <form onSubmit={addOrUpdateBillingAddress}
                                            name="checkout"
                                            method="post"
                                            className="checkout"
                                            action=""
                                            autocomplete="off"
                                        // style={{ width: '80%' }}
                                        >
                                            <div className="row">
                                                <div className="col-xl-8 col-lg-7 col-md-12 col-12">
                                                    <div className="customer-details">
                                                        <div className="billing-fields">
                                                            <h3>{searchParams.get("addressType")} Details</h3>
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
                                                                            value={address?.name}
                                                                            onChange={(e) => handleChange(e)}
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
                                                                            value={address?.phone}
                                                                            onChange={(e) => handleChange(e)}
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
                                                                            value={address?.email}
                                                                            autocomplete="off"
                                                                            onChange={(e) => handleChange(e)}
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
                                                                            name="address"
                                                                            placeholder="House number and street name"
                                                                            value={address?.address}
                                                                            onChange={(e) => handleChange(e)}
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
                                                                            name="address_2"
                                                                            placeholder="Apartment, suite, unit, etc. (optional)"
                                                                            value={address?.address_2}
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
                                                                            name="country_id"
                                                                            className="country-select custom-select"
                                                                            value={address?.country_id} // Set the selected option based on state
                                                                            onChange={(e) => handleChange(e)}
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
                                                                            name="state_id"
                                                                            className="state-select custom-select"
                                                                            value={address?.state_id} // Set the selected option based on state
                                                                            onChange={(e) => handleChange(e)}
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
                                                                    <label for="city" className="">
                                                                        Town / City{" "}
                                                                        <span className="required" title="required">
                                                                            *
                                                                        </span>
                                                                    </label>
                                                                    <span className="input-wrapper">
                                                                        <select
                                                                            name="city_id"
                                                                            className="country-select custom-select"
                                                                            value={address?.city_id} // Set the selected option based on state
                                                                            onChange={(e) => handleChange(e)}
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
                                                                            name="pincode"
                                                                            value={address?.pincode}
                                                                            onChange={(e) => handleChange(e)}
                                                                        />
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            style={{
                                                                background: "black",
                                                                color: "white",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                width: "140px",
                                                                cursor: "pointer",
                                                                marginBottom: "10px",
                                                            }}
                                                            type="submit"
                                                            // onClick={() => addOrUpdateBillingAddress()}
                                                        >
                                                            Update Address
                                                            {/* {billingData ? "Update Address" : "Add Address"} */}
                                                        </Button>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default CreateEditAddress;
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";


const CreateEditAddress = ({ type }) => {
    const [address, setAddress] = useState({});
    const [countriesOptions, setCountriesOptions] = useState();
    const [stateOptions, setStateOptions] = useState();
    const [citiesOptions, setCitiesOptions] = useState();
    const handleChange = (e) => {
        setAddress(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (e.target.name === 'state') {
            getCities(e.target.value);
        }
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
        getCountries();
        getCountryStates();
    }, [])
    useEffect(() => {
        console.log(address)
    }, [address]);
    return (
        <>
            <div id="site-main" className="site-main" >
                <div id="main-content" className="main-content">
                    <div id="primary" className="content-area">
                        {/* Page Title */}
                        <PageTitle current={"Billing Address"} />

                        <div id="content" className="site-content " role="main"  >
                            <div className="section-padding" >
                                <div className="section-container p-l-r" >
                                    <div className="shop-checkout" >
                                        <form
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
                                                                            // value={name}
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
                                                                            // value={phone}
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
                                                                            // value={email}
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
                                                                            name="address_1"
                                                                            placeholder="House number and street name"
                                                                            // value={address}
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
                                                                        // value=""
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
                                                                            name="country"
                                                                            className="country-select custom-select"
                                                                            // value={selectedConutryCode} // Set the selected option based on state
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
                                                                            name="state"
                                                                            className="state-select custom-select"
                                                                            // value={selectedStateOption} // Set the selected option based on state
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
                                                                            name="city"
                                                                            className="country-select custom-select"
                                                                            // value={selectedCity} // Set the selected option based on state
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
                                                                            name="postcode"
                                                                            // value={pincode}
                                                                            onChange={(e) => handleChange(e)}
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
                                                        // onClick={addOrUpdateBillingAddress}
                                                        >
                                                            Update Address
                                                            {/* {billingData ? "Update Address" : "Add Address"} */}
                                                        </div>
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
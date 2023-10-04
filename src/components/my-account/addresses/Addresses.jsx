import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import Address from "../address/Address";

const Addresses = () => {
  const [shippingAddress, setShippingAddress] = useState();
  const [billingAddress, setBillingAddress] = useState({
    type: "Billing Address",
    houseNo: "4299 Express Lane",
    locality: "",
    street: "",
    city: "Sarasota",
    state: "FL",
    pincode: "34249",
  });
  const authToken = localStorage.getItem('accessToken');

  const fetchDetails = (apiUrl, setState) => {
    fetch(apiUrl, {
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
        setState(data.address[0]);
        return data.address;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    const addressApiUrl = apiConfig.getAddressAPI;
    const billingAddressAPI = apiConfig.getBillingAddressAPI;
    fetchDetails(addressApiUrl, setShippingAddress);
    // fetchDetails(billingAddressAPI,setBillingAddress);
  }, []);
  return (
    <>
      <div className="my-account-addresses">
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="addresses">
          <Address
            type={billingAddress.type}
            houseNo={billingAddress.houseNo}
            locality={billingAddress.locality}
            city={billingAddress.city}
            state={billingAddress.state}
            pincode={billingAddress.pincode}
          />
          <Address
            type={shippingAddress.type}
            houseNo={shippingAddress.address}
            // locality={shippingAddress.locality}
            city={shippingAddress.city.name}
            state={shippingAddress.state.name}
            pincode={shippingAddress.pin_code}
          />
        </div>
      </div>
    </>
  );
};
export default Addresses;

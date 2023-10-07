import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import Address from "../address/Address";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [addressLoaded, setAddressLoaded] = useState(false);
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
        setAddresses(data.address);
        setAddressLoaded(true);
        return data;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    const addressApiUrl = apiConfig.getAddressAPI;
    fetchDetails(addressApiUrl, setAddresses);
  }, []);

  return (
    <>
      <div className="my-account-addresses">
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="addresses">
          <Address
            type="Billing Address"
          />
          <Address
            type="Shipping Address"
          />
        </div>
      </div>
    </>
  );
};
export default Addresses;

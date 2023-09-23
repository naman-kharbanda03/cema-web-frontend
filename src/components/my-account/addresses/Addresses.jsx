import React, { useState } from "react";
import Address from "../address/Address";

const Addresses = () => {
  const [shippingAddress, setShippingAddress] = useState({
    type: "Shipping Address",
    houseNo: "4299 Express Lane",
    locality: "75 Business Spur",
    street: "Sault Ste",
    city: "Marie",
    state: "MI",
    pincode: "49783",
  });
  const [billingAddress, setBillingAddress] = useState({
    type: "Billing Address",
    houseNo: "4299 Express Lane",
    locality: "",
    street: "",
    city: "Sarasota",
    state: "FL",
    pincode: "34249",
  });
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
            houseNo={shippingAddress.houseNo}
            locality={shippingAddress.locality}
            city={shippingAddress.city}
            state={shippingAddress.state}
            pincode={shippingAddress.pincode}
          />
        </div>
      </div>
    </>
  );
};
export default Addresses;

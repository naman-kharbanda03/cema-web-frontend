import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import Address from "../address/Address";
import { useTranslation } from "react-i18next";

const Addresses = () => {
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [addressLoaded, setAddressLoaded] = useState(false);
  const { t } = useTranslation();
  const authToken = localStorage.getItem('accessToken');

  const fetchAddresses = async (shipApiUrl, billApiUrl) => {
    fetch(shipApiUrl, {
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
        setShippingAddress(data.address)
        return data;
      })
      .catch((error) => console.error("Problem with fetch operations", error));

    fetch(billApiUrl, {
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
        setBillingAddress(data.address);
        return data;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    const shippingAddress = apiConfig.getAddressAPI;
    const billingAddress = apiConfig.getBillingAddressAPI;
    fetchAddresses(shippingAddress, billingAddress);
  }, []);

  return (
    <>
      <div className="my-account-addresses">
        <p>
          {t("Account.The following addresses will be used on the checkout page by default.")}
        </p>
        <div className="addresses">
          <Address
            type={t("Account.Billing Address")}
            address={billingAddress}
          />
          <Address
            type={t("Account.Shipping Address")}
            address={shippingAddress}

          />
        </div>
      </div>
    </>
  );
};
export default Addresses;
import React from "react";

const Address = (address) => {
  return (
    <>
      {/* <p>
        The following addresses will be used on the checkout page by default.
      </p> */}
      <div className="addresses-col">
        <header className="col-title">
          <h3>{address.type}</h3>
          <a href="#" className="edit">
            Edit
          </a>
        </header>
        <address>
          {address.houseNo}
          <br />
          {address.locality}
          <br />
          {address.street}
          <br />
          {address.city}, {address.state} {address.pincode}
        </address>
      </div>
    </>
  );
};
export default Address;

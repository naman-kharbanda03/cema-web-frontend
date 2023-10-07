import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";

const Address = (props) => {
  const [address, setAddress] = useState({})

  return (
    <>

      <div className="addresses-col">
        <header className="col-title">
          <h3> {props.type}</h3>
          {address === null ?
            <a href="#" className="edit">
              Edit
            </a>
            :
            <a href="#" className="add" >
              Add
            </a>
          }
        </header>
        <address>
          {address !== {} ? <>
            {address?.houseNo}
            <br />
            {address?.locality}
            <br />
            {address?.street}
            <br />
            {address?.city}, {address?.state} {address?.pincode}
          </>
            :
            "Please Add Address"
          }

        </address>

      </div>

    </>

  );
};
export default Address;

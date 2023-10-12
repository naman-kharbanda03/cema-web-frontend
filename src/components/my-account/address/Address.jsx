import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../../config/apiConfig";

const Address = (props) => {
  // const [address, setAddress] = useState();
  console.log(props);
  const {address, type} = props;
  return (
    <>
      <div className="addresses-col">
        <header className="col-title">
          <h3> {props.type}</h3>
          {address === null ?
            <Link to={`/edit-address?addressType=${type.split(' ')[0]}`} className="add">
              Add
            </Link>
            :
            <Link to={`/edit-address?addressType=${type.split(' ')[0]}`} className="edit">
              Edit
            </Link>
          }
        </header>
        <address>
          {address != {} ? <>
            {address?.address}
            <br/>
            {address?.state?.name}
            <br />
            {address?.country?.name}
            <br />
            {/* {address?.city}, {address?.state} {address?.pincode} */}
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

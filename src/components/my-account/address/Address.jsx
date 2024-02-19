import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../../config/apiConfig";
import { useTranslation } from "react-i18next";

const Address = (props) => {
  // const [address, setAddress] = useState();
  console.log(props);
  const { t } = useTranslation()
  const { address, type } = props;
  return (
    <>
      <div className="addresses-col">
        <header className="col-title">
          <h3> {props.type}</h3>
          {address === null ?
            <Link to={`/edit-address?addressType=${type.split(' ')[0]}`} className="add">
              {t("Account.Add")}
            </Link>
            :
            <Link to={`/edit-address?addressType=${type.split(' ')[0]}`} className="edit">
              {t("Account.Edit")}
            </Link>
          }
        </header>
        <address>
          {address != {} ? <>
            {address?.address}
            <br />
            {address?.state?.name}
            <br />
            {address?.country?.name}
            <br />
            {/* {address?.city}, {address?.state} {address?.pincode} */}
          </>
            :
            t("Account.Please Add Address")
          }

        </address>

      </div>

    </>

  );
};
export default Address;

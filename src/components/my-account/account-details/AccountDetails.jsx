import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";

const AccountDetails = () => {

  const [profileData, setProfileData] = useState();
  const { showSuccessToastMessage, showInfoToastMessage } = useShoppingCart();


  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => { console.log(profileData) }, [profileData]);

  const onSubmit = (e) => {

    e.preventDefault();
    const apiUrl = apiConfig.updateProfileAPI;
    const token = localStorage.getItem('accessToken');
    const secret = apiConfig.secretKey;

    if (profileData?.firstName && profileData?.lastName && profileData?.phone) {
      const formData = new FormData();

      formData.append('secret', secret);
      formData.append('name', profileData?.firstName + ' ' + profileData?.lastName);
      // formData.append('displayName', profileData.displayName);


      fetch(apiUrl, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          // "Content-Type": "application/json",
          // Add any other headers your API requires
        },
        body: formData,
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          showSuccessToastMessage(data.message);

        })
        .catch(error => console.error(error, "Fetch operation Error"));
    } else {
      showInfoToastMessage();
    }
  }

  return (
    <>

      <div className="my-account-account-details">
        <form className="edit-account" >
          <p className="form-row">
            <label for="account_first_name">
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p className="form-row">
            <label>
              Last name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="lastName"
              onChange={(e) => handleChange(e)}

            />
          </p>
          <div className="clear"></div>

          <div className="clear"></div>
          {/* <fieldset>
            <legend>Password change</legend>
            <p className="form-row">
              <label>Current password (leave blank to leave unchanged)</label>
              <input
                type="password"
                className="input-text"
                name="password_current"
                autocomplete="off"
                onChange={(e) => handleChange(e)}

              />
            </p>
            <p className="form-row">
              <label>New password (leave blank to leave unchanged)</label>
              <input
                type="password"
                className="input-text"
                name="password_1"
                autocomplete="off"
                onChange={(e) => handleChange(e)}

              />
            </p>
            <p className="form-row">
              <label>Confirm new password</label>
              <input
                type="password"
                className="input-text"
                name="password_2"
                autocomplete="off"
                onChange={(e) => handleChange(e)}

              />
            </p>
          </fieldset> */}
          <p className="form-row">
            <label>
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="number"
              className="input-text"
              name="phone"
              // value={ }
              onChange={(e) => handleChange(e)}
            />
            <span>
              <em>
                This will be how your name will be displayed in the account
                section and in reviews
              </em>
            </span>
          </p>
          <div className="clear"></div>

          <p className="form-row">
            <label>
              E-mail <span className="required">*</span>
            </label>
            <input
              type="email"
              className="input-text"
              name="email"
              // value={ }
              disabled
            // onChange={(e) => handleChange(e)}
            />
            <span>
              <em>
                This will be how your name will be displayed in the account
                section and in reviews
              </em>
            </span>
          </p>
          <div className="clear"></div>
          <p className="form-row">
            <button
              type="submit"
              className="button"
              name="save_account_details"
              value="Save changes"
              onClick={(e) => onSubmit(e)}

            >
              Save changes
            </button>
          </p>
        </form>
      </div>
    </>
  );
};
export default AccountDetails;

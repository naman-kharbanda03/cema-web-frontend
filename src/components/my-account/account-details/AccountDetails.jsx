import React, { useState } from "react";
import apiConfig from "../../../config/apiConfig";

const AccountDetails = () => {

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    countryId: '',
    stateId: '',
    cityId: '',
  });


  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const apiUrl = apiConfig.updateProfileAPI;
    const token = localStorage.getItem('accessToken');
    const secret = apiConfig.secretKey;

    const formData = new FormData();

    formData.append('secret', secret);
    formData.append('name', profileData.firstName + profileData.lastName);
    formData.append('phone', profileData.mobileNumber);
    formData.append('country_id', profileData.countryId);
    formData.append('state_id', profileData.stateId);
    formData.append('city_id', profileData.cityId);


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

      })
      .catch(error => console.error(error, "Fetch operation Error"))

  }

  return (
    <>

      <div className="my-account-account-details">
        <form className="edit-account" action="" method="post"
        // onSubmit={()=>onSubmit}
        >
          <p className="form-row">
            <label for="account_first_name">
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="account_first_name"
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
              name="account_last_name"
              onChange={(e) => handleChange(e)}

            />
          </p>
          <div className="clear"></div>
          <p className="form-row">
            <label>
              Display name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="account_display_name"
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
              Email address <span className="required">*</span>
            </label>
            <input type="email" className="input-text" name="account_email"
              onChange={(e) => handleChange(e)}

            />
          </p>
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
          <div className="clear"></div>
          <p className="form-row">
            <button
              type="submit"
              className="button"
              name="save_account_details"
              value="Save changes"
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

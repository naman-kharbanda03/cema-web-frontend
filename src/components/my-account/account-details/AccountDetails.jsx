import React from "react";

const AccountDetails = () => {

  return (
    <>
      <div className="my-account-account-details">
        <form className="edit-account" action="" method="post">
          <p className="form-row">
            <label for="account_first_name">
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="account_first_name"
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
            <input type="email" className="input-text" name="account_email" />
          </p>
          <fieldset>
            <legend>Password change</legend>
            <p className="form-row">
              <label>Current password (leave blank to leave unchanged)</label>
              <input
                type="password"
                className="input-text"
                name="password_current"
                autocomplete="off"
              />
            </p>
            <p className="form-row">
              <label>New password (leave blank to leave unchanged)</label>
              <input
                type="password"
                className="input-text"
                name="password_1"
                autocomplete="off"
              />
            </p>
            <p className="form-row">
              <label>Confirm new password</label>
              <input
                type="password"
                className="input-text"
                name="password_2"
                autocomplete="off"
              />
            </p>
          </fieldset>
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

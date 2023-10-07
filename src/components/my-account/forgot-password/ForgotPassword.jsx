import React from "react";

const ForgotPassword = () => {
    return (
        <>
            <div className="my-account-account-details">
                <form className="edit-account" action="" method="post">
                    {/* <fieldset> */}
                    {/* <legend>Password change</legend> */}
                    <p className="form-row">
                        <label>Current password (leave blank to leave unchanged)</label>
                        <input
                            type="password"
                            className="input-text"
                            name="password_current"
                            autocomplete="off"
                        // onChange={(e) => handleChange(e)}
                        />
                    </p>
                    <p className="form-row">
                        <label>New password (leave blank to leave unchanged)</label>
                        <input
                            type="password"
                            className="input-text"
                            name="password_1"
                            autocomplete="off"
                        // onChange={(e) => handleChange(e)}

                        />
                    </p>
                    <p className="form-row">
                        <label>Confirm new password</label>
                        <input
                            type="password"
                            className="input-text"
                            name="password_2"
                            autocomplete="off"
                        // onChange={(e) => handleChange(e)}

                        />
                    </p>
                    {/* </fieldset> */}
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
    )
}
export default ForgotPassword;
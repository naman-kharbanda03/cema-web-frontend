import React, { useState } from "react";
import apiConfig from "../../../config/apiConfig";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [passwords, setPassword] = useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    })
    const token = localStorage.getItem('accessToken');
    const onChangeHandler = (e) => {
        setPassword(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    const changeUserPassword = (e) => {
        e.preventDefault();
        if (passwords?.password != passwords?.password_confirmation) {
            toast.warning("New Passwords are not matching, please check.", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
            return
        }
        const formData = new FormData();
        formData.append('old_password', passwords.old_password);
        formData.append('password', passwords.password);
        formData.append('password_confirmation', passwords.password_confirmation);
        fetch(apiConfig?.changePassword, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        }).then(response => { return response.json() })
            .then(data => {
                console.log(data);
                if (!data?.success) {
                    Object.keys(data["data"]).map(key => {
                        toast.warning(data?.data[key][0], {
                            position: toast.POSITION.BOTTOM_LEFT,
                        });
                    })
                } else {
                    toast.success(data?.message, {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                    setPassword({
                        old_password: "",
                        password: "",
                        password_confirmation: ""
                    });
                }
            })
            .catch(error => console.error({ error }, "Fetch operation Error"));
    }
    return (
        <>
            <div className="my-account-account-details">
                <form className="edit-account" action="" method="post" onSubmit={changeUserPassword}>
                    {/* <fieldset> */}
                    {/* <legend>Password change</legend> */}
                    <p className="form-row">
                        <label>Current password (leave blank to leave unchanged)</label>
                        <input
                            type="password"
                            className="input-text"
                            name="old_password"
                            autocomplete="off"
                            value={passwords?.old_password}
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </p>
                    <p className="form-row">
                        <label>New password (leave blank to leave unchanged)</label>
                        <input
                            type="password"
                            className="input-text"
                            name="password"
                            autocomplete="off"
                            value={passwords?.password}
                            onChange={(e) => onChangeHandler(e)}

                        />
                    </p>
                    <p className="form-row">
                        <label>Confirm new password</label>
                        <input
                            type="password"
                            className="input-text"
                            name="password_confirmation"
                            autocomplete="off"
                            value={passwords?.password_confirmation}
                            onChange={(e) => onChangeHandler(e)}

                        />
                    </p>
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
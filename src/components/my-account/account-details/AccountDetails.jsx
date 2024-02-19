import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AccountDetails = () => {
  const token = localStorage.getItem('accessToken');
  const [profileData, setProfileData] = useState({});
  const { t } = useTranslation();
  // const { showSuccessToastMessage, showInfoToastMessage } = useShoppingCart();
  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    console.log(profileData)
    e.preventDefault();
    const apiUrl = apiConfig.updateProfileAPI;
    const secret = apiConfig.secretKey;

    if (profileData?.name && profileData?.phone) {
      console.log("All good")
      const formData = new FormData();

      formData.append('secret', secret);
      formData.append('name', profileData?.name);
      formData.append('phone', profileData?.phone);
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
          if (!data?.status) {
            toast.success(data.message, {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          } else {
            toast.warning("Some error occurred.", {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          }
        })
        .catch(error => console.error(error, "Fetch operation Error"));
    } else {
      toast.warning("Field is empty.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }
  const getUserProfile = () => {
    fetch(apiConfig?.getUserApi, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setProfileData(
          {
            name: data?.name,
            phone: data?.mobile,
            email: data?.email,
            // country_id : data?.country_id,
            // state_id : data?.state_id,
            // city_id : data?.city_id,
            // image : data?.image
          }
        )
        toast.info(data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });


      })
      .catch(error => console.error(error, "Fetch operation Error"));
  }
  useEffect(() => {
    if (Object.keys(profileData).length === 0) getUserProfile()
  }, [profileData])

  return (
    <>

      <div className="my-account-account-details">
        <form className="edit-account" >
          {/* <p className="form-row">
            <label for="account_first_name">
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
          </p> */}
          <p className="form-row">
            <label>
              {t("Account.Name")} <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-text"
              name="name"
              value={profileData?.name}
              onChange={(e) => handleChange(e)}

            />
          </p>
          <div className="clear"></div>

          <div className="clear"></div>

          <p className="form-row">
            <label>
              {t("Account.Mobile Number")} <span className="required">*</span>
            </label>
            <input
              type="number"
              className="input-text"
              name="phone"
              value={profileData?.phone}
              onChange={(e) => handleChange(e)}
            />
            <span>
              <em>
                {t("Account.This will be how your name will be displayed in the account section and in reviews")}
              </em>
            </span>
          </p>
          <div className="clear"></div>

          <p className="form-row">
            <label>
              {t("Account.E-mail")} <span className="required">*</span>
            </label>
            <input
              type="email"
              className="input-text"
              name="email"
              value={profileData?.email}
              disabled
            // onChange={(e) => handleChange(e)}
            />
            <span>
              <em>
                {t("Account.This will be how your name will be displayed in the account section and in reviews")}
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
              {t("Account.Save changes")}
            </button>
          </p>
        </form>
      </div>
    </>
  );
};
export default AccountDetails;

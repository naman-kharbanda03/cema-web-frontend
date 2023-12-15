import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-tittle/PageTitle";
import apiConfig from "../../config/apiConfig";
import { useShoppingCart } from "../../context/ShoppingCartContext";

const ForgotPassword = () => {

  const { showSuccessToastMessage, showInfoToastMessage } = useShoppingCart();
  const [state, setState] = useState({
    OTP: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [UsernameButton, setUsernameButton] = useState(false);
  const [OTPButton, setOTPButton] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  const [OTPSent, setOTPSent] = useState(false);
  const [OTPVerified, setOTPVerified] = useState(false);

  const changeHandler = (e) => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmitOTP = (e) => {
    e.preventDefault();
    setOTPButton(true);
    const formData = new FormData();
    if (!state.OTP) {
      setOTPButton(false);
      return showInfoToastMessage('Please enter OTP');
    }
    formData.append("email", state.email);
    formData.append("two_factor_code", state.OTP);

    fetch(apiConfig.verifyOTP, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => {
        if (data.success === true) {
          showSuccessToastMessage(data.message);
          setOTPVerified(true);
        } else {
          showInfoToastMessage(data.message);
          setOTPButton(false);
          if (data.two_factor_expires === true) setOTPSent(false);
        }
      });
  }

  const createOTP = (e) => {
    e.preventDefault();
    setUsernameButton(true);
    const formData = new FormData();
    formData.append("email", state.email);

    fetch(apiConfig.createOTPAPI, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => {
        if (data.status === true) {
          showSuccessToastMessage(data.message);
          setOTPSent(true);
        } else {
          showInfoToastMessage(data.msg || data.message);
          setUsernameButton(false);
        }

      });
  }
  const ResetPassword = (e) => {
    e.preventDefault(e);
    setResetButton(true);
    if (!state?.password || !state?.confirmPassword) {
      setResetButton(false);
      return showInfoToastMessage('Please enter passwords');
    }
    if (state.password !== state.confirmPassword) {
      setResetButton(false);
      return showInfoToastMessage('Passwords dont match');
    }
    const formData = new FormData();
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('password_confirmation', state.confirmPassword);

    fetch(apiConfig.resetPassword, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => {
        if (data.errors) {
          showInfoToastMessage(data?.message || data?.msg);
          setResetButton(false);
        }
        if (data.success === true) {
          showSuccessToastMessage(data?.message);
          window.location.href = '/login'
        }
      });
  }
  useEffect(() => console.log(OTPSent), [OTPSent])

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* { page Info } */}
            <PageTitle current={"Forgot Password"} />
            {/* form */}
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">


                  <div className="page-forget-password w-50 mx-auto p-5 border">
                    <form className="reset-password">

                      {!OTPSent ? <>
                        <p>
                          Lost your password? Please enter your username or email
                          address. You will receive an OTP via registered email.
                        </p>
                        <p className="form-row form-row-first">
                          <label>Email</label>
                          <input
                            className="input-text"
                            type="text"
                            name="email"
                            // autoComplete="username"
                            value={state?.email}
                            onChange={(e) => changeHandler(e)}
                          />
                        </p>
                        <div className="clear" />
                        <p className="form-row">
                          <button
                            type="submit"
                            className="button"
                            value="OTP"
                            onClick={(e) => createOTP(e)}
                            disabled={UsernameButton}
                          >
                            Get OTP
                          </button>
                        </p>
                      </>
                        : !OTPVerified
                          ?
                          (<>
                            <p>
                              You would have received an OTP from our side. Please Enter it.
                            </p>
                            <p className="form-row form-row-first">
                              <label>OTP</label>
                              <input
                                className="input-text"
                                type="number"
                                name="OTP"
                                value={state?.OTP}
                                onChange={(e) => changeHandler(e)}
                                disabled={OTPButton}
                              />
                            </p>
                            <div className="clear" />
                            <p className="form-row">
                              <button
                                type="submit"
                                className="button"
                                onClick={(e) => onSubmitOTP(e)}
                                disabled={resetButton}
                              >
                                Enter OTP
                              </button>
                            </p>
                          </>)
                          :
                          <>
                            <p>
                              Please reset your password.
                            </p>
                            <p className="form-row form-row-first">
                              <label>Password</label>
                              <input
                                className="input-text"
                                type="password"
                                name="password"
                                value={state?.password}
                                onChange={(e) => changeHandler(e)}
                              />
                            </p>
                            <p className="form-row form-row-first">
                              <label>Comfirm Password</label>
                              <input
                                className="input-text"
                                type="password"
                                name="confirmPassword"
                                value={state?.confirmPassword}
                                onChange={(e) => changeHandler(e)}
                              />
                            </p>
                            <div className="clear" />
                            <p className="form-row">
                              <button
                                type="submit"
                                className="button"
                                onClick={(e) => ResetPassword(e)}
                              >
                                Confirm
                              </button>
                            </p>
                          </>
                      }
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

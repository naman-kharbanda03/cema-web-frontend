import React from "react";
import PageTitle from "../../components/page-tittle/PageTitle";

const ForgotPassword = () => {

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
                    <form method="post" className="reset-password">
                      <p>
                        Lost your password? Please enter your username or email
                        address. You will receive a link to create a new
                        password via email.
                      </p>
                      <p className="form-row form-row-first">
                        <label>Username or email</label>
                        <input
                          className="input-text"
                          type="text"
                          name="user_login"
                          autoComplete="username"
                        />
                      </p>
                      <div className="clear" />
                      <p className="form-row">
                        <button
                          type="submit"
                          className="button"
                          value="Reset password"
                        >
                          Reset password
                        </button>
                      </p>
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

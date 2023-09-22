import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const [orderDetails, setOrderDetails] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const apiUrl = "https://cema-backend.plasium.com/api/orders";
  // const authToken = localStorage.getItem("accessToken");
  const authToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiZWI3ZjZmMDA1MTFlY2M0MjcxYmFmY2YzMzdmZWE2YmU5MTJkMTU3OTI4OTliNWY1YzkzYmY2YjMzODJiYWVmZjRiYTRhNmJiMTdlNWNiM2IiLCJpYXQiOjE2OTUzMDY4ODQuOTA2NDI5LCJuYmYiOjE2OTUzMDY4ODQuOTA2NDMxLCJleHAiOjE3MjY5MjkyODQuODg4MTAyLCJzdWIiOiIxMiIsInNjb3BlcyI6W119.Le1I7477zogRCjNHeiWloPwrPYS7KWCAUxJY6ZZ6_waY8IBX4JEjmbcwqfr6l9vsUKlrpcIHGe7yf5jvat9F0D9Qz9JGcvcdHJ0bn1NU4HX-tqwIhipcdxKoVoCPPvby0sPbATIIN72oxV_qiB86NKLwVDpE4dgxbQmYRYyHbdi9-nhgyEZJvOSFqEeGlw94Nq6m1FIplB7pgz-3PQk7-hW_k1Im6V1qz6TbA736MFXJgorv9Y-bneXwzZE_ZrVL23u4dV2tie4ijyU3DLWOU7PUvCe-yAA5Iy4WfIwNMZblKLfuqO46djfivI-EP9FZFKrCYEUS6bzc12knlsbteawXHijITtYTyxgTPUdkRPLxnojKLIm3rdsGvDmtILGLNIHAdgYeXkqqMdHAFo9wpmjV-jfHaROB0AWUIVwfPSObdYCeeCAATZKAQX88qPDcr-9dhs_y6mb7IcdEyyOFt4pzRIc5V1O-dGHYaSZmiL_zxqpPUlQ3dsrwC40d57sCDY-_jJnreuLJXw3NqzIDFMtpTevUTXcC4VRZig68HzvI8a96bLo6DftiPf1_7-MHyPyUCDImVKeiY1FHxUDSO5Glzniyx5biZqU0BQwWK3Y0MEdfEwfmUuia8yYCNYpcDAGGRmVxkXxcoSLXVyUuURJAuNS0_QVc_aKGCgLHxS4";

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network Issue");
  //       }

  //       const data = await response.json();
  //       console.log(data);

  //       const response2 = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });
  //       if (!response2.ok) {
  //         throw new Error("Network Issue");
  //       }

  //       const data2 = await response.json();
  //       console.log(data2);
  //     } catch (error) {
  //       console.error("Problem with fetch operations", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">My Account</h1>
                </div>
                <div className="breadcrumbs">
                  <a href="index.html">Home</a>
                  <span className="delimiter"></span>My Account
                </div>
              </div>
            </div>

            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="page-my-account">
                    <div className="my-account-wrap clearfix">
                      <nav className="my-account-navigation">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                activeTab === "dashboard" ? "active" : ""
                              }`}
                              data-toggle="tab"
                              href="#dashboard"
                              role="tab"
                              onClick={() => handleTabChange("dashboard")}
                            >
                              Dashboard
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                activeTab === "orders" ? "active" : ""
                              }`}
                              data-toggle="tab"
                              href="#orders"
                              role="tab"
                              onClick={() => handleTabChange("orders")}
                            >
                              Orders
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                activeTab === "addresses" ? "active" : ""
                              }`}
                              data-toggle="tab"
                              href="#addresses"
                              role="tab"
                              onClick={() => handleTabChange("addresses")}
                            >
                              Addresses
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                activeTab === "account-details" ? "active" : ""
                              }`}
                              data-toggle="tab"
                              href="#account-details"
                              role="tab"
                              onClick={() => handleTabChange("account-details")}
                            >
                              Account details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="">
                              <Link to="/login">Log out</Link>
                            </a>
                          </li>
                        </ul>
                      </nav>
                      <div className="my-account-content tab-content">
                        <div
                          className={`tab-pane fade ${
                            activeTab === "dashboard" ? "show active" : ""
                          }`}
                          id="dashboard"
                          role="tabpanel"
                        >
                          <div className="my-account-dashboard">
                            <p>
                              Hello <strong>Rosie</strong> (not{" "}
                              <strong>Rosie</strong>?{" "}
                              <Link to="/login">Log out</Link>
                              {/* <a href="page-login.html">Log out</a> */})
                            </p>
                            <p>
                              From your account dashboard you can view your{" "}
                              <a href="#">recent orders</a>, manage your{" "}
                              <a href="#">shipping and billing addresses</a>,
                              and{" "}
                              <a href="#">
                                edit your password and account details
                              </a>
                              .
                            </p>
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "orders" ? "show active" : ""
                          }`}
                          id="orders"
                          role="tabpanel"
                        >
                          <div className="my-account-orders">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>#1357</td>
                                    <td>March 45, 2020</td>
                                    <td>Processing</td>
                                    <td>$125.00 for 2 item</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>#2468</td>
                                    <td>June 29, 2020</td>
                                    <td>Completed</td>
                                    <td>$364.00 for 5 item</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>#2366</td>
                                    <td>August 02, 2020</td>
                                    <td>Completed</td>
                                    <td>$280.00 for 3 item</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "addresses" ? "show active" : ""
                          }`}
                          id="addresses"
                          role="tabpanel"
                        >
                          <div className="my-account-addresses">
                            <p>
                              The following addresses will be used on the
                              checkout page by default.
                            </p>
                            <div className="addresses">
                              <div className="addresses-col">
                                <header className="col-title">
                                  <h3>Billing address</h3>
                                  <a href="#" className="edit">
                                    Edit
                                  </a>
                                </header>
                                <address>
                                  3522 Interstate
                                  <br />
                                  75 Business Spur,
                                  <br />
                                  Sault Ste.
                                  <br />
                                  Marie, MI 49783
                                </address>
                              </div>
                              <div className="addresses-col">
                                <header className="col-title">
                                  <h3>Shipping address</h3>
                                  <a href="#" className="edit">
                                    Edit
                                  </a>
                                </header>
                                <address>
                                  4299 Express Lane
                                  <br />
                                  Sarasota,
                                  <br />
                                  FL 34249 USA <br />
                                  Phone: 1.941.227.4444
                                </address>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "account-details" ? "show active" : ""
                          }`}
                          id="account-details"
                          role="tabpanel"
                        >
                          <div className="my-account-account-details">
                            <form
                              className="edit-account"
                              action=""
                              method="post"
                            >
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
                                  Display name{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="input-text"
                                  name="account_display_name"
                                />
                                <span>
                                  <em>
                                    This will be how your name will be displayed
                                    in the account section and in reviews
                                  </em>
                                </span>
                              </p>
                              <div className="clear"></div>
                              <p className="form-row">
                                <label>
                                  Email address{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="email"
                                  className="input-text"
                                  name="account_email"
                                />
                              </p>
                              <fieldset>
                                <legend>Password change</legend>
                                <p className="form-row">
                                  <label>
                                    Current password (leave blank to leave
                                    unchanged)
                                  </label>
                                  <input
                                    type="password"
                                    className="input-text"
                                    name="password_current"
                                    autocomplete="off"
                                  />
                                </p>
                                <p className="form-row">
                                  <label>
                                    New password (leave blank to leave
                                    unchanged)
                                  </label>
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
                        </div>
                      </div>
                    </div>
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

export default MyAccount;

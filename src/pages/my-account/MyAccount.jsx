import React from "react";

const MyAccount = () => {
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
                              className="nav-link active"
                              data-toggle="tab"
                              href="#dashboard"
                              role="tab"
                            >
                              Dashboard
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#orders"
                              role="tab"
                            >
                              Orders
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#addresses"
                              role="tab"
                            >
                              Addresses
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#account-details"
                              role="tab"
                            >
                              Account details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="page-login.html">
                              Logout
                            </a>
                          </li>
                        </ul>
                      </nav>
                      <div className="my-account-content tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="dashboard"
                          role="tabpanel"
                        >
                          <div className="my-account-dashboard">
                            <p>
                              Hello <strong>Rosie</strong> (not{" "}
                              <strong>Rosie</strong>?{" "}
                              <a href="page-login.html">Log out</a>)
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
                          className="tab-pane fade"
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
                          className="tab-pane fade"
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
                          className="tab-pane fade"
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

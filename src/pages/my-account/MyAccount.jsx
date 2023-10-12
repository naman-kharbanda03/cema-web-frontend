import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountDetails from "../../components/my-account/account-details/AccountDetails";
import Address from "../../components/my-account/address/Address";
import Addresses from "../../components/my-account/addresses/Addresses";
import Dashboard from "../../components/my-account/dashboard/Dashboard";
import ForgotPassword from "../../components/my-account/forgot-password/ForgotPassword";
import OrdersTable from "../../components/my-account/ordersTable/OrdersTable";
import PageTitle from "../../components/page-tittle/PageTitle";
import { useContext } from "react";
import { UserData } from "../../context/UserContext";

const MyAccount = (props) => {
  const [orderDetails, setOrderDetails] = useState([{}]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const { SETLOGGEDIN } = useContext(UserData);

  const logoutHandler = () => {
    SETLOGGEDIN(false);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("tokenType");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const authToken = localStorage.getItem("accessToken");
  const fetchDetails = (apiUrl) => {
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
        setOrderDetails(data.orders);
        return data.orders;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  const handleOrdersDetails = () => {
    const apiUrl = "https://www.demo609.amrithaa.com/backend-cema/public/api/orders";
    // setOrderDetails(() => fetchDetails(apiUrl));
    console.log(orderDetails);
  };
  const handleAddress = () => {
    const apiUrl = "https://cema-backend.plasium.com/api/manageaddress";
  };
  useEffect(() => {
    setOrdersLoaded(true);
  }, [orderDetails]);

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            {/* Page Title */}
            <PageTitle current={"My Account"} />

            {/* Page Content */}
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
                              onClick={() => {
                                handleTabChange("orders");
                                // handleOrdersDetails();
                              }}
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
                              onClick={() => {
                                handleTabChange("addresses");
                                handleAddress();
                              }}
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
                            <a
                              className={`nav-link ${
                                activeTab === "forgot-password" ? "active" : ""
                              }`}
                              data-toggle="tab"
                              href="#forgot-password"
                              role="tab"
                              onClick={() => handleTabChange("forgot-password")}
                            >
                              Forgot Password
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="javascript:void(0)"
                              onClick={logoutHandler}
                            >
                              <a href="javascript:void(0)">Log out</a>
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
                          <Dashboard />
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "orders" ? "show active" : ""
                          }`}
                          id="orders"
                          role="tabpanel"
                        >
                          <OrdersTable orders={orderDetails} />
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "addresses" ? "show active" : ""
                          }`}
                          id="addresses"
                          role="tabpanel"
                          onClick={handleAddress}
                        >
                          <Addresses />
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "account-details" ? "show active" : ""
                          }`}
                          id="account-details"
                          role="tabpanel"
                        >
                          <AccountDetails />
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "forgot-password" ? "show active" : ""
                          }`}
                          id="forgot-password"
                          role="tabpanel"
                        >
                          <ForgotPassword />
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

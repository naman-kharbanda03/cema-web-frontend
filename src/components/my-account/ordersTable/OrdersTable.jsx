import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";





const OrdersTable = () => {

  const [orderDetails, setOrderDetails] = useState([]);
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

  useEffect(() => {
    const apiUrl = apiConfig.getOrderAPI;
    fetchDetails(apiUrl);
    console.log(orderDetails);
  }, []);

  return (
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
            {
              orderDetails.map(order => (
                <tr>
                  <td>#{order.order_id}</td>
                  <td>March 45, 2020</td>
                  <td>Processing</td>
                  <td>{order.currency}{' '}{order.grand_total} for {order.total_items} item</td>
                  <td>
                    <a href="#" className="btn-small d-block">
                      View
                    </a>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersTable;

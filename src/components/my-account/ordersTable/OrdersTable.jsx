import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";





const OrdersTable = () => {

  const [orderDetails, setOrderDetails] = useState([]);
  const authToken = localStorage.getItem("accessToken");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
    <>
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
                    <td>{order.order_date}</td>
                    <td>{order.order_status}</td>
                    <td>{order.currency}{' '}{order.grand_total} for {order.total_items} item</td>
                    <td>
                      <a href="#" className="btn-small d-block" onClick={() => openModal()}>
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
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none', zIndex: 1050 }}
        tabIndex=""
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Here comes the order details.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};
export default OrdersTable;

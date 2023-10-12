import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";





const OrdersTable = () => {

  const [orders, setOrders] = useState([]);

  const [orderDetails, setOrderDetails] = useState({});

  const authToken = localStorage.getItem("accessToken");
  const [showModal, setShowModal] = useState(false);


  const openModal = (product_id) => {
    // const apiUrl = apiConfig.orderDetailsAPI;
    const apiUrl = `https://www.demo609.amrithaa.com/backend-cema/public/api/orders/${product_id}`;

    const token = localStorage.getItem('accessToken');
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(data => {
        console.log("Order Deatils", data);
        setOrderDetails(orders.filter((a) => a.id === product_id)[0] || data.order);
        setShowModal(true);
      }).catch(error => console.error("Network Fetch Issue", error));
  }
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
        setOrders(data.orders);
        return data.orders;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    const apiUrl = apiConfig.getOrderAPI;
    fetchDetails(apiUrl);
    console.log(orders);
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
                orders.map(order => (
                  <tr>
                    <td>#{order.order_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.order_status}</td>
                    <td>{order.currency}{' '}{order.grand_total} for {order.total_items} item</td>
                    <td>
                      <a href="#" className="btn-small d-block" onClick={() => openModal(order.id)}>
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
              {/* {
                Object.keys(orderDetails).map((key) => (
                  < li key={key} >
                    <strong>{key}:</strong> {orderDetails[key]}
                  </li>
                ))} */}
                {Object.keys(orderDetails).map((key, index) =>{
                  return <p><strong>{key} : </strong>{orderDetails[key]}</p>
                })}
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

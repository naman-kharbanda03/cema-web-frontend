import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";





const OrdersTable = ({ orderId }) => {

  const [orders, setOrders] = useState([]);

  const [orderDetails, setOrderDetails] = useState({});

  const authToken = localStorage.getItem("accessToken");
  const [showModal, setShowModal] = useState(false);
  const { showInfoToastMessage } = useShoppingCart();


  const openModal = (id) => {
    // const apiUrl = apiConfig.orderDetailsAPI;
    const apiUrl = `https://www.demo609.amrithaa.com/backend-cema/public/api/orders/${id}`;

    const token = localStorage.getItem('accessToken');
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(data => {
        // console.log("Order Deatils", data);
        if (data.success === true) {
          setOrderDetails(data.order);
          setShowModal(true);
        } else {
          showInfoToastMessage('Error in loading details')
        }

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
        console.log(data.orders);
        setOrders(data.orders.data);
        return data.orders;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    const apiUrl = apiConfig.getOrderAPI;
    fetchDetails(apiUrl);
  }, []);
  useEffect(() => {
    if (orderId && orders?.length > 0) {
      let prodId = orders.filter((order) => order?.order_id === orderId)[0]?.id
      openModal(prodId)
      setShowModal(true)
    }
  }, [orders])
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
                orders?.map(order => (
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
              <h5 className="modal-title">Order Details <strong>{orderDetails?.order_id}</strong></h5>
              <button type="button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ height: 'fit-content' }}>
              <div style={{ height: '30%', display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <div style={{ height: '20%', textAlign: 'center', backgroundColor: '#f5f5f5', paddingTop: '5px' }}>
                    <h6 ><strong>Shipping Address</strong></h6>
                  </div>
                  <div style={{ margin: '10%', height: '50%' }}>
                    <h6><strong>{orderDetails?.shipping_address?.name},{' '}{orderDetails?.shipping_address?.phone}</strong></h6>
                    {orderDetails?.shipping_address?.address},<br />
                    {orderDetails?.shipping_address?.city},{orderDetails?.shipping_address?.state},{orderDetails?.shipping_address?.country}
                    <br />
                    {orderDetails?.shipping_address?.pin_code}
                  </div>
                </div>
                <div style={{ width: '50%' }}>
                  <div style={{ height: '20%', textAlign: 'center', backgroundColor: '#f5f5f5', paddingTop: '5px' }}>
                    <h6><strong >Billing Address</strong></h6>
                  </div>
                  <div style={{ margin: '10%', height: '50%' }}>
                    <h6><strong>{orderDetails?.billing_address?.name},{' '}{orderDetails?.billing_address?.phone}</strong></h6>
                    {orderDetails?.billing_address?.address},<br />
                    {orderDetails?.billing_address?.city},{orderDetails?.billing_address?.state},{orderDetails?.billing_address?.country}
                    <br />
                    {orderDetails?.billing_address?.pin_code}
                  </div>
                </div>
              </div>
              <div style={{ height: '10%', display: 'flex', backgroundColor: '#f5f5f5', textAlign: 'center', padding: '5px 0 5px 0' }}>
                <div style={{ width: '33%' }}>
                  <h6><strong>Transaction Id</strong></h6>{orderDetails?.transaction_id}
                </div>
                <div style={{ width: '33%' }}>
                  <h6><strong>Payment Method</strong></h6>{orderDetails?.payment_method}

                </div>
                <div style={{ width: '33%' }}>
                  <h6><strong>Date</strong></h6>{orderDetails?.order_date}

                </div>
              </div>
              <br />
              {orderDetails?.orderitems?.map(item => (
                <>
                  <div style={{ border: '1px solid #f5f5f5', backgroundColor: '#f5f5f5', height: '30%', marginBottom: '10px' }}>
                    <div style={{ height: '20%' }}>
                    </div>
                    <div style={{ height: '80%', }}>
                      <div style={{ margin: '4%', height: '70%', display: 'flex' }}>
                        <div style={{ width: '50%', display: 'flex' }}>
                          <div style={{ width: '40%' }}>
                            <img
                              src={item?.thumb_path + '/' + item?.product_thumb}
                              style={{ border: '1px solid', maxWidth: '100%', objectFit: 'fill' }}
                            />
                          </div>
                          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h6>{item?.product_name?.en}</h6>

                            Qty: {item?.qty}
                          </div>
                        </div>
                        <div style={{ width: '50%', marginLeft: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                          <h6>KD {item?.price}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <div style={{ backgroundColor: '#f5f5f5', height: '30%' }}>
                <div style={{ height: '70%', margin: '5%', display: 'flex', justifyContent: 'flex-end', padding: '10px 0 5px 0' }}>
                  <ul>
                    <li>
                      <h6><strong>Order Qty:</strong> {orderDetails?.total_qty}</h6>
                    </li>
                    <li>
                      <h6><strong>Tax:</strong> KD {orderDetails?.tax}</h6>{' '}
                    </li>
                    <li>
                      <h6><strong>Total:</strong> KD {orderDetails?.subtotal}</h6>{' '}
                    </li>
                  </ul>
                </div>
              </div>
              {/* {
                Object.keys(orderDetails).map((key) => (
                  < li key={key} >
                    <strong>{key}:</strong> {orderDetails[key]}
                  </li>
                ))} */}
              {/* {Object.keys(orderDetails)?.map((key, index) => {
                return <p><strong>{key} : </strong>{orderDetails[key]}</p>
              })} */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div >
    </>

  );
};
export default OrdersTable;

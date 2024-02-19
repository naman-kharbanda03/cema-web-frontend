import React, { useEffect, useState } from "react";
import apiConfig from "../../../config/apiConfig";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";





const OrdersTable = ({ orderId }) => {

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  const authToken = localStorage.getItem("accessToken");
  const [showModal, setShowModal] = useState(false);
  const { showInfoToastMessage } = useShoppingCart();
  const { t } = useTranslation();
  // const history = useHistory();


  // const openModal = (id) => {
  //   // const apiUrl = apiConfig.orderDetailsAPI;
  //   // Navigate()
  //   history.push(`/order-details?orderID=${id}`);
  // }
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
      // openModal(prodId)
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
                <th>{t("Account.Order")}</th>
                <th>{t("Account.Date")}</th>
                {/* <th>Status</th> */}
                <th>{t("Account.Total")}</th>
                <th>{t("Account.Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {
                orders?.map(order => (
                  <tr>
                    <td>#{order.order_id}</td>
                    <td>{order.order_date}</td>
                    {/* <td>{order.order_status}</td> */}
                    <td>{order.currency}{' '}{order.grand_total}{" "}{t("Account.for")}{" "} {order.total_items}{" "}{t("Account.items")}</td>
                    <td>
                      <Link to={`/order-details?orderID=${order.id}`} className="btn-small d-block" >
                        {t("Account.View")}
                      </Link>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>

    </>

  );
};
export default OrdersTable;

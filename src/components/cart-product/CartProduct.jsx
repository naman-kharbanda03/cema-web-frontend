import React, { useState } from "react";
import image from "../../asset/images/product/3.jpg";
import { Link } from "react-router-dom";

const CartProduct = (props) => {
  const { ordersData : orderData, orderQtyChanged } = props;
  const order = orderData
  const initialQty = order?.qty ? parseInt(order.qty) : 0;
  const [orderQnty, setOrderQnty] = useState(initialQty);
  console.log("akku", orderData);

  const increaseQty = () => {
    setOrderQnty(orderQnty + 1);
    increaseQtyUtils();
    orderQtyChanged && orderQtyChanged(orderQnty);
  }; // you can add up to max quantity allowed.

  const decreaseQty = () => {
    orderQnty !== 0 && setOrderQnty(orderQnty - 1);
    decreaseQtyUtils();
    orderQtyChanged && orderQtyChanged(orderQnty);
  };

  const increaseQtyUtils = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      quantity: orderQnty,
      id: order?.id,
      variant_id: "",
    };
    fetch("https://cema-backend.plasium.com/api/updateCartQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const decreaseQtyUtils = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      quantity: orderQnty,
      id: order?.id,
      type: order?.simple_product?.type,
      price: order?.simple_product?.price,
      offerprice: order?.simple_product?.offer_price,
    };
    fetch(`https://cema-backend.plasium.com/api/removeFromCart/${order?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  console.log("ordersData", order);
  return (
    <tr className="cart-item">
      <td className="product-thumbnail">
        <Link to={`/product-details?product_id=${order?.id}`}>
          <img
            width={600}
            height={600}
            src={`${orderData?.simple_product?.image_path}/${orderData?.simple_product?.product_image?.[0]}`}
            className="product-image"
            alt
          />
        </Link>
        <div className="product-name">
          <Link to={`/product-details?product_id=${order?.id}`}>
            {order?.simple_product?.product_name?.en}
          </Link>
        </div>
      </td>
      <td className="product-price">
        <span className="price">
          KD{order?.simple_product?.actual_selling_price}
        </span>
      </td>
      <td className="product-quantity">
        <div className="quantity">
          <button type="button" className="minus" onClick={() => decreaseQty()}>
            -
          </button>
          <input
            type="number"
            className="qty"
            step={1}
            min={0}
            max
            name="quantity"
            value={orderQnty}
            title="Qty"
            size={4}
            placeholder
            inputMode="numeric"
            autoComplete="off"
          />
          <button type="button" className="plus" onClick={() => increaseQty()}>
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">
        <span>KD{order?.simple_product?.actual_selling_price * orderQnty}</span>
      </td>
      <td className="product-remove">
        <a href="#" className="remove">
          ×
        </a>
      </td>
    </tr>
  );
};

export default CartProduct;

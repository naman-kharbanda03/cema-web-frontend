import React, { useState } from "react";
import image from "../../asset/images/product/3.jpg";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import apiConfig from "../../config/apiConfig";

const CartProduct = (props) => {
  const { ordersData: orderData, orderQtyChanged } = props;
  const order = orderData;
  const initialQty = order?.qty ? parseInt(order.qty) : 0;
  const [orderQnty, setOrderQnty] = useState(initialQty);
  const { setCartToggle, removeFromLocalCart, increaseItemInLocalCart, setCartItemsCount } = useShoppingCart();

  const increaseQty = () => {
    setOrderQnty(orderQnty + 1);
    increaseQtyUtils(orderQnty + 1);
    orderQtyChanged && orderQtyChanged(orderQnty);
  };

  const decreaseQty = () => {
    orderQnty !== 0 && setOrderQnty(orderQnty - 1);
    increaseQtyUtils(orderQnty - 1);
    orderQtyChanged && orderQtyChanged(orderQnty);
  };

  const removeProduct = () => {
    decreaseQtyUtils();
    orderQtyChanged && orderQtyChanged(orderQnty);
    orderQnty !== 0 && setOrderQnty(0);
  };

  const increaseQtyUtils = (qty) => {
    const bearerToken = localStorage.getItem("accessToken");
    let formData = {};
    console.log(qty);
    if (order?.variant_id) {
      formData = {
        quantity: qty,
        id: order?.cart_id,
        variant_id: order?.variant_id,
      };
    } else {
      formData = {
        quantity: qty,
        id: order?.cart_id,
      };
    }
    const apiUrl = apiConfig.updateCartAPI;
    if (bearerToken) {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.count);
          setCartItemsCount(parseInt(result.count));

        })
        .catch((error) => console.log("error", error));
    } else {
      const prod = {
        id: order?.product_id,
        type: order?.type,
      };
      increaseItemInLocalCart(qty - orderQnty, prod);
    }
  };

  const decreaseQtyUtils = () => {
    const bearerToken = localStorage.getItem("accessToken");
    const formdata = {
      quantity: orderQnty,
      id: order?.cart_it,
      type: order?.simple_product?.type,
      price: order?.simple_product?.price,
      offerprice: order?.simple_product?.offer_price,
    };
    const apiUrl = apiConfig.removeFromCartAPI;
    if (bearerToken) {
      fetch(`${apiUrl}/${order?.cart_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(formdata),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.count)
          setCartItemsCount(parseInt(result.count));
        })
        .catch((error) => console.log("error", error));
    } else {
      const prod = {
        id: order?.product_id,
        type: order?.type,
      };
      removeFromLocalCart(prod);
    }

  };

  return (
    <tr className="cart-item">
      <td className="product-thumbnail">
        <Link to={order?.link}>
          <img
            width={600}
            height={600}
            src={`${order?.image_path}/${order?.product_image}`}
            className="product-image"
            alt
          />
        </Link>
        <div className="product-name">
          <Link to={order?.link}>
            {order?.product_name?.en}
          </Link>
        </div>
      </td>
      <td className="product-price">
        <span className="price">
          KD {order?.price}
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
        <span>KD {Math.round((order?.price * orderQnty * 100)) / 100}</span>
      </td>
      <td className="product-remove">
        <a
          className="remove"
          onClick={() => removeProduct()}
          style={{ cursor: "pointer" }}
        >
          ×
        </a>
      </td>
    </tr>
  );
};

export default CartProduct;

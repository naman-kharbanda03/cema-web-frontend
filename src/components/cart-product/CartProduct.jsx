import React, { useEffect, useState } from "react";
import image from "../../asset/images/product/3.jpg";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import apiConfig from "../../config/apiConfig";

const CartProduct = (props) => {
  const { ordersData: orderData, orderQtyChanged, setOrders, setTotal, getCartDetails } = props;
  // const order = orderData;
  const [order, setOrder] = useState();
  // const initialQty = order?.qty ? parseInt(order.qty) : 0;
  // const [orderQnty, setOrderQnty] = useState(initialQty);
  const { setCartToggle, removeFromLocalCart, increaseItemInLocalCart, setCartItemsCount, showInfoToastMessage, showSuccessToastMessage } = useShoppingCart();

  useEffect(() => {
    setOrder(orderData);
  }, [orderData])

  const increaseQty = (id) => {
    // setOrderQnty(orderQnty + 1);       //Front end Change
    increaseQtyUtils(order.qty + 1).then(result => {
      if (result) {
        getCartDetails();
      }
    });   // Api call
    // orderQtyChanged && orderQtyChanged(orderQnty);   //idk
  };

  const decreaseQty = (id) => {
    // orderQnty !== 0 && setOrderQnty(orderQnty - 1);   // front end change
    increaseQtyUtils(order.qty - 1).then(result => {
      if (result) {
        getCartDetails();
      }
    });                 // api call
    // orderQtyChanged && orderQtyChanged(orderQnty);    // idk
  };

  const removeProduct = (id) => {
    decreaseQtyUtils(id)
      .then(result => {
        if (result) {
          getCartDetails();
        }
      });
  };

  const increaseQtyUtils = (qty) => {
    const bearerToken = localStorage.getItem("accessToken");
    let formData = {};
    // console.log(qty);
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
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            // console.log(result.count);
            // setCartItemsCount(parseInt(result.count));
            // setTotal(result.gtotal);
            showSuccessToastMessage('Quantity Updated');
            return true;
          }
          else {
            showInfoToastMessage(result.message);
          }

        })
        .catch((error) => console.log("error", error));
    } else {
      const prod = {
        id: order?.product_id,
        type: order?.type,
      };
      return increaseItemInLocalCart(qty - order?.qty, prod);
    }
  };

  const decreaseQtyUtils = (id) => {
    const bearerToken = localStorage.getItem("accessToken");
    const apiUrl = apiConfig.removeFromCartAPI;
    if (bearerToken) {
      return fetch(`${apiUrl}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        // body: JSON.stringify(formdata),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.count)
          if (result?.success === true) {
            showSuccessToastMessage(result.message);
            // setCartItemsCount(parseInt(result.count));
            return true;
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      const prod = {
        id: order?.product_id,
        type: order?.type,
      };
      return removeFromLocalCart(prod);
    }

  };
  // useEffect(()=>setOrderQnty(order.qty),[])

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
          <button type="button" className="minus" onClick={() => {
            if (order.qty === 1) showInfoToastMessage('Quantity atleast be one')
            else decreaseQty(order?.cart_id);
          }} >
            -
          </button>
          <input
            type="number"
            className="qty"
            step={1}
            min={0}
            max
            name="quantity"
            value={order?.qty}
            title="Qty"
            size={4}
            placeholder
            inputMode="numeric"
            autoComplete="off"
          />
          <button type="button" className="plus" onClick={() => {
            if (order.qty < order.max_order_limit) increaseQty(order.cart_id);
            else showInfoToastMessage('Product Maximum Quantity Reached');
          }
          }>
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">
        <span>KD {Math.round((order?.price * order?.qty * 100)) / 100}</span>
      </td>
      <td className="product-remove">
        <a
          className="remove"
          onClick={() => removeProduct(order?.cart_id)}
          style={{ cursor: "pointer" }}
        >
          ×
        </a>
      </td>
    </tr>
  );
};

export default CartProduct;

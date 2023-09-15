import React from "react";
import image from "../../asset/images/product/3.jpg"

const CartProduct = () => {
  return (
    <tr className="cart-item">
      <td className="product-thumbnail">
        <a href="shop-details.html">
          <img
            width={600}
            height={600}
            src={image}
            className="product-image"
            alt
          />
        </a>
        <div className="product-name">
          <a href="shop-details.html">Chair Oak Matt Lacquered</a>
        </div>
      </td>
      <td className="product-price">
        <span className="price">KD150.00</span>
      </td>
      <td className="product-quantity">
        <div className="quantity">
          <button type="button" className="minus">
            -
          </button>
          <input
            type="number"
            className="qty"
            step={1}
            min={0}
            max
            name="quantity"
            defaultValue={2}
            title="Qty"
            size={4}
            placeholder
            inputMode="numeric"
            autoComplete="off"
          />
          <button type="button" className="plus">
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">
        <span>KD300.00</span>
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

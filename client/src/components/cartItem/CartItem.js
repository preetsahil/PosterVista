import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./CartItem.scss";
import image from'../../assets/naruto.jpeg';

function CartItem() {
  return (
    <div className="CartItem">
      <div className="item-img">
        <img src={image} alt="" />
      </div>
      <div className="item-info-wrapper">
        <div className="item-info">
          <p className="title">dkjBDK kjbjh </p>
          <p className="price">₹ 349</p>
          <div className="quantity-selector">
            <span
              className="btn decrement"
            >
              -
            </span>
            <span className="quantity">2</span>
            <span
              className="btn increment"
            >
              +
            </span>
          </div>
          <p className="total-price">
            Subtotal: ₹45
          </p>
        </div>
        <div className="item-remove">
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}

export default CartItem;

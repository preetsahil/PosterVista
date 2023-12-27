import React from "react";
import { useNavigate } from "react-router";
import "./Product.scss";
import dummyImg from "../../assets/naruto.jpeg";

function Product({ product }) {
    const navigate = useNavigate();

  return (
    <div
      className="Product"
        onClick={() => navigate('/products/lk')}
    >
      <div className="product-container">
        <div className="product-img">
          <div className="img-container">
            <img src={dummyImg} alt="" id="img" />
          </div>
        </div>
        <div className="product-info">
          <p className="title">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Temporibus, inventore.
          </p>
          <p className="price">₹ 349</p>
        </div>
      </div>
    </div>
  );
}

export default Product;

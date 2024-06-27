import React, { useState, useEffect } from "react";
import "./cart.css";
import { useCart } from "../contextapi/contex";
import Accordian from "../accordian";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sliderproducts from "../sliderproducts/slproducts";

function Cart({ products }) {
  const { cartItems = [], updateCartQuantity, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const [isClicked, setIsClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!Cookies.get("auth") && !!token);
  }, []);

  const checkout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    const useremail = localStorage.getItem("email");
    console.log(useremail);
    if (!userId || !useremail) {
      console.error(
        "Missing user ID and useremail. User might not be authenticated properly."
      );
      toast.error("Missing user ID");
      return;
    }

    const order = {
      userId,
      useremail,
      cartItems: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        img: item.img,
        name: item.name,
      })),
      totalPrice,
    };

    console.log("Placing order with the following data:", order);

    try {
      toast.info("please confirm your order");
      navigate("/confirm", { state: { order } }); // Pass order data to confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again later.");
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    updateCartQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCoupon = () => {
    toast.error("You entered an expired token.");
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      return totalPrice;
    };
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <>
      <div className="main-class">
        <div className="row">
          <div className="main">
            <h2>Shopping Cart</h2>
            <h5>Title description, Dec 7, 2017</h5>
            <div className="cart-page">
              <h1>Cart</h1>
              {cartItems.length === 0 ? (
                <Link to="/">
                  <button className="continue-shopping" type="button">
                    Continue Shopping
                  </button>
                </Link>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                      <Link to={`/products/${item.id}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </Link>
                      <div className="cart-item-details">
                        <h3 className="name">{item.name}</h3>
                        <button
                          className="increment"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="incrementing"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <span>
                          <p className="price">${item.price * item.quantity}</p>
                        </span>
                        <button
                          className="remove"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <svg
                            id="deletion"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="side">
            <h2>Order Total</h2>
            <div className="fakeimg" style={{ height: "60px" }}>
              <h1 className="subtotal">Sub total: Rs {totalPrice}</h1>
            </div>
            <hr />

            <div className="fakeimg" style={{ height: "60px" }}>
              <h1 className="total">Total: Rs {totalPrice}</h1>
            </div>
            <br />
            <div className="fakeimg" style={{ height: "60px" }}>
              {isClicked ? (
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Coupon Code"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleCoupon}
                      id="handleCoupon"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : (
                <h3 onClick={handleClick} className="promo">
                  I have a promo code
                </h3>
              )}
            </div>
            <br />
            <div className="fakeimg" style={{ height: "60px" }}>
              <button
                onClick={checkout}
                id="checkout"
                type="button"
                className="btn btn-primary"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Accordian />
    </>
  );
}

export default Cart;

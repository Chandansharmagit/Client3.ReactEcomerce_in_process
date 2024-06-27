import React, { useState } from "react";
import { useCart } from "../contextapi/contex";
export default function Checoutaddress() {
  const [isClicked, setIsClicked] = useState(false);
  const { showingdata } = useCart();
  const handleClick = () => {};
  const handleCoupon = () => {};

  const { checkingout } = useCart();
  const checkout = () => {
    checkingout();
  };
  const showdata = () => {
    showingdata();
  };

  return (
    <div>
      <div className="container-checkout-price">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            pay with fonepay
          </label>
          <button onClick={showdata}>clikck me</button>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            pay after order shipped
          </label>
        </div>
        <div className="payment-gateway">
          <div className="side">
            <h2>Order Total</h2>
            <div className="fakeimg" style={{ height: "60px" }}>
              <h1 className="subtotal">Sub total: Rs </h1>
            </div>
            <hr />
            <div className="fakeimg" style={{ height: "60px" }}>
              <h1 className="total">Total: Rs</h1>
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
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleCoupon}
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
    </div>
  );
}

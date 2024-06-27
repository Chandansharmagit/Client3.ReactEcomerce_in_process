import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './confirmation.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('phone'); // Default payment method

  if (!order || !order.cartItems || order.cartItems.length === 0) {
    return (
      <div className="order-confirmation-container">
        <h1>Order Confirmation</h1>
        <p>No order details found.</p>
      </div>
    );
  }

  const handleConfirmOrder = async () => {



    try {
      if (paymentMethod === 'esewa') {
        // Initiate eSewa payment
        const response = await axios.get(
          `http://localhost:5000/initiate-payment?amount=${order.totalPrice}&productId=${order.id}`
        );

        const { paymentUrl } = response.data;
        window.location.href = paymentUrl; // Redirect to eSewa payment gateway
      } else {
        // For other payment methods (phone or doorstep)
        const response = await axios.post('http://localhost:5000/placeOrder', order);
        console.log('Response from server:', response);
        toast.success("order placed sucess")

        if (response.status === 200) {
          toast.success('Your order has been confirmed successfully!');
          navigate('/');
        } else {
          toast.error('Failed to confirm order. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      toast.error('Failed to confirm order. Please try again later.');
    }
  };

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      <div className="order-items">
        {order.cartItems.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.img} alt={item.name} className="order-item-image" />
            <div className="order-item-details">
              <p className="name">{item.name}</p>
              <p className="quantity">Quantity: {item.quantity}</p>
              <p className="price">Price: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-total">
        <p>Total Price: ${order.totalPrice}</p>
      </div>
      <div className="payment-options">
        <h2>Select Payment Method</h2>
        <div className="payment-option">
          <input
            type="radio"
            id="phonePayment"
            name="paymentMethod"
            value="phone"
            checked={paymentMethod === 'phone'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="phonePayment">Phone Payment</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="doorstepPayment"
            name="paymentMethod"
            value="doorstep"
            checked={paymentMethod === 'doorstep'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="doorstepPayment">Doorstep Payment</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="esewaPayment"
            name="paymentMethod"
            value="esewa"
            checked={paymentMethod === 'esewa'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="esewaPayment">eSewa Payment</label>
        </div>
      </div>
      <button className="confirm-order-button" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default OrderConfirmation;

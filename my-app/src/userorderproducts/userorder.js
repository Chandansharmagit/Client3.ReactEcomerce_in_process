import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userorders.css"; // Ensure you have appropriate styles

export default function UserOrderProducts() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage (assuming you store it there after login)
        if (!userId) {
          // Handle case where userId is not available
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/userorderproducts?userId=${userId}`
        );
        setEvents(response.data.reverse()); // Reverse to display latest events first
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or user feedback here
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/userorderproducts/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="border">
      <div className="container line">
        <h1 className="hq">Your Orders</h1>
      </div>

      <div className="events-container">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            {event.items.map((item, index) => (
              <div className="event-card__item" key={index}>
                <div className="event-card__img">
                  <img src={item.img} alt="Item" />
                </div>
                <div className="event-card__content">
                  <h2>User ID: {event.userId}</h2>
                  <h2>Item ID: {item.itemId}</h2>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {event.status}</p>
                  <button
                    className="cancel-order"
                    onClick={() => handleDelete(event._id)}
                  >
                    Cancel order within 1 day
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

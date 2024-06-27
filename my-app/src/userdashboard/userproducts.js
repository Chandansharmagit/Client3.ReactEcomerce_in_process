import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userproducts.css";

export default function Userproducts() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get(
          "http://localhost:5000/userproducts"
        );
        setEvents(eventsResponse.data.reverse());

        const userIds = eventsResponse.data.map((event) => event.userId);
        const uniqueUserIds = [...new Set(userIds)];

        const userPromises = uniqueUserIds.map(async (userId) => {
          const userResponse = await axios.get(
            `http://localhost:5000/user?userId=${userId}`
          );
          return { [userId]: userResponse.data };
        });

        const usersData = await Promise.all(userPromises);
        const mergedUsers = usersData.reduce(
          (acc, user) => ({ ...acc, ...user }),
          {}
        );

        setUsers(mergedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateEvent = async (eventId, updatedEventData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/userproducts/${eventId}`,
        updatedEventData
      );
      console.log("Event updated:", response.data);

      // Update state after successful update
      const updatedEvents = events.map((event) =>
        event._id === eventId ? { ...event, ...updatedEventData } : event
      );

      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleUpdateStatus = async (eventId, newStatus, userEmail) => {
    try {
      const updatedEventData = { status: newStatus, email: userEmail };
      console.log(updatedEventData);

      const response = await axios.put(
        `http://localhost:5000/userproducts/${eventId}`,
        updatedEventData
      );
      console.log("Event status updated:", response.data);

      // Update state after successful update
      const updatedEvents = events.map((event) =>
        event._id === eventId ? { ...event, status: newStatus } : event
      );

      setEvents(updatedEvents);

      // Send email to user
      const emailResponse = await axios.post(
        "http://localhost:5000/sendEmail",
        {
          userEmail,
          subject: "Order Status Update",
          text: `Dear customer, your order status has been updated to ${newStatus}.`,
        }
      );
      console.log("Email sent:", emailResponse.data);
    } catch (error) {
      console.error("Error updating event status or sending email:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/userproducts/${eventId}`
      );
      console.log("Event deleted:", response.data);

      // Update state after successful deletion
      const updatedEvents = events.filter((event) => event._id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="border">
      <div className="container line">
        <h1 className="hq">Total Orders</h1>
      </div>

      <div className="events-container">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            {event.items.map((item, index) => (
              <div className="event-card__item" key={index}>
                <div className="event-card__img">
                  <img src={`${item.img}`} alt="" />
                </div>
                <div className="event-card__content">
                  <h2>User ID: {event.userId}</h2>
                  {users[event.userId] && (
                    <>
                      <p>Email: {users[event.userId].email}</p>
                      <p>User Name: {users[event.userId].name}</p>
                      <p>Contact: {users[event.userId].phone}</p>
                      <p>City: {users[event.userId].city}</p>
                      <p>Zipcode: {users[event.userId].zipcode}</p>
                    </>
                  )}
                  <h2>Item ID: {item.itemId}</h2>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {event.status}</p>
                  <div>
                    {/* Update event status */}
                    <input
                      type="text"
                      placeholder="New Status"
                      value={event.status || ""}
                      onChange={(e) =>
                        handleUpdateEvent(event._id, {
                          ...event,
                          status: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          event._id,
                          "Order in Pending",
                          users[event.userId]?.email
                        )
                      }
                    >
                      Set Pending
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          event._id,
                          "Order Confirmed",
                          users[event.userId]?.email
                        )
                      }
                    >
                      Set Confirmed
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          event._id,
                          "Order Placed",
                          users[event.userId]?.email
                        )
                      }
                    >
                      Set Placed
                    </button>

                    {/* Delete event */}
                    <button onClick={() => handleDeleteEvent(event._id)}>
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

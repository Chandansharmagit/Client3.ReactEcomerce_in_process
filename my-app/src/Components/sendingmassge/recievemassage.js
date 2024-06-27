import React, { useState, useEffect } from "react";
import axios from "axios";

const Receiver = () => {
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/messages");
            setReceivedMessages(response.data.messages);
            console.log(receivedMessages)
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    return (
        <div>
            <h2>Received Messages</h2>
            <ul>
                {receivedMessages.map((receivedMessage, index) => (
                    <li key={index}>{receivedMessage}</li>
                ))}

                <h3>{receivedMessages}</h3>
            </ul>
        </div>
    );
};

export default Receiver;

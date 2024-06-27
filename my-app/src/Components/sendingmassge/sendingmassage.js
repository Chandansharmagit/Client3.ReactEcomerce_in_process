import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const Sender = () => {
    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState(
        JSON.parse(localStorage.getItem("receivedMessages")) || []
    );
    const socket = socketIOClient("http://localhost:5000");

    const sendMessage = () => {
        socket.emit("message", message);
        setMessage("");
    };

    useEffect(() => {
        socket.on("message", (message) => {
            const updatedMessages = [...receivedMessages, message];
            setReceivedMessages(updatedMessages);
            localStorage.setItem(
                "receivedMessages",
                JSON.stringify(updatedMessages)
            );
        });
    }, [receivedMessages]);

    const replyToMessage = (reply) => {
        socket.emit("message", reply);
    };

    return (
        <div>
            <h2>Send Message</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <h2>Received Messages</h2>
            <ul>
                {receivedMessages.map((receivedMessage, index) => (
                    <li key={index}>
                        {receivedMessage}
                        <button onClick={() => replyToMessage(receivedMessage)}>
                            Reply
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sender;

import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Accordian from "../accordian";

function Sendingemail() {

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Fixed typo here

    try {
      const response = await axios.post(
        "http://localhost:5000/forgot_email", // Use http unless your backend supports https with a valid certificate
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Email sent successfully");
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    }
  };

  return (
    <div>
      <div className="body-body">
        <div className="containers">
          <div className="cards">
            <h2 id="login-h2">Send Link</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button type="submit" id="login-pass">
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Accordian/>
    </div>
  );
}

export default Sendingemail;

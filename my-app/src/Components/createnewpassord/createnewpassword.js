import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import Accordian from "../accordian"; // Ensure this path is correct

function Sendingpassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
  });
  const { id, token } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/createpassword/${id}/${token}`, // Ensure this matches your backend route
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Password changed successfully");
        navigate("/login");
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("Failed to change password");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="body-body">
        <div className="containers">
          <div className="cards">
            <h2 id="login-h2">Enter New Password</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <label htmlFor="password">Enter new password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" id="login-pass">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Accordian />
    </div>
  );
}

export default Sendingpassword;

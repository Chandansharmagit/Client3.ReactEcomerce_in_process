import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import Accordian from "./accordian";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, userId, email } = response.data; // Retrieve token, userId, and email from response

      // Store token, userId, and email in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email); // Store email in localStorage

      const expirationTime = 6 / 24; // 6 hours in days
      Cookies.set("auth", JSON.stringify({ email }), {
        expires: expirationTime,
      });

      console.log(response.data);
      console.log("The user is " + userId);
      toast.success("Login success");
      navigate("/");
    } catch (error) {
      console.error("There was an error logging in!", error);
      setError("Please enter your email and reset your password for user authentication thank you..");
      toast.error("Please enter your email and reset your password for user authentication thank you..");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createnew = () => {
    navigate("/register");
  };

  const forgot_password = () => {
    navigate("/send-email");
  };

  return (
    <>
      <div className="body-body">
        <div className="containers">
          <div className="cards">
            <h2 id="login-h2">Login</h2>
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
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" id="login-pass">
                Login
              </button>

              <button type="button" className="forgot-pass" onClick={createnew}>
                Create New Account
              </button>

              <button
                type="button"
                className="forgot-pass"
                onClick={forgot_password}
              >
                Forgot password
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
      <Accordian />
    </>
  );
}

import React, { useState } from "react";
import "../css/register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Accordian from "./accordian";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    address: "",
    state: "",
    zipcode: "",
    city: "",
    image: null,
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    setUser({ ...user, image: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user.password !== user.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in user) {
        formData.append(key, user[key]);
      }

      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("There was an error registering the user! Please try again.");
    }
  };

  return (
    <>
      <div className="body-register">
        <form method="POST" id="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputs}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={handleInputs}
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={handleInputs}
            required
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={user.state}
            onChange={handleInputs}
            required
          />

          <label htmlFor="zipcode">ZipCode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={user.zipcode}
            onChange={handleInputs}
            required
          />

          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputs}
            required
          />

          <label htmlFor="phone">Contact Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputs}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputs}
            required
          />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInputs}
            required
          />

          <label>
            <h6>Upload your Profile image</h6>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Accordian />
    </>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../navbar/head.css";
import { Navigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="header">
        <div className="row">
          <div className="col">
            <div className="title">
              <h3 className="smart" onClick={click}>
                New LuxeLiving and{" "}
                <span className="furntures">Smart Furniture </span>
              </h3>
            </div>{" "}
          </div>
          <div className="col">
            <body>
              <div className="search-bar">
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search products."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="30"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                  id="search_id"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </body>
          </div>
        </div>
      </div>
    </div>
  );
}

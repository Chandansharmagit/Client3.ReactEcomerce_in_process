import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userprofile.css";

function Userprofile() {
  const [events, setEvents] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/userprofile_id?userId=${userId}`
        );
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []); // [] means this effect runs once on mount, add userId if you want it to change

  return (
    <>
      <div className="HELL" id="your">
        <div className="container line">
          <h1 className="hq">User Profile</h1>
        </div>
        {events.map((profile, index) => ( // Change `index` to `profile`
          <div className="container emp-profile" key={index}>
            <div className="grid-container">
              <div className="profile-card">
                <div className="profile-img">
                  <img
                    src={`http://localhost:5000${profile.image}`}
                    alt="Virat Kohli"
                    className="players-image"
                  />
                </div>
                <div className="profile-info">
                  <div className="profile-head">
                    <h5>{profile.name}</h5> {/* Adjust with actual profile data */}
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="profile-tab"
                          data-toggle="tab"
                          href="#profile"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Timeline
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-details">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <label>Total Orders</label>
                          </div>
                          <div className="col-md-6">
                            <p className="detailing">{profile.totalOrders}</p> {/* Replace with actual data */}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <label>Vouchers</label>
                          </div>
                          <div className="col-md-6">
                            <p className="detailing">{profile.vouchers}</p> {/* Replace with actual data */}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p className="detailing">{profile.email}</p> {/* Replace with actual data */}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <label>Address</label>
                          </div>
                          <div className="col-md-6">
                            <p className="detailing">{profile.address}</p> {/* Replace with actual data */}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <label>My Cancellation</label>
                          </div>
                          <div className="col-md-6">
                            <p className="detailing">{profile.cancellation}</p> {/* Replace with actual data */}
                          </div>
                        </div>
                        <hr className="hr" />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <br />
                            <hr />
                            <p className="detailing">
                              {/* Add timeline content if applicable */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Userprofile;

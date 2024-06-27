import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "./al.css";
import { Autoplay, Pagination } from "swiper/modules"; // Removed Navigation module

export default function Almuni() {
  //getting the data from the database with the get method in react js to backend ndoe js using the axio metjod

  //fetchin the another data into the chandan sharma

  return (
    <>
      <div className="name_pregiantion_slider">
        <h2 className="background double">
          <span>Feedack from Customer</span>
        </h2>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]} // Excluded Navigation module
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="parent-container">
            <blockquote className="responsive-quote">
              <p>
                Amidst a flood of text, well-crafted blockquotes stand out as
                beacons of sophistication, inviting readers to pause,
                contemplate, and savor the artful use of words. They not only
                elevate the visual appeal of content but also underscore the
                significance of thoughtful communication in a bustling digital
                landscape.
              </p>{" "}
              <cite>&mdash; Codepen Sammie</cite>
            </blockquote>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="parent-container">
            <blockquote className="responsive-quote">
              <p>
                Amidst a flood of text, well-crafted blockquotes stand out as
                beacons of sophistication, inviting readers to pause,
                contemplate, and savor the artful use of words. They not only
                elevate the visual appeal of content but also underscore the
                significance of thoughtful communication in a bustling digital
                landscape.
              </p>{" "}
              <cite>&mdash; Codepen Sammie</cite>
            </blockquote>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="parent-container">
            <blockquote className="responsive-quote">
              <p>
                Amidst a flood of text, well-crafted blockquotes stand out as
                beacons of sophistication, inviting readers to pause,
                contemplate, and savor the artful use of words. They not only
                elevate the visual appeal of content but also underscore the
                significance of thoughtful communication in a bustling digital
                landscape.
              </p>{" "}
              <cite>&mdash; Codepen Sammie</cite>
            </blockquote>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="parent-container">
            <blockquote className="responsive-quote">
              <p>
                Amidst a flood of text, well-crafted blockquotes stand out as
                beacons of sophistication, inviting readers to pause,
                contemplate, and savor the artful use of words. They not only
                elevate the visual appeal of content but also underscore the
                significance of thoughtful communication in a bustling digital
                landscape.
              </p>{" "}
              <cite>&mdash; Codepen Sammie</cite>
            </blockquote>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="parent-container">
            <blockquote className="responsive-quote">
              <p>
                Amidst a flood of text, well-crafted blockquotes stand out as
                beacons of sophistication, inviting readers to pause,
                contemplate, and savor the artful use of words. They not only
                elevate the visual appeal of content but also underscore the
                significance of thoughtful communication in a bustling digital
                landscape.
              </p>{" "}
              <cite>&mdash; Codepen Sammie</cite>
            </blockquote>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="parent-container">
            <blockquote className="responsive-quote">
              <p>
                Amidst a flood of text, well-crafted blockquotes stand out as
                beacons of sophistication, inviting readers to pause,
                contemplate, and savor the artful use of words. They not only
                elevate the visual appeal of content but also underscore the
                significance of thoughtful communication in a bustling digital
                landscape.
              </p>{" "}
              <cite>&mdash; Codepen Sammie</cite>
            </blockquote>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

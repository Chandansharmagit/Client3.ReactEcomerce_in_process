import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./sl.css";
import { Link } from "react-router-dom";

export default function Sliderproducts({ products }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(products ? products.length : 0); // Handle undefined product
  const prependNumber = useRef(1);

  // Create initial slides based on the product array
  const [slides, setSlides] = useState(
    products ? Array.from({ length: products.length }).map((_, index) => index) : [] // Handle undefined product
  );

  const prepend = () => {
    setSlides([
      prependNumber.current - 2,
      prependNumber.current - 1,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, appendNumber.current++]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };


  return (
    <>
      {products && ( // Check if product exists
        <Swiper className="swipers"
          modules={[Virtual, Navigation, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
      
          navigation={true}
          virtual
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {products[index] && (
                <Link to="/products">
                  <img
                    src={products[index].img}
                    alt={`Product ${index + 1}`}
                    className="images-sliderr"
                  />
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

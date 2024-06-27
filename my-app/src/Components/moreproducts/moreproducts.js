import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import './moreproducts.css';
import { Pagination } from 'swiper/modules';

export default function Moreproducts({ products }) {
    const [slides, setSlides] = useState(Array.from({ length: products ? products.length : 0 }).map((_, index) => index));

    return (
        <>
            <Swiper 
                slidesPerView={1}
                spaceBetween={10}
              
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                
                className="mySwipers"
            >
                {slides.map((index) => (
                    <SwiperSlide key={index}>
                        {products && products[index] && (
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
        </>
    );
}

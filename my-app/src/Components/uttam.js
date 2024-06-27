import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import '../css/thakur.css';
import dd from '../images/0029989_slider-2.jpeg';
import cd from '../images/0032303_0030038_slider-3.jpeg.png';
import ff from '../images/0032305_bed.png';
import rr from '../images/0032309_dining banner.png';
// import required modules
import { Autoplay,  Navigation } from 'swiper/modules';

export default function Uttam() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
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
                navigation={true}
                modules={[Autoplay,  Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >

                <SwiperSlide> <img src={dd} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide> <img src={rr} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide> <img src={ff} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide><img src={dd} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide><img src={ff} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide><img src={dd} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide><img src={ff} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide><img src={dd} className='images_slider'alt="" /></SwiperSlide>
                <SwiperSlide><img src={ff} className='images_slider'alt="" /></SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>

                    </svg>
                    <span ref={progressContent} className='buttonss'></span>
                </div>
            </Swiper>
        </>
    );
}

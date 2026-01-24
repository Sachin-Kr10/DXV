import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";
import img3 from "../../assets/img/3.png";

const slides = [
  { id: 1, img: img1, title: "Winter Collection" },
  { id: 2, img: img2, title: "Luxury Essentials" },
  { id: 3, img: img3, title: "Modern Classics" },
  { id: 4, img: img1, title: "Timeless Fashion" },
  { id: 5, img: img2, title: "Signature Styles" },
];

function ImageSlider() {
  return (
    <div className=" bg-[#E5E5E5]">
    <section className="bg-[#E5E5E5] py-6 sm:py-6 homebox">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        centeredSlides
        slidesPerView={1.25}
        spaceBetween={20}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1.4 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 1.5 },
        }}
        className="luxury-swiper px-4"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="group relative h-[240px] sm:h-[320px] lg:h-[420px] rounded-xl overflow-hidden bg-[#1A1A1A] transition-all duration-500">
              <img
                src={slide.img}
                alt={slide.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] via-transparent to-transparent" />

              <div className="absolute bottom-10 left-[70%]">
                <h3 className="text-[#F7F7F7] text-sm sm:text-base font-medium tracking-wide">
                  {slide.title}
                </h3>

                <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C9A24D] px-4 py-1.5 text-xs uppercase tracking-widest text-[#C9A24D] transition hover:bg-[#C9A24D] hover:text-[#0B0B0B]">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    </div>
  );
}

export default ImageSlider;

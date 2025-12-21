import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import BannerBox from "../bannerbox";

// Dummy Images
import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";

const adsData = [
  { id: 1, img: img1, title: "Luxury Leather" },
  { id: 2, img: img2, title: "Modern Fashion" },
  { id: 3, img: img1, title: "Premium Watches" },
  { id: 4, img: img2, title: "Gold Accessories" },
  { id: 5, img: img1, title: "Designer Bags" },
  { id: 6, img: img2, title: "Minimal Wear" },
  { id: 7, img: img1, title: "Exclusive Drop" },
  { id: 8, img: img2, title: "Street Luxury" },
  { id: 9, img: img1, title: "Limited Edition" },
  { id: 10, img: img2, title: "Timeless Style" },
  { id: 11, img: img1, title: "Elite Collection" },
  { id: 12, img: img2, title: "Modern Classic" },
];

function AdsBannerSlider() {
  return (
    <section className="bg-[#E5E5E5] py-6">
      <div className="homebox mx-auto px-4">
       
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1, // Mobile
            },
            768: {
              slidesPerView: 2, // Tablet
            },
            1024: {
              slidesPerView: 3, // Desktop
            },
          }}
          className="pb-6  mySwiper"
        >
          {adsData.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerBox img={item.img} title={item.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default AdsBannerSlider;

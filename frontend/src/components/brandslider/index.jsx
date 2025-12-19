import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/img/1.jpg"
import img2 from "../../assets/img/2.jpg"
import "swiper/css";

const brands = [
  { id: 1, name: "Leather Watch", logo: img1 },
  { id: 2, name: "Rolling Diamond", logo: img2 },
  { id: 3, name: "Wooden Chair", logo: img1 },
  { id: 4, name: "Sneakers", logo: img1 },
  { id: 5, name: "Luxury Purse", logo: img1 },
  { id: 6, name: "Gaming Gear", logo: img1},
  { id: 7, name: "Premium Bags", logo: img1 },
  { id: 8, name: "Fashion Wear", logo: img1 },
  { id: 9, name: "Fashion Wear", logo: img1 },
  { id: 10, name: "Fashion Wear", logo: img1 },
  { id: 11, name: "Fashion Wear", logo: img1 },
  { id: 12, name: "Fashion Wear", logo: img1 },
  { id: 13, name: "Fashion Wear", logo: img1 },
  { id: 14, name: "Fashion Wear", logo: img1 },
  { id: 15, name: "Fashion Wear", logo: img1 },
  { id: 16, name: "Fashion Wear", logo: img1 },
];

const themes = [
  "bg-gradient-to-br from-[#FFF7E8] to-[#F3E7C6]",
  "bg-gradient-to-br from-[#F7F7F7] to-[#EAEAEA]",
  "bg-gradient-to-br from-[#F1F5FF] to-[#E3E9FF]",
  "bg-gradient-to-br from-[#FDF2F2] to-[#FCE7E7]",
  "bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5]",
];

const BrandSlider = () => {
  return (
    <section className="bg-[#F7F7F7] py-12">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-[#0B0B0B]">
            Brand <span className="text-[#C9A24D]">Store</span>
          </h1>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Curated premium brands for modern fashion
          </p>
        </div>

        <div className="flex gap-2">
          <button className="brand-prev w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#C9A24D] hover:text-white transition">
            <FiChevronLeft size={18} />
          </button>
          <button className="brand-next w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#C9A24D] hover:text-white transition">
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesPerGroup={1}
          freeMode={true}
          grabCursor={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".brand-prev",
            nextEl: ".brand-next",
          }}
          modules={[Autoplay, FreeMode, Navigation]}
        >
          {brands.map((brand, i) => (
            <SwiperSlide
              key={brand.id}
              className="!w-[150px] sm:!w-[170px] md:!w-[180px]"
            >
              <div
                className={`
                  group
                  ${themes[i % themes.length]}
                  border border-[#E5E5E5]
                  rounded-xl
                  p-4
                  flex flex-col items-center justify-center
                  transition-all duration-300
                  hover:border-[#C9A24D]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                `}
              >
                <div className="w-35 h-25 flex items-center justify-center mb-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>

                <p className="text-xs text-center tracking-wide text-[#1A1A1A] font-medium">
                  {brand.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BrandSlider;

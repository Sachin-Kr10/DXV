import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "swiper/css";

import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";

const brands = [
  { id: 1, name: "AUREX", logo: img1 },
  { id: 2, name: "VELORÉ", logo: img2 },
  { id: 3, name: "NOXEN", logo: img1 },
  { id: 4, name: "ELVYN", logo: img1 },
  { id: 5, name: "ZÉNTRA", logo: img1 },
  { id: 6, name: "ORVIA", logo: img1 },
  { id: 7, name: "LUXYN", logo: img1 },
  { id: 8, name: "VIREN", logo: img1 },
  { id: 9, name: "MONEXA", logo: img1 },
  { id: 10, name: "KAVÉN", logo: img1 },
  { id: 11, name: "SOLVÉ", logo: img1 },
  { id: 12, name: "ARVYN", logo: img1 },
  { id: 13, name: "NÉVRA", logo: img1 },
  { id: 14, name: "OPHYN", logo: img1 },
  { id: 15, name: "VÉRIX", logo: img1 },
  { id: 16, name: "LORÉN", logo: img1 },
];

const themes = [
  "bg-gradient-to-br from-[#FFF7E8] to-[#F3E7C6]",
  "bg-gradient-to-br from-[#F7F7F7] to-[#EAEAEA]",
  "bg-gradient-to-br from-[#F1F5FF] to-[#E3E9FF]",
  "bg-gradient-to-br from-[#FDF2F2] to-[#FCE7E7]",
  "bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5]",
];

const BrandSlider = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
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
          spaceBetween={28}
          freeMode
          grabCursor
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
                onClick={() => setSelectedBrand(brand.id)}
                className={`
                  group relative cursor-pointer
                  ${themes[i % themes.length]}
                  border-2 rounded-xl p-4
                  flex flex-col items-center justify-center
                  transition-all duration-300
                  ${
                    selectedBrand === brand.id
                      ? "border-[#C9A24D] border-3 shadow-[0_10px_35px_rgba(201,162,77,0.35)]"
                      : "border-[#E5E5E5] hover:border-[#C9A24D]"
                  }
                `}
              >
                {selectedBrand === brand.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBrand(null);
                    }}
                    className="
                      absolute top-2 right-2
                      w-6 h-6 rounded-full
                    bg-[#C9A24D] text-[#0B0B0B]
                      flex items-center justify-center
                      shadow-md
                      hover:bg-white hover:text-[#C9A24D]
                      transition
                      z-10
                    "
                  >
                    <IoClose size={14} />
                  </button>
                )}

                <div className="w-35 h-24 flex items-center justify-center mb-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`
                      max-w-full max-h-full transition duration-300
                      ${
                        selectedBrand === brand.id
                          ? "grayscale-0"
                          : "grayscale group-hover:grayscale-0"
                      }
                    `}
                  />
                </div>

                <p
                  className={`
                    text-xs tracking-wide font-medium
                    ${
                      selectedBrand === brand.id
                        ? "text-[#0B0B0B]"
                        : "text-[#1A1A1A]"
                    }
                  `}
                >
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

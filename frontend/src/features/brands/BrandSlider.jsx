import React, { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "swiper/css";
import api from "../../api/api";

import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";


const themes = [
  "bg-gradient-to-br from-[#FFF7E8] to-[#F3E7C6]",
  "bg-gradient-to-br from-[#F7F7F7] to-[#EAEAEA]",
  "bg-gradient-to-br from-[#F1F5FF] to-[#E3E9FF]",
  "bg-gradient-to-br from-[#FDF2F2] to-[#FCE7E7]",
  "bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5]",
];

function BrandSlider({filters, setFilters}){
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

useEffect(()=>{
  api.get("/nav/brands",{
    params:{
      mainCategory:filters?.mainCategory || "all",
    },
  })
  .then((res)=>{
    setBrands(res.data);
  })
  .catch((err)=>{
    console.log("Failed to load brand",err)
  })
},[filters?.mainCategory])


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
              key={brand.slug}
              className="!w-[150px] sm:!w-[170px] md:!w-[180px]"
            >
              <div
                onClick={() => {
                  setSelectedBrand(brand.slug);
                  setFilters((prev) => ({
                    ...prev,
                    brand: brand.slug,
                    prodCategory: null,
                    subCategory: null,
                  }));
                }}
                className={`
                  group relative cursor-pointer
                  ${themes[i % themes.length]}
                  border-2 rounded-xl p-4
                  flex flex-col items-center justify-center
                  transition-all duration-300
                  ${
                    selectedBrand === brand.slug
                      ? "border-[#C9A24D] border-3 shadow-[0_10px_35px_rgba(201,162,77,0.35)]"
                      : "border-[#E5E5E5] hover:border-[#C9A24D]"
                  }
                `}
              >
                {selectedBrand === brand.slug && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBrand(null);
                      setFilters((prev) => ({
                        ...prev,
                        brand: null,
                        prodCategory: null,
                        subCategory: null,
                      }));
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

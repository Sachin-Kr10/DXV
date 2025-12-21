import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";
import "swiper/css";

const categories = [
  { id: 1, name: "Watches", image: img1 },
  { id: 2, name: "Jewellery", image: img2 },
  { id: 3, name: "Furniture", image: img1 },
  { id: 4, name: "Footwear", image: img1 },
  { id: 5, name: "Handbags", image: img1 },
  { id: 6, name: "Gaming", image: img1 },
  { id: 7, name: "Bags", image: img1 },
  { id: 8, name: "Fashion", image: img1 },
  { id: 8, name: "Fashion", image: img1 },
  { id: 8, name: "Fashion", image: img1 },
  { id: 8, name: "Fashion", image: img1 },
  { id: 8, name: "Fashion", image: img1 },
];

const CategorySlider = () => {
  return (
    <section className="bg-[#F7F7F7] py-12">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B0B0B]">
            Shop by <span className="text-[#C9A24D]">Category</span>
          </h1>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Explore trending fashion categories
          </p>
        </div>

        <div className="flex gap-2">
          <button className="category-prev w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#C9A24D] hover:text-white transition">
            <FiChevronLeft size={18} />
          </button>
          <button className="category-next w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#C9A24D] hover:text-white transition">
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={1}
          freeMode
          grabCursor
          
          navigation={{
            prevEl: ".category-prev",
            nextEl: ".category-next",
          }}
          modules={[Autoplay, FreeMode, Navigation]}
        >
          {categories.map((cat) => (
            <SwiperSlide
              key={cat.id}
              className="!w-[125px] sm:!w-[135px] md:!w-[138px]"
            >
              <div className="group flex flex-col items-center">
     
                <div
                  className="
                    w-25 h-25 md:w-28 md:h-28
                    rounded-full
                    overflow-hidden
                    border-2 border-[#E5E5E5]
                    bg-white
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:scale-105 
                    group-hover:shadow-[0_12px_30px_rgba(201,222,77,0.35)]
                    group-hover:border-[#C9A24D]
                  "
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                <p className="mt-3 text-xs md:text-sm font-medium tracking-wide text-[#1A1A1A]">
                  {cat.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySlider;

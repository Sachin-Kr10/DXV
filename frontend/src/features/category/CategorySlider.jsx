import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import { useEffect,useState } from "react";
import api from "../../api/api"


function CategorySlider() {

  const [categories,setCategories]= useState([]);
  useEffect(() => {
    api.get("/categories")
    .then((res) => {
      setCategories(res.data);
    })
    .catch((error) => {
      console.log("failed to lead ctegories", error);
    });
  },[]);

const [selectedCategory, setSelectedCategory] = useState(null);


  return (
    <section className="bg-[#F7F7F7] py-14">
      <div className="max-w-7xl mx-auto px-4 mb-2 flex items-center justify-between">
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
              key={cat._id}
              className="!w-[125px] sm:!w-[135px] md:!w-[138px]"
            >
              <div className="group flex flex-col items-center mt-6">
                <div
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`
                  w-25 h-25 md:w-28 md:h-28
                  rounded-full
                  overflow-hidden
                 bg-white
                  flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                 ${
                  selectedCategory === cat._id
                  ? "border-2 border-[#C9A24D] scale-105 shadow-[0_12px_30px_rgba(201,162,77,0.35)]"
                  : "border-2 border-[#E5E5E5] group-hover:scale-105 group-hover:border-[#C9A24D]"
                 }`}
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

                <p className={`mt-3 text-xs md:text-sm font-medium tracking-wide ${
                 selectedCategory === cat._id
                  ? "text-[#C9A24D]"
                  : "text-[#1A1A1A]"}`}>
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

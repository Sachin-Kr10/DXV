import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import ProductItem from "./ProductCard";
// Dummy products
const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  brand: "Souled Store",
  title: "Oversize Black Printed T-Shirt Oversize Black Printed T-Shirt",
  price: 1000,
  discountedPrice: 800,
  discount: 20,
  img1: "/src/assets/images/1.jpg",
  img2: "/src/assets/images/2.jpg",
}));

function ProductSlider() {
  return (
    <section className="bg-[#F7F7F7] ">
      <div className="max-w-7xl mx-auto px-4 pb-15">
        <Swiper
          spaceBetween={40}
          freeMode
          grabCursor
          modules={[FreeMode, Navigation]}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="h-full">
                <ProductItem product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ProductSlider;

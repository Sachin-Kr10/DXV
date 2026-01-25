import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import api from "../../api/api";
import ProductItem from "./ProductCard";

function ProductSlider({ filters, tag }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get("/products", {
        params: {
          mainCategory: filters.mainCategory,
          brand: filters.brand || undefined,
          prodCategory: filters.prodCategory || undefined,
          subCategory: filters.subCategory || undefined,
          sort: tag,
        },
      })
      .then((res) => {
        const normalized = res.data.map((p) => {
          const mrp = p.mrp || p.price;
          const price = p.price;

          const discount =
            mrp > price
              ? Math.round(((mrp - price) / mrp) * 100)
              : 0;

          const images =
            p.variants?.[0]?.images?.length > 0
              ? p.variants[0].images
              : ["/placeholder.jpg"];

          return {
            _id: p._id,
            slug:p.slug,
            title: p.title,
            brand: p.brand,
            price,
            mrp,
            discount,
            discountedPrice: price,
            img1: images[0],
            img2: images[1] || images[0],
          };
        });

        setProducts(normalized);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    filters.mainCategory,
    filters.brand,
    filters.prodCategory,
    filters.subCategory,
    tag,
  ]);

  if (!loading && products.length === 0) return null;
  return (
    <section className="bg-[#F7F7F7]">
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
            <SwiperSlide key={product._id}>
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

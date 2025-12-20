import React, { useState } from "react";
import { FiHeart, FiMaximize2 } from "react-icons/fi";
import { CgMaximizeAlt } from "react-icons/cg";
function ProductItem({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-[#FFFFFF] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="relative h-[280px] overflow-hidden bg-[#E5E5E5]">
        <span className="absolute top-3 left-3 z-10 bg-[#0B0B0B] text-[#F7F7F7] text-xs px-2 py-1 rounded-md">
          {product.discount}% OFF
        </span>

        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 ">

          <button
            onClick={() => setLiked(!liked)}
            className="
              w-8.5 h-8.5 rounded-full
              flex items-center justify-center
              bg-[#F7F7F7]/15 backdrop-blur-md
              shadow-sm
              transition-all duration-300
              hover:scale-110
            "
          >
            <FiHeart
              size={18}
              className={`transition-all duration-300 ${
                liked
                  ? "fill-[#C9A24D] text-[#C9A24D] scale-110"
                  : "fill-transparent text-[#0B0B0B]"
              }`}
            />
          </button>

          <button
            className="
              w-8.5 h-8.5 rounded-full
              flex items-center justify-center
              bg-[#F7F7F7]/20 backdrop-blur-md
              shadow-sm
              transition-all duration-300
              hover:scale-110
            "
          >
            <CgMaximizeAlt size={18} className="text-[#0B0B0B]" />
          </button>
        </div>

        <img
          src={product.img1}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.img2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-[#8E8E8E]">
          {product.brand}
        </p>

        <h3 className="text-sm font-medium text-[#1A1A1A] mt-1 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#0B0B0B] font-semibold">
            ₹{product.discountedPrice}
          </span>
          <span className="text-sm text-[#C9A24D] line-through">
            ₹{product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

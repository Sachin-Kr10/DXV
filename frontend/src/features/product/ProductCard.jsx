import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { CgMaximizeAlt } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router";

function ProductItem({ product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  return (

     
    <div className="group bg-white  rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-[#E5E5E5] overflow-hidden">

        <span className="absolute top-2 left-2 z-10 bg-[#0B0B0B] text-white text-[10px] sm:text-xs px-2 py-1 rounded-md">
          {product.discount}% Off
        </span>

        <div
          className="
            absolute top-3 right-3 z-10 flex flex-col gap-2
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <button
            onClick={() => setLiked(!liked)}
            className="
              w-8 h-8 sm:w-9 sm:h-9
              rounded-full flex items-center justify-center
              bg-white/20 backdrop-blur-md shadow-sm
              transition-all hover:scale-110
            "
          >
            <FiHeart
              size={20}
              className={`transition-all ${
                liked
                  ? "fill-[#c94d4d] text-[#c94d4d]"
                  : "fill-transparent text-[#0B0B0B]/80"
              }`}
            />
          </button>

          <button
            className="
              w-8 h-8 sm:w-9 sm:h-9
              rounded-full flex items-center justify-center
              bg-white/20 backdrop-blur-md shadow-sm
              transition-all hover:scale-110
            "
          >
            <CgMaximizeAlt size={20} className="text-[#0B0B0B]/70" />
          </button>
        </div>

        <Link to="/product">
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
        </Link>
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8E8E8E]">
          {product.brand}
        </p>

        <h3 className="text-sm sm:text-[15px] font-medium text-[#1A1A1A] mt-1 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mt-2 mx-1">
          <span className="text-[#0B0B0B] font-semibold text-sm sm:text-base">
            ₹{product.discountedPrice}
          </span>
          <span className="text-xs sm:text-sm text-[#C9A24D] line-through">
            ₹{product.price}
          </span>
        </div>
        <button
      onClick={() => setAdded(!added)}
      className="
        mt-2 w-full
        flex items-center justify-center gap-2
        py-2 rounded-full
        bg-[#0B0B0B] text-white
        border-2 border-transparent
        text-xs font-medium
        transition-all
        hover:text-[#C9A24D] hover:border-[#C9A24D]
        active:scale-95
      "
    >
      {!added && <FaOpencart size={15} />}
      <span className="inline-block w-[90px] text-center">
        {added ? <Link to="/cart">Go To Cart</Link> : "Add To Cart"}
      </span>
      {added && <FaOpencart size={15} />}
    </button>
      </div>
    </div>
  );
}

export default ProductItem;

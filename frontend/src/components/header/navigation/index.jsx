import React from "react";
import Button from "@mui/material/Button";
import { RiMenuSearchLine } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";

const categories = [
  { label: "Home", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
  { label: "Trending", value: "trending" },
  { label: "Sale", value: "sale" },
  { label: "Footwear", value: "footwear" },
  { label: "Winter Wear", value: "winter" },
  { label: "Accessories", value: "accessories" },
];

function Navigation({ activeCategory, setActiveCategory }) {
  return (
    <nav className="bg-[#FFFFFF] border-b border-[#E5E5E5]">
      <div
        className="
          max-w-[1400px]
          mx-auto
          h-[56px] lg:h-[64px]
          flex items-center
          px-3 sm:px-6 lg:px-10
        "
      >
        <div className="flex items-center shrink-0">
          <Button
            className="
              !min-w-0
              !px-2 lg:!px-3
              !h-[40px]
              flex items-center gap-2
              !text-[#0B0B0B]
              hover:!bg-[#F7F7F7]
            "
          >
            <RiMenuSearchLine className="text-[18px]" />
            <span className="hidden lg:inline font-inter text-[14px] tracking-wide">
              Shop by Categories
            </span>
            <LiaAngleDownSolid className="hidden lg:inline text-[14px]" />
          </Button>
        </div>

        <div className="flex-1 overflow-x-auto scrollbar-hide ml-2 lg:ml-6">
          <ul
            className="
              flex items-center
              gap-6 lg:gap-8
              whitespace-nowrap
              font-['Manrope']
              text-[14px] lg:text-[15px]
              tracking-wide
              leading-none
            "
          >
            {categories.map((cat) => (
              <li key={cat.value} className="flex items-center">
                <button
                  onClick={() => setActiveCategory(cat.value)}
                  className={`
                    relative h-[40px] flex items-center
                    transition-all duration-300
                    ${
                      activeCategory === cat.value
                        ? "text-[#C9A24D]"
                        : "text-[#1A1A1A] hover:text-[#C9A24D]"
                    }
                  `}
                >
                  {cat.label}
                  {activeCategory === cat.value && (
                    <span className="absolute left-0 bottom-1 w-full h-[1px] bg-[#C9A24D]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

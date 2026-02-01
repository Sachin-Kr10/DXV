import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { RiMenuSearchLine } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import api from "../../api/api";

function MainCategory({filters, setFilters}) {
  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadMainCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/nav/maincategories");
        setMainCategories([
          {name:"Home",slug:"all"},
          ...res.data,
        ]);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };

    loadMainCategories();
  }, []);

  const handleSelect = (slug) => {
    setFilters({
      mainCategory:slug,
      brand:null,
      prodCategory:null,
      subCategory:null,
    })
  };

  return (
    <nav className="bg-white border-b border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto h-[56px] lg:h-[64px] flex items-center px-3 sm:px-6 lg:px-10">
        <Button className="!min-w-0 !px-2 lg:!px-3 !h-[40px] flex items-center gap-2 !text-[#0B0B0B] hover:!bg-[#F7F7F7]">
          <RiMenuSearchLine className="text-[18px]" />
          <span className="hidden lg:inline text-[14px]">
            Shop by Categories
          </span>
          <LiaAngleDownSolid className="hidden lg:inline text-[14px]" />
        </Button>

        <div className="flex-1 overflow-x-auto hide-scrollbar ml-2 lg:ml-6">
          <ul className="flex items-center gap-6 lg:gap-8 whitespace-nowrap text-[14px] lg:text-[15px]">
            {loading && <li className="text-gray-400">Loading...</li>}

            {!loading &&
              mainCategories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => handleSelect(cat.slug)}
                    className={`relative h-[40px] flex items-center transition-all duration-300 ${
                      filters.mainCategory === cat.slug
                        ? "text-[#C9A24D]"
                        : "text-[#1A1A1A] hover:text-[#C9A24D]"
                    }`}
                  >
                    {cat.name}
                    {filters.mainCategory === cat.slug && (
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

export default MainCategory;

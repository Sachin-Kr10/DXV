import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function RelatedProduct() {
   const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  const categories = [
  "New Arrivals",
  "Watches",
  "Bags",
  "Shoes",
  "Men",
  "Women",
  "Accessories",
  "Jewellery",
  "Sunglasses",
  "Perfumes",
  "Limited",
  "Sale",
];

  return (
    <>
    <section className="bg-[#F7F7F7] pt-12 pb-6 ">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B0B0B]">
            Related<span className="text-[#C9A24D]">Products</span>
          </h1>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Do not miss the offer
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
    </section>
    </>
  )
}

export default RelatedProduct;
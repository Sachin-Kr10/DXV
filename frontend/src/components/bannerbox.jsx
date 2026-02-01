import React from 'react'
import {Link} from 'react-router'


function BannerBox({ img, title }){
  return (
    <Link to="/" className="group block">
      <div className="relative overflow-hidden rounded-xl bg-[#FFFFFF] border border-[#E5E5E5] shadow-sm transition-all duration-500 hover:shadow-lg">
        <img
          src={img}
          alt={title}
          className="w-full h-[220px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-[#000000]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[#F7F7F7] text-sm tracking-widest uppercase">
            {title}
          </p>
          <span className="block w-8 h-[1px] mt-2 bg-[#C9A24D]" />
        </div>
      </div>
    </Link>
  );
};
export default BannerBox
import React from 'react'
import HomeSlider from '../../components/homeslider'
import BrandSlider from '../../components/brandslider'
import CategorySlider from '../../components/categoryslider';
import { CiDeliveryTruck } from "react-icons/ci";
import AdsBannerSlider from '../../components/adsbannerslider';
function Home() {
  return (
    <>
    <HomeSlider/>
    <BrandSlider/>
    <section className="bg-[#E5E5E5] py-6 md:py-6">
    <div className="homebox mx-auto ">
    <div
      className="
        flex flex-col gap-4
        md:flex-row md:items-center md:justify-between
        bg-[#FFFFFF]
        border border-[#C9A24D]
        rounded-lg
        px-5 py-5 md:px-10
      "
    >

      <div className="flex items-center gap-3 md:text-center">
        <CiDeliveryTruck className="text-[28px] text-[#C9A24D]" />
        <span className="text-[15px] md:text-[20px] font-[600] text-[#0B0B0B]">
          Free Shipping
        </span>
      </div>

      <div className="text-center md:text-center">
        <p className="text-[10px] md:text-[15px] text-[#8E8E8E] font-[500]">
          Free delivery on your first order above
          <span className="text-[#0B0B0B] font-[400]"> ₹1000</span>
        </p>
      </div>

      <div className="text-center md:text-center">
        <span className="text-[15px] md:text-[20px] font-bold text-[#1A1A1A]">
          Order Now
        </span>
      </div>
    </div>
    </div>
    </section>
    <CategorySlider></CategorySlider>
    <AdsBannerSlider></AdsBannerSlider>
    </>
  )
}

export default Home
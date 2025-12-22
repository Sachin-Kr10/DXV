import React from 'react'
import Navigation from '../../components/header/navigation';
import ImageSlider from '../../components/imageslider'
import BrandSlider from '../../components/brandslider'
import CategorySlider from '../../components/categoryslider';
import { CiDeliveryTruck } from "react-icons/ci";
import AdsBannerSlider from '../../components/adsbannerslider';
import PopularCategorySlider from '../../components/popularcategoryslider';
import ProductSlider from '../../components/productsslider';
import InstaPic from '../../components/instapic';
import ProductPopup from '../../components/productpopup';

import img from '../../assets/img/1.jpg'
function Home() {
  return (
    <>
    <Navigation></Navigation>
    <ImageSlider/>
    <BrandSlider/>
    <section className="bg-[#E5E5E5] py-6 md:py-6">
    <div className="homebox mx-auto ">
    <div
      className="
        flex flex-row 
        md:flex-row md:items-center md:justify-between
        bg-[#FFFFFF]
        border border-[#C9A24D]
        rounded-lg    
        px-3 py-5 md:px-10
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
    <CategorySlider/>
    <AdsBannerSlider slide={3}/>
    <PopularCategorySlider tag="Popular" />
    <ProductSlider/>
    {/* <ProductPopup></ProductPopup> */}
    <section className="bg-[#E5E5E5] py-8">
  <div className="homebox mx-auto">
    <div
      className="
        flex flex-col md:flex-row md:items-center md:justify-between
        bg-[#FFFFFF]
        border border-[#C9A24D]
        rounded-lg
        h-[120px]
        overflow-hidden
      "
    >
      <img
        src={img}
        alt=""
        className="
          w-full h-full
          object-fill
          rounded-lg
        "
      />
    </div>
  </div>
</section>

    <PopularCategorySlider tag="Latest"/>
    <ProductSlider/>
    <AdsBannerSlider slide={2}/>
    <PopularCategorySlider tag="Featured"/>
    <ProductSlider/>
    <InstaPic/>
    </>
  )
}

export default Home
import React from "react";
import {
  LiaShippingFastSolid,
  LiaUndoAltSolid,
  LiaLockSolid,
  LiaGiftSolid,
  LiaHeadsetSolid,
  LiaMoneyBillWaveSolid,
} from "react-icons/lia";

const features = [
  {
    icon: <LiaShippingFastSolid />,
    title: "Free Shipping",
    desc: "On all orders above ₹1000",
  },
  {
    icon: <LiaUndoAltSolid />,
    title: "7 Days Return",
    desc: "Easy & hassle-free returns",
  },
   {
    icon: <LiaGiftSolid />,
    title: "Special Gifts",
    desc: "Exclusive offers for members",
  },
  {
    icon: <LiaLockSolid />,
    title: "Secured Payment",
    desc: "100% safe & encrypted",
  },
 
  {
    icon: <LiaHeadsetSolid />,
    title: " 24/7  Support",
    desc: "We’re always here to help",
  },
  {
    icon: <LiaMoneyBillWaveSolid />,
    title: "Cash on Delivery",
    desc: "COD available nationwide",
  },
];

function FooterFeature() {
  return (
    <footer className="bg-[#E5E5E5] border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2"            >
              <div className="text-[#C9A24D] text-[34px]">
                {item.icon}
              </div>

              <h3 className="text-[14px] font-semibold text-[#0B0B0B] tracking-wide">
                {item.title}
              </h3>

              <p className="text-[12px] text-[#8E8E8E] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterFeature;

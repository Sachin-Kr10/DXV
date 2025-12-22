import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FooterSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E5E5] md:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          py-4
          md:py-0
          md:cursor-default
          text-left
        "
      >
        <h4 className="text-[14px] font-medium text-[#0B0B0B]">
          {title}
        </h4>
        <FiChevronDown
          className={`
            md:hidden
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          md:block
          ${open ? "max-h-[500px] pb-4" : "max-h-0 md:max-h-full"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

function Footer() {
  return (
    <footer className="bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 ">
          <FooterSection title="Contact Us">
            <div className="space-y-2 text-[13px] text-[#8E8E8E]">
              <p>DXV - Mega Super Store</p>
              <p>Gurgaon</p>
              <p>India</p>
              <a
                href="mailto:sachinjnv100@gmail.com"
                className="block hover:text-[#0B0B0B]"
              >
                Sachin@dxv.com
              </a>
              <a
                href="tel:+919876543210"
                className="block text-[#C9A24D] font-medium"
              >
                (+91) 9625-9739-56
              </a>

              <a
                href="https://wa.me/9625973956"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[#0B0B0B] font-medium"
              >
                Online Chat <br />
                <span className="text-[#8E8E8E] font-normal">
                  Get Expert Help
                </span>
              </a>
            </div>
          </FooterSection>

          <FooterSection title="Products">
            <ul className="space-y-2 text-[13px] text-[#8E8E8E]">
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Popular Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Latest Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Featured Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Stores
                </a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection title="Our Company">
            <ul className="space-y-2 text-[13px] text-[#8E8E8E]">
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B0B0B]">
                  Login/signUp
                </a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection title="Subscribe To Newsletter">
            <p className="text-[13px] text-[#8E8E8E] mb-4">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>

            <input
              type="email"
              placeholder="Your Email Address"
              className="
                w-full
                border border-[#E5E5E5]
                px-3 py-2
                text-[13px]
                outline-none
                focus:border-[#C9A24D]
              "
            />

            <button
              className="
                mt-3
                w-full
                bg-[#C9A24D]
                text-[#000000]
                text-[13px]
                font-medium
                py-2
              "
            >
              SUBSCRIBE
            </button>

            <label className="flex items-start gap-2 mt-3 text-[11px] text-[#8E8E8E]">
              <input type="checkbox" className="mt-1 accent-[#C9A24D]" />I agree to the terms and
              conditions and the privacy policy
            </label>
          </FooterSection>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E5E5E5] text-center">
          <p className="text-[12px] text-[#8E8E8E]">
            © {new Date().getFullYear()} DXV All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

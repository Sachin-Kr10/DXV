import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";

export default function ProductPopup({ onClose }) {

  const product = {
    id: 1,
    category: "Men · Hoodies",
    title: "Loose Fit Hoodie",
    price: 2499,
    mrp: 3999,
    discount: "38% OFF",

    variants: {
      Black: {
        colorHex: "#0B0B0B",
        images: [
          "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg",
          "https://images.pexels.com/photos/6311386/pexels-photo-6311386.jpeg",
          "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
          "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg",
          "https://images.pexels.com/photos/6311389/pexels-photo-6311389.jpeg",
        ],
        sizes: ["S", "M", "L"],
      },

      White: {
        colorHex: "#FFFFFF",
        images: [
          "https://images.pexels.com/photos/5325884/pexels-photo-5325884.jpeg",
          "https://images.pexels.com/photos/5325885/pexels-photo-5325885.jpeg",
          "https://images.pexels.com/photos/5325886/pexels-photo-5325886.jpeg",
          "https://images.pexels.com/photos/5325887/pexels-photo-5325887.jpeg",
          "https://images.pexels.com/photos/5325888/pexels-photo-5325888.jpeg",
        ],
        sizes: ["M", "XL"],
      },
    },

    shipping: {
      delivery: "3–5 Business Days",
      returns: "7 Days Easy Return",
    },

    description:
      "Premium loose-fit hoodie crafted from soft cotton-blend fabric with brushed interior and relaxed silhouette.",
  };


  const availableColors = Object.keys(product.variants);

  const [color, setColor] = useState(availableColors[0]);
  const [activeImage, setActiveImage] = useState(
    product.variants[color].images[0]
  );
  const [size, setSize] = useState(
    product.variants[color].sizes[0]
  );
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setActiveImage(product.variants[color].images[0]);
    setSize(product.variants[color].sizes[0]);
  }, [color]);

  const currentVariant = product.variants[color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/40 backdrop-blur-sm">

      <div className="relative w-[90%] max-w-5xl max-h-[90vh] bg-[#FFFFFF]
        rounded-2xl shadow-xl overflow-y-auto p-4 sm:p-6 lg:p-8
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#000000] text-[#FFFFFF] flex items-center justify-center"
        >
          <IoClose size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="px-10">

            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#E5E5E5]">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-3">
              {currentVariant.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border
                    ${activeImage === img
                      ? "border-[#C9A24D]"
                      : "border-[#E5E5E5]"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">

            <span className="text-xs text-[#8E8E8E] uppercase tracking-wide">
              {product.category}
            </span>

            <h2 className="text-2xl font-semibold text-[#1A1A1A]">
              {product.title}
            </h2>


            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-[#0B0B0B]">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm line-through text-[#8E8E8E]">
                ₹{product.mrp.toLocaleString()}
              </span>
              <span className="text-sm text-[#C9A24D] font-medium">
                {product.discount}
              </span>
            </div>

            <div>
              <p className="text-sm mb-2">Color</p>
              <div className="flex gap-3">
                {availableColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border
                      ${color === c
                        ? "border-[#C9A24D]"
                        : "border-[#E5E5E5]"}`}
                    style={{ background: product.variants[c].colorHex }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm mb-2">Size</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((s) => {
                  const available = currentVariant.sizes.includes(s);
                  return (
                    <button
                      key={s}
                      disabled={!available}
                      onClick={() => available && setSize(s)}
                      className={`w-10 h-10 rounded-full text-sm font-medium
                        ${
                          size === s && available
                            ? "bg-[#0B0B0B] text-[#FFFFFF]"
                            : available
                            ? "bg-[#F7F7F7] text-[#8E8E8E]"
                            : "bg-[#E5E5E5] text-[#8E8E8E] opacity-40 cursor-not-allowed"
                        }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="w-9 h-9 rounded-full bg-[#F7F7F7]"
                >
                  −
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 rounded-full bg-[#F7F7F7]"
                >
                  +
                </button>
              </div>
            </div>

            <button className="group relative w-full flex items-center justify-center gap-2
              py-3 rounded-full bg-[#0B0B0B] text-[#FFFFFF] text-sm font-medium">
              <FaOpencart size={16} />
              Add to Cart
            </button>

            <details className="border-t pt-4 text-sm">
              <summary className="cursor-pointer font-medium">
                Shipping & Returns
              </summary>
              <div className="mt-2 grid grid-cols-2 gap-4 text-[#8E8E8E]">
                <div>
                  <b className="text-[#1A1A1A]">Delivery</b><br />
                  {product.shipping.delivery}
                </div>
                <div>
                  <b className="text-[#1A1A1A]">Returns</b><br />
                  {product.shipping.returns}
                </div>
              </div>
            </details>

            <details className="border-t pt-4 text-sm">
              <summary className="cursor-pointer font-medium">
                Description & Fit
              </summary>
              <p className="mt-2 text-[#8E8E8E]">
                {product.description}
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
}

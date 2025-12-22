import { useState, useEffect } from "react";
import { FaOpencart, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import RelatedProduct from "../relatedproduct";

export default function ProductDetailPage() {
  /* ================= PRODUCT DATA ================= */
  const product = {
    id: 1,
    category: "Men · Hoodies",
    title: "Loose Fit Hoodie",
    price: 2499,
    mrp: 3999,
    discount: "38% OFF",
    description:
      "Premium loose-fit hoodie crafted from soft cotton-blend fabric with brushed interior and relaxed silhouette.",
    shipping: {
      delivery: "3–5 Business Days",
      returns: "7 Days Easy Return",
    },
    variants: {
      Black: {
        colorHex: "#0B0B0B",
        images: [
          "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg",
          "https://images.pexels.com/photos/6311386/pexels-photo-6311386.jpeg",
          "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
          "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg",
        ],
        sizes: ["S", "M", "L"],
      },
      White: {
        colorHex: "#FFFFFF",
        images: [
          "https://images.pexels.com/photos/5325884/pexels-photo-5325884.jpeg",
          "https://images.pexels.com/photos/5325885/pexels-photo-5325885.jpeg",
        ],
        sizes: ["M", "XL"],
      },
    },
  };

  /* ================= REVIEWS ================= */
  const reviews = [
    { id: 1, name: "Rahul", rating: 5, text: "Amazing quality and fit." },
    { id: 2, name: "Aman", rating: 4, text: "Fabric feels premium." },
    { id: 3, name: "Karan", rating: 5, text: "Looks very luxury." },
    { id: 4, name: "Sahil", rating: 4, text: "Worth the price." },
    { id: 5, name: "Nikhil", rating: 5, text: "Perfect oversized hoodie." },
  ];

  /* ================= STATE ================= */
  const colors = Object.keys(product.variants);
  const [color, setColor] = useState(colors[0]);
  const [activeImage, setActiveImage] = useState(
    product.variants[color].images[0]
  );
  const [size, setSize] = useState(product.variants[color].sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setActiveImage(product.variants[color].images[0]);
    setSize(product.variants[color].sizes[0]);
  }, [color]);

  const variant = product.variants[color];
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  return (
    <>
    <section className="bg-[#F7F7F7] py-8 sm:py-6">
      <div className="max-w-6xl mx-auto px-2 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
        <div className="lg:sticky lg:top-24">
          <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-4 ">
            <div className="hidden lg:flex flex-col gap-6">
              {variant.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`rounded-lg overflow-hidden border transition
            ${activeImage === img ? "border-[#C9A24D]" : "border-[#E5E5E5]"}`}
                >
                  <img
                    src={img}
                    className="w-full aspect-square object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>

            <div className="aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#E5E5E5]">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3 lg:hidden">
            {variant.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`rounded-lg overflow-hidden border
          ${activeImage === img ? "border-[#C9A24D]" : "border-[#E5E5E5]"}`}
              >
                <img src={img} className="aspect-square object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-wider text-[#8E8E8E]">
            {product.category}
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl sm:text-2xl font-semibold text-[#0B0B0B]">
              ₹{product.price}
            </span>
            <span className="line-through text-[#8E8E8E]">₹{product.mrp}</span>
            <span className="text-sm font-medium text-[#C9A24D]">
              {product.discount}
            </span>
          </div>
          <div>
            <p className="text-sm mb-2">Color</p>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full border ${
                    color === c ? "border-[#C9A24D]" : "border-[#E5E5E5]"
                  }`}
                  style={{ background: product.variants[c].colorHex }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Size</p>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((s) => {
                const available = variant.sizes.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!available}
                    onClick={() => available && setSize(s)}
                    className={`w-11 h-11 rounded-full text-sm font-medium ${
                      size === s
                        ? "bg-[#0B0B0B] text-[#FFFFFF]"
                        : available
                        ? "bg-[#F7F7F7]"
                        : "bg-[#E5E5E5] opacity-40"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="w-10 h-10 rounded-full bg-[#E5E5E5]"
            >
              −
            </button>
            <span>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 rounded-full bg-[#E5E5E5]"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setAdded(!added)}
            className="
              mt-2 w-full
              flex items-center justify-center gap-2
              py-2.5
              rounded-full
              bg-[#0B0B0B] text-white
              border-2 border-transparent
              text-xs font-medium
              transition-all duration-300
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

          <p className="text-sm text-[#8E8E8E]">{product.description}</p>

          <div className="border-t border-[#E5E5E5] pt-6 flex flex-col sm:flex-row gap-4 sm:justify-between text-sm">
            <div>
              <p className="font-medium text-[#1A1A1A]">Delivery</p>
              <p className="text-[#8E8E8E]">{product.shipping.delivery}</p>
            </div>
            <div>
              <p className="font-medium text-[#1A1A1A]">Returns</p>
              <p className="text-[#8E8E8E]">{product.shipping.returns}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-14 sm:mt-20">
        <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

        <div className="space-y-4">
          {visibleReviews.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E5E5]"
            >
              <div className="flex gap-1 mb-1">
                {[...Array(r.rating)].map((_, i) => (
                  <FaStar key={i} className="text-[#C9A24D]" />
                ))}
              </div>
              <p className="text-sm font-medium text-[#1A1A1A]">{r.name}</p>
              <p className="text-sm text-[#8E8E8E]">{r.text}</p>
            </div>
          ))}
        </div>

        {reviews.length > 4 && (
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="mt-6 text-sm text-[#C9A24D]"
          >
            {showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
          </button>
        )}

        <div className="mt-12 p-6 bg-[#FFFFFF] rounded-2xl border border-[#E5E5E5]">
          {!submitted ? (
            <>
              <h4 className="font-medium mb-4">Write a Review</h4>

              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    <FaStar
                      size={20}
                      className={
                        star <= rating ? "text-[#C9A24D]" : "text-[#E5E5E5]"
                      }
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="w-full border border-[#E5E5E5] rounded-lg p-3 text-sm focus:outline-none focus:border-[#C9A24D]"
              />

              <button
                disabled={rating === 0 || reviewText === ""}
                onClick={() => setSubmitted(true)}
                className="mt-4 w-full sm:w-auto px-6 py-2 rounded-full bg-[#0B0B0B] text-white text-sm disabled:opacity-40"
              >
                Submit Review
              </button>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg font-medium text-[#1A1A1A]">
                Thank you for your review ✨
              </p>
              <p className="text-sm text-[#8E8E8E] mt-1">
                Your feedback helps other shoppers.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
    <RelatedProduct RelatedProduct/>
    </>
  );
}

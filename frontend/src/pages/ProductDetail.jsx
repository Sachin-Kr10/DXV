import { useState, useEffect } from "react";
import { FaOpencart,FaStar,FaChevronLeft,FaChevronRight,} from "react-icons/fa";
import { Link,useParams ,useNavigate} from "react-router";
import RelatedProduct from "../features/product/RelatedProducts";
import { useCart } from "../context/CartContext";
import api from "../api/api"

export default function ProductDetailPage() {
  const { slug } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState(null);

useEffect(() => {
  api
    .get(`/products/${slug}`)
    .then((res) => setProduct(res.data))
    .catch(() => navigate("/404"));
}, [slug, navigate]);

useEffect(() => {
  if (product?.variants?.length) {
    setSelectedVariant(product.variants[0]);
    setSize(product.variants[0].sizes[0].size);
    setImageIndex(0);
    setThumbStart(0);
  }
}, [product]);


  const reviews = [
    { id: 1, name: "Rahul", rating: 5, text: "Amazing quality and fit." },
    { id: 2, name: "Aman", rating: 4, text: "Fabric feels premium." },
    { id: 3, name: "Karan", rating: 5, text: "Looks very luxury." },
    { id: 4, name: "Sahil", rating: 4, text: "Worth the price." },
  ];

  const [selectedVariant, setSelectedVariant] = useState(null);
const [imageIndex, setImageIndex] = useState(0);
const [thumbStart, setThumbStart] = useState(0);
const [size, setSize] = useState(null);

  const [qty, setQty] = useState(1);
  const [touchStart, setTouchStart] = useState(0);

  const { addToCart, cart } = useCart();

const variant = selectedVariant || {};
const images = variant.images || [];

const variants = product?.variants || [];

useEffect(() => {
  if (variant?.sizes?.length) {
    setImageIndex(0);
    setThumbStart(0);
    setSize(variant.sizes[0].size);
  }
}, [variant]);


const isInCart = cart.some(
  (item) =>
    item &&
    item.title === product?.title &&
    item.color === variant?.colorName &&
    item.size === size
);


  const nextImage = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const end = e.changedTouches?.[0]?.clientX || e.touches?.[0]?.clientX;

    const distance = touchStart - end;

    if (distance > 40) nextImage();
    if (distance < -40) prevImage();

    setTouchStart(0);
  };
   
if (!product || !selectedVariant) return <div>Loading...</div>;

  return (
    <>
      <section className="bg-[#F7F7F7] py-8">
        <div className="max-w-6xl mx-auto px-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="lg:sticky lg:top-24">
            <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-4">
              <div className="hidden lg:flex flex-col items-center gap-2 shrink-0">
                {images.slice(thumbStart, thumbStart + 6).map((img, i) => {
                  const realIndex = thumbStart + i;

                  return (
                    <button
                      key={i}
                      onClick={() => setImageIndex(realIndex)}
                      className={`rounded-lg overflow-hidden border ${
                        imageIndex === realIndex
                          ? "border-[#C9A24D]"
                          : "border-[#E5E5E5]"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full aspect-square object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative rounded-none lg:rounded-2xl overflow-hidden bg-white w-full h-[360px] sm:h-[420px] lg:h-[520px]"
              >
                <img
                  src={images[imageIndex]}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={prevImage}
                  className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={nextImage}
                  className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <FaChevronRight />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 lg:hidden">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition ${
                        imageIndex === i ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 h-screen overflow-y-auto scrollbar-hide pt-4">
            <p className="text-s uppercase text-[#8E8E8E]">
              {product.brand}
            </p>

            <h1 className="text-2xl font-semibold">{product.title}</h1>

            <div className="flex items-center gap-2">
              <div className="flex text-[#C9A24D]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                {product.rating} ({product.ratingCount})
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <span className="text-2xl font-semibold">₹{product.price}</span>

              <span className="line-through text-gray-400">₹{product.mrp}</span>

              <span className="text-[#C9A24D] text-sm">
                {product.discount}%
              </span>
            </div>

            <div>
              <p className="text-sm mb-2">Color</p>

              <div className="flex gap-3">
                {variants.map((v) => (
                  <button
                    key={v.colorName}
                    onClick={() => setSelectedVariant(v)}
                    className={`w-9 h-9 rounded-full border ${
                      selectedVariant.colorName === v.colorName
                        ? "border-[#C9A24D]"
                        : "border-[#E5E5E5]"
                    }`}
                    style={{
                      background: v.colorHex,
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm mb-2">Size</p>

              <div className="flex gap-2">
                {variant.sizes?.map((item) => {
                  const available = item.stock > 0;

                  return (
                    <button
                      key={item.size}
                      disabled={!available}
                      onClick={() => available && setSize(item.size)}
                      className={`w-11 h-11 rounded-full text-sm font-medium ${
                        size === item.size
                          ? "bg-[#0B0B0B] text-[#FFFFFF]"
                          : available
                            ? "bg-[#F7F7F7]"
                            : "bg-[#E5E5E5] opacity-40"
                      }`}
                    >
                      {item.size}
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
              onClick={() =>
                addToCart(product, {
                  color: variant.colorName,
                  size,
                  qty,
                })
              }
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#0B0B0B] text-white text-xs"
            >
              <FaOpencart />

              {isInCart ? <Link to="/cart">Go To Cart</Link> : "Add To Cart"}
            </button>

            <p className="text-sm text-[#8E8E8E]">{product.description}</p>

            <div className="border-t pt-6 flex justify-between text-sm">
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-[#8E8E8E]">3-5 days delivery</p>
              </div>

              <div>
                <p className="font-medium">Returns</p>
                <p className="text-[#8E8E8E]">7 days return </p>
              </div>
            </div>

            <div className="pt-10">
              <h3 className="text-xl font-semibold mb-5">Customer Reviews</h3>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-white rounded-xl border">
                    <div className="flex gap-1 text-[#C9A24D] mb-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>

                    <p className="text-sm font-medium">{r.name}</p>

                    <p className="text-sm text-[#8E8E8E]">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProduct />
    </>
  );
}

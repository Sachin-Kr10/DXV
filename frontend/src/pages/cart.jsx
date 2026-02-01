import { useCart } from "../context/cartcontext";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";


export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem, totals } = useCart();

  const navigate = useNavigate();

  const SHIPPING_CHARGE = cart.length > 0 ? 50 : 0;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 7);
  const deliveryDate = estimatedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const grandTotal = totals.total + SHIPPING_CHARGE;

  return (
    <section className="bg-[#F7F7F7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-[#8E8E8E] hover:text-[#0B0B0B]"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3 text-sm mb-6">
          <span className="font-semibold text-[#0B0B0B]">1. Cart</span>
          <span className="text-[#8E8E8E]">—</span>
          <span className="text-[#8E8E8E]">2. Checkout</span>
          <span className="text-[#8E8E8E]">—</span>
          <span className="text-[#8E8E8E]">3. Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0B0B0B]">
              Your <span className="text-[#C9A24D]">Cart</span>
            </h1>

            {cart.length === 0 && (
              <p className="text-[#8E8E8E]">Your cart is empty.</p>
            )}

            {cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  className="w-24 h-32 object-cover rounded-xl"
                  alt=""
                />

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-[#C9A24D]">
                    {item.brand}
                  </p>
                  <h3 className="font-medium text-[#1A1A1A]">{item.title}</h3>
                  <p className="text-sm text-[#8E8E8E]">
                    Size {item.size} · Color {item.color}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-semibold text-[#0B0B0B]">
                      ₹{item.price}
                    </span>
                    <span className="line-through text-sm text-[#C9A24D]">
                      ₹{item.mrp}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQty(index)}
                      className="w-8 h-8 rounded-full bg-[#F7F7F7]"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(index)}
                      className="w-8 h-8 rounded-full bg-[#F7F7F7]"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(index)}
                      className="ml-auto text-[#8E8E8E] hover:text-[#C9A24D]"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{totals.totalMrp}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-[#C9A24D]">−₹{totals.discount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{SHIPPING_CHARGE}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <p className="text-xs text-[#8E8E8E] mt-4">
                Estimated delivery by{" "}
                <span className="text-[#0B0B0B] font-medium">
                  {deliveryDate}
                </span>
              </p>

              <button
                className="mt-6 w-full py-3 rounded-full bg-[#0B0B0B] text-white hover:text-[#C9A24D] transition"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="bg-[#FFF8E8] border border-[#C9A24D] rounded-2xl p-5">
              <h3 className="font-medium mb-3 text-[#0B0B0B]">
                Have a Coupon?
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 rounded-full px-4 py-2 text-sm border border-[#E5E5E5] focus:outline-none focus:border-[#C9A24D]"
                />
                <button className="px-5 py-2 rounded-full bg-[#0B0B0B] text-white text-sm hover:text-[#C9A24D]">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

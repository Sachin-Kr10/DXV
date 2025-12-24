import { useCart } from "../cartcontext";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    totals,
  } = useCart();

  return (
    <section className="bg-[#F7F7F7] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-semibold text-[#0B0B0B]">
            Cart
          </h1>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white rounded-xl p-4 shadow-sm"
            >
              <img
                src={item.image}
                className="w-24 h-32 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-medium text-[#1A1A1A]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8E8E8E]">
                  Size {item.size} · Color {item.color}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <span className="font-semibold">
                    ₹{item.price}
                  </span>
                  <span className="line-through text-sm text-[#8E8E8E]">
                    ₹{item.mrp}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
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
                    className="ml-auto text-[#8E8E8E]"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h2 className="font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{totals.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-[#C9A24D]">
                −₹{totals.discount}
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total</span>
              <span>₹{totals.total}</span>
            </div>
          </div>

          <button className="mt-6 w-full py-3 rounded-full bg-[#0B0B0B] text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

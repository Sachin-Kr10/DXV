import { useLocation, useNavigate } from "react-router";
import { useCart } from "../context/cartcontext";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  if (!state) {
    navigate("/cart");
    return null;
  }

  const { address, total } = state;

  const placeOrder = () => {
    clearCart();
    navigate("/cart");
  };

  return (
    <section className="bg-[#F7F7F7] min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Payment</h1>

        {/* ADDRESS */}
        <div className="mb-6 border-b pb-4">
          <h2 className="font-medium mb-2">Deliver To</h2>
          <p className="text-sm text-[#8E8E8E]">
            {address.name}, {address.phone}
          </p>
          <p className="text-sm text-[#8E8E8E]">
            {address.address}, {address.city}
          </p>
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="space-y-3">
          <label className="block border p-4 rounded-xl cursor-pointer">
            <input type="radio" name="payment" defaultChecked /> Cash on Delivery
          </label>
          <label className="block border p-4 rounded-xl cursor-pointer">
            <input type="radio" name="payment" /> UPI / Card (Coming Soon)
          </label>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between mt-6 font-semibold">
          <span>Total Payable</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={placeOrder}
          className="mt-6 w-full py-3 rounded-full bg-[#0B0B0B] text-white hover:text-[#C9A24D]"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}

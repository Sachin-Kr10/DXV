import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

export default function Checkout() {
  const { cart, totals } = useCart();
  const navigate = useNavigate();

  const SHIPPING_CHARGE = 50;
  const grandTotal = totals.total + SHIPPING_CHARGE;

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Sachin Kumar",
      phone: "9876543210",
      country: "India",
      address1: "221B Baker Street",
      address2: "MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const isFormValid =
    newAddress.name &&
    newAddress.phone &&
    newAddress.country &&
    newAddress.address1 &&
    newAddress.city &&
    newAddress.state &&
    newAddress.pincode;

  const handleAddAddress = () => {
    if (!isFormValid) return;

    const id = Date.now();
    setAddresses([...addresses, { ...newAddress, id }]);
    setSelectedAddress(id);
    setShowForm(false);

    setNewAddress({
      name: "",
      phone: "",
      country: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  return (
    <section className="bg-[#F7F7F7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-[#8E8E8E] hover:text-[#0B0B0B]"
        >
          ← Back to Cart
        </button>

        <div className="flex items-center gap-3 text-sm mb-6">
          <span className="text-[#8E8E8E]">1. Cart</span>
          <span>—</span>
          <span className="font-semibold text-[#0B0B0B]">2. Checkout</span>
          <span>—</span>
          <span className="text-[#8E8E8E]">3. Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-semibold text-[#0B0B0B]">Checkout</h1>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Delivery Address</h2>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-sm text-[#C9A24D]"
                >
                  + Add New
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block border rounded-xl p-4 cursor-pointer ${
                      selectedAddress === addr.id
                        ? "border-[#C9A24D] bg-[#FFF8E8]"
                        : "border-[#E5E5E5]"
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                      />
                      <div>
                        <p className="font-medium text-[#0B0B0B]">
                          {addr.name} · {addr.phone}
                        </p>
                        <p className="text-sm text-[#8E8E8E]">
                          {addr.address1}
                          {addr.address2 && `, ${addr.address2}`}
                          <br />
                          {addr.city}, {addr.state}, {addr.country} –{" "}
                          {addr.pincode}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Add New Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Name" },
                    { key: "phone", label: "Phone" },
                    { key: "country", label: "Country" },
                    { key: "state", label: "State" },
                    { key: "city", label: "City" },
                    { key: "pincode", label: "Pincode" },
                  ].map(({ key, label }) => (
                    <input
                      key={key}
                      placeholder={label}
                      value={newAddress[key]}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, [key]: e.target.value })
                      }
                      required
                      className="border border-[#E5E5E5] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C9A24D]"
                    />
                  ))}

                  <input
                    placeholder="Address Line 1"
                    value={newAddress.address1}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address1: e.target.value })
                    }
                    required
                    className="md:col-span-2 border border-[#E5E5E5] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C9A24D]"
                  />

                  <input
                    placeholder="Address Line 2 (Optional)"
                    value={newAddress.address2}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address2: e.target.value })
                    }
                    className="md:col-span-2 border border-[#E5E5E5] rounded-full px-4 py-2 text-sm"
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    disabled={!isFormValid}
                    onClick={handleAddAddress}
                    className={`px-6 py-2 rounded-full text-white ${
                      isFormValid
                        ? "bg-[#0B0B0B] hover:text-[#C9A24D]"
                        : "bg-[#8E8E8E] cursor-not-allowed"
                    }`}
                  >
                    Save Address
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 rounded-full border border-[#E5E5E5] text-[#8E8E8E]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Your Order</h2>

            {cart.map((item, i) => (
  <div key={i} className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.title}
        className="w-12 h-14 object-cover rounded-lg"
      />

      <div>
        <p className="text-sm text-[#1A1A1A] leading-tight">
          {item.title}
        </p>
        <p className="text-xs uppercase tracking-widest text-[#C9A24D]">
          {item.brand}
        </p>
        <p className="text-xs text-[#8E8E8E]">
          Qty {item.qty}
        </p>
      </div>
    </div>

    <span className="text-sm font-medium">
      ₹{item.price * item.qty}
    </span>
  </div>
))}


            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totals.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{SHIPPING_CHARGE}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <p className="text-xs text-[#8E8E8E] mt-4">
              Estimated delivery by{" "}
              <span className="text-[#0B0B0B] font-medium">
                {deliveryDate.toDateString()}
              </span>
            </p>

            <button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    address: addresses.find(
                      (a) => a.id === selectedAddress
                    ),
                    total: grandTotal,
                  },
                })
              }
              className="mt-6 w-full py-3 rounded-full bg-[#0B0B0B] text-white hover:text-[#C9A24D]"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

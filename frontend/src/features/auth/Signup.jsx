import { useState } from "react";
import api from "../../api/api";

export default function Signup({ setView, setAuthData }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition";

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const submit = async e => {
    e.preventDefault();

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (!fullName || !email || !phone) {
      setError("All fields are required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
  setError("Enter a valid Indian mobile number");
  return;
}


    try {
      setLoading(true);
      setError("");

      await api.post("/auth/request-otp", {
        email,
        purpose: "signup"
      });

      setAuthData({
        fullName,
        email,
        phone,
        purpose: "signup"
      });

      setView("otp");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2 className="text-2xl font-semibold mb-6 text-[#0B0B0B] tracking-tight">
        Create an account
      </h2>

      <input
        name="fullName"
        placeholder="Full name"
        value={form.fullName}
        onChange={handleChange}
        className={`${inputBase} mb-4`}
        autoFocus
      />

      <input
        name="email"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={handleChange}
        className={`${inputBase} mb-4`}
      />

      <div className="flex mb-4">
        <div className="px-4 flex items-center bg-white border border-[#E5E5E5] rounded-l-lg text-sm text-gray-600">
          🇮🇳 +91
        </div>

        <input
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          maxLength={10}
          className="flex-1 px-4 py-3 bg-white border border-l-0 border-[#E5E5E5] rounded-r-lg text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition"
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs mb-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-black text-white font-medium transition hover:bg-[#000000] active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Sending..." : "Continue"}
      </button>
    </form>
  );
}

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import api from "../../api/api";

export default function Login({ setView, setAuthData }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputBase = "w-full px-4 py-3 rounded-lg bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition";

  const submit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError("Enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/login/send-otp", {
        email: cleanEmail
      });

      setAuthData({ email: cleanEmail });
      setView("otp");

    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2 className="text-2xl font-semibold mb-6 text-[#0B0B0B] tracking-tight">
        Sign in to your account
      </h2>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        className={`${inputBase} mb-4`}
        autoFocus
      />

      {error && (
        <p className="text-red-500 text-xs mb-3">
          {error}
        </p>
      )}

      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={() => setView("forgot")}
          className="text-xs text-[#C9A24D] hover:underline transition"
        >
          Forgot Email?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-black text-white font-medium transition hover:bg-[#000000] active:scale-[0.98] mb-5 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="flex-1 h-px bg-[#E5E5E5]" />
        <span className="text-[11px] text-[#8E8E8E] tracking-widest">
          OR CONTINUE WITH
        </span>
        <span className="flex-1 h-px bg-[#E5E5E5]" />
      </div>

      <button
        type="button"
        className="w-full py-3 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-center gap-2 text-[#1A1A1A] hover:border-[#C9A24D] transition"
      >
        <FaGoogle className="text-[18px]" />
        <span className="text-sm font-medium">Google</span>
      </button>
    </form>
  );
}
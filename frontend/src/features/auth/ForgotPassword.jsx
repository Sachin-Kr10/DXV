import { useState } from "react";
import api from "../../api/api";

export default function ForgotPassword({ setView }) {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputBase = "w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition";

  const submit = async () => {
    const cleanPhone = phone.trim();
    
    if (!cleanPhone) {
      setError("Phone number is required");
      return;
    }

    if (!/^\d{10}$/.test(cleanPhone)) {
      setError("Phone must be 10 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");

      const res = await api.post("/recovery/recover-email", {
        phone: cleanPhone
      });

      setResult(res.data.email);
    } catch (err) {
      setError(err.response?.data?.msg || "No account found with this phone number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-3 text-[#0B0B0B] tracking-tight">
        Recover Email
      </h2>
      
      <p className="text-sm text-[#8E8E8E] mb-6">
        Enter your registered phone number to recover email.
      </p>

      <div className="flex mb-4">
        <div className="px-4 flex items-center bg-white border border-[#E5E5E5] rounded-l-lg text-sm text-gray-600">
          🇮🇳 +91
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            setPhone(value);
            setError("");
            setResult("");
          }}
          maxLength={10}
          className="flex-1 px-4 py-3 bg-white border border-l-0 border-[#E5E5E5] rounded-r-lg text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition"
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs mb-2">
          {error}
        </p>
      )}

      {result && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">Your email:</p>
          <p className="text-green-900 font-semibold mt-1">{result}</p>
        </div>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className="w-full py-3 rounded-full bg-[#0B0B0B] text-[#FFFFFF] font-medium tracking-wide transition hover:bg-[#000000] active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Checking..." : "Recover"}
      </button>

      <button
        onClick={() => setView("login")}
        className="text-xs text-[#C9A24D] block mx-auto mt-4"
      >
        Back to login
      </button>
    </>
  );
}
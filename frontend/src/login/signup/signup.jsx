import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register({ setView }) {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLong = password.length >= 8;

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition";

  return (
    <>

      <h2 className="text-2xl font-semibold mb-6 text-[#0B0B0B] tracking-tight">
        Create an account
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <input placeholder="First name" className={inputBase} />
        <input placeholder="Last name" className={inputBase} />
      </div>
      <input
        placeholder="Email address"
        type="email"
        className={`${inputBase} mb-4`}
      />

      <div className="flex mb-4">
        <div className="px-4 flex items-center bg-[#FFFFFF] border border-[#E5E5E5] rounded-l-lg text-sm text-[#4b4a4a]">
          🇮🇳 +91
        </div>
        <input
          placeholder="Phone number"
          type="tel"
          className="flex-1 px-4 py-3 bg-[#FFFFFF] border border-l-0 border-[#E5E5E5] rounded-r-lg text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition"
        />
      </div>

      {/* Password */}
      <div className="relative mb-3">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputBase} pr-10`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E8E] hover:text-[#1A1A1A] transition"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Password rules */}
      <div className="text-xs mb-6 space-y-1">
        <p className={hasLetter ? "text-[#1A1A1A]" : "text-[#8E8E8E]"}>
          • At least one letter
        </p>
        <p className={hasNumber ? "text-[#1A1A1A]" : "text-[#8E8E8E]"}>
          • At least one number
        </p>
        <p className={isLong ? "text-[#1A1A1A]" : "text-[#8E8E8E]"}>
          • Minimum 8 characters
        </p>
      </div>

      <button
        onClick={() => setView("otp")}
        className="w-full py-3 rounded-full bg-[#0B0B0B] text-[#FFFFFF] font-medium tracking-wide transition hover:bg-[#000000] active:scale-[0.98]"
      >
        Create Account
      </button>
    </>
  );
}

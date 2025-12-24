import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ setView }) {
  const [show, setShow] = useState(false);

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition";

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-[#0B0B0B] tracking-tight">
        Sign in to your account
      </h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        className={`${inputBase} mb-4`}
      />

      {/* Password */}
      <div className="relative mb-3">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
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

      {/* Forgot */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setView("forgot")}
          className="text-xs text-[#C9A24D] hover:underline transition"
        >
          Forgot password?
        </button>
      </div>

      
      <button className="w-full py-3 rounded-full bg-[#0B0B0B] text-[#FFFFFF] font-medium tracking-wide transition hover:bg-[#000000] active:scale-[0.98] mb-5">
        Sign In
      </button>
      <div className="flex items-center gap-3 mb-4">
        <span className="flex-1 h-px bg-[#E5E5E5]" />
        <span className="text-[11px] text-[#8E8E8E] tracking-widest">
          OR CONTINUE WITH
        </span>
        <span className="flex-1 h-px bg-[#E5E5E5]" />
      </div>

      {/* Google */}
      <button
        className="w-full py-3 rounded-lg bg-[#FFFFFF] border border-[#E5E5E5]
        flex items-center justify-center gap-2 text-[#1A1A1A]
        hover:border-[#C9A24D] transition"
      >
        <FaGoogle className="text-[18px]" />
        <span className="text-sm font-medium">Google</span>
      </button>
    </>
  );
}

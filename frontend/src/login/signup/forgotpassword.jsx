import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword({ setView }) {
  const [show, setShow] = useState(false);

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition";

  return (
    <>
      <h2 className="text-2xl font-semibold mb-3 text-[#0B0B0B] tracking-tight">
        Reset password
      </h2>
      <p className="text-sm text-[#8E8E8E] mb-6">
        Enter your registered email and create a new password.
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        className={`${inputBase} mb-4`}
      />

      {/* New Password */}
      <div className="relative mb-6">
        <input
          type={show ? "text" : "password"}
          placeholder="New password"
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
      <button
        onClick={() => setView("otp")}
        className="w-full py-3 rounded-full bg-[#0B0B0B] text-[#FFFFFF] font-medium tracking-wide transition hover:bg-[#000000] active:scale-[0.98]"
      >
        Send OTP
      </button>
    </>
  );
}

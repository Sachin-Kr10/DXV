export default function VerifyOTP({ setView }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2 text-[#0B0B0B]">
        Verify OTP
      </h2>
      <p className="text-sm text-[#8E8E8E] mb-6">
        Enter the 4-digit code sent to you
      </p>

      <div className="flex gap-3 justify-center mb-8">
        {[1, 2, 3, 4].map((i) => (
          <input
            key={i}
            maxLength={1}
            className="w-12 h-12 text-center rounded-lg bg-white
            border border-[#E5E5E5] text-lg focus:border-[#C9A24D] outline-none"
          />
        ))}
      </div>

      <button
        onClick={() => setView("login")}
        className="w-full py-3 rounded-full bg-[#0B0B0B] text-white"
      >
        Verify & Continue
      </button>
    </>
  );
}

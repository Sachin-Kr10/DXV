import { useEffect, useState } from "react";
import api from "../../api/api";

export default function VerifyOTP({ setView, authData, onClose }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!authData?.email) {
      setView("login");
    }
    
    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [authData, setView]);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    const cleanOtp = otp.trim();

    if (cleanOtp.length !== 6) {
      setError("Enter 6-digit OTP");
      return;
    }

    if (!authData?.email) {
      setError("Session expired. Try again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url = authData?.name
        ? "/auth/signup/verify"
        : "/auth/login/verify";

      const response = await api.post(url, {
        email: authData.email,
        name: authData.name,
        phone: authData.phone,
        otp: cleanOtp
      });

      // Store token if received
      if (response.data.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }

      // Close modal
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to update auth state
      }, 500);

    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!authData?.email || timer > 0) return;

    try {
      setResending(true);
      setError("");

      const resendUrl = authData?.name
        ? "/auth/signup/send-otp"
        : "/auth/login/send-otp";

      await api.post(resendUrl, {
        name: authData.name,
        email: authData.email,
        phone: authData.phone
      });

      setTimer(60);
      setError("OTP resent successfully!");
      setTimeout(() => setError(""), 3000);

    } catch {
      setError("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  // Auto submit when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) {
      submit();
    }
  }, [otp]);

  return (
    <form onSubmit={submit}>
      <h2 className="text-xl font-semibold mb-2 text-[#0B0B0B]">
        Verify OTP
      </h2>

      <p className="text-sm text-[#8E8E8E] mb-6">
        Enter the 6-digit code sent to your email
      </p>

      <input
        maxLength={6}
        value={otp}
        autoFocus
        inputMode="numeric"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setOtp(value);
          setError("");
        }}
        className="w-full text-center text-xl tracking-widest py-3 rounded-lg bg-white border border-[#E5E5E5] focus:border-[#C9A24D] outline-none mb-3"
        placeholder="000000"
      />

      {error && (
        <p className={`text-xs mb-3 ${error.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full py-3 rounded-full bg-black text-white mb-3 disabled:opacity-60 disabled:pointer-events-none"
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <button
        type="button"
        disabled={resending || timer > 0}
        onClick={resendOtp}
        className="w-full text-sm text-[#C9A24D] hover:underline disabled:opacity-60"
      >
        {resending ? "Resending..." : timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
      </button>
    </form>
  );
}
import { useEffect, useState, useRef } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/authcontext";

export default function VerifyOTP({ setView, authData, onClose, onSuccess }) {
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);

  const submittedRef = useRef(false);

  /* RESET ON AUTH DATA CHANGE */
  useEffect(() => {
    submittedRef.current = false;
    setOtp("");
    setMessage("");
  }, [authData]);

  /* REDIRECT SAFETY */
  useEffect(() => {
    if (!authData?.email || !authData?.purpose) {
      setView("login");
    }
  }, [authData, setView]);

  /* TIMER */
  useEffect(() => {
    setTimer(60);

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [authData]);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (loading || submittedRef.current) return;

    const cleanOtp = otp.trim();

    if (cleanOtp.length !== 6) {
      setMessage("Enter 6-digit OTP");
      return;
    }

    if (!authData?.email || !authData?.purpose) {
      setMessage("Session expired. Try again.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      submittedRef.current = true;

      const res = await api.post("/auth/verify-otp", {
        email: authData.email,
        otp: cleanOtp,
        purpose: authData.purpose,
        fullName: authData.fullName,
        phone: authData.phone
      });

      /* 🔑 UPDATE AUTH STATE (NO /auth/me) */
      login({
        user: res.data.user,
        accessToken: res.data.accessToken
      });

      onSuccess();
    } catch (err) {
      submittedRef.current = false;
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!authData?.email || timer > 0 || resending) return;

    try {
      setResending(true);
      setMessage("");

      await api.post("/auth/request-otp", {
        email: authData.email,
        purpose: authData.purpose
      });

      setTimer(60);
      setMessage("OTP resent successfully");

      setTimeout(() => setMessage(""), 2500);
    } catch {
      setMessage("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  /* AUTO SUBMIT — SAFE */
  useEffect(() => {
    if (otp.length === 6 && !submittedRef.current && !loading) {
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
        onChange={e => {
          setOtp(e.target.value.replace(/\D/g, ""));
          setMessage("");
        }}
        className="w-full text-center text-xl tracking-widest py-3 rounded-lg bg-white border border-[#E5E5E5] focus:border-[#C9A24D] outline-none mb-3"
        placeholder="000000"
      />

      {message && (
        <p
          className={`text-xs mb-3 ${
            message.includes("successfully")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message}
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
        {resending
          ? "Resending..."
          : timer > 0
          ? `Resend OTP (${timer}s)`
          : "Resend OTP"}
      </button>
    </form>
  );
}

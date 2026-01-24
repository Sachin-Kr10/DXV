import { useState } from "react";
import Login from "./Login";
import Register from "./Signup";
import VerifyOTP from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";
import { IoClose } from "react-icons/io5";

export default function AuthModel({ onClose }) {
  const [view, setView] = useState("login");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
      <div className="relative w-[92%] max-w-md min-h-[520px]
        bg-[#F7F7F7] rounded-2xl p-8 shadow-xl flex flex-col">

        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-[#8E8E8E] hover:text-[#C9A24D] "
        >
          <IoClose size={22} />
        </button>

        {(view === "login" || view === "register") && (
          <div className="flex bg-[#FFFFFF] border border-[#E5E5E5] rounded-full p-1 mb-6">
            <button
              onClick={() => setView("login")}
              className={`flex-1 py-2 rounded-full text-sm transition
                ${view === "login"
                  ? "bg-[#C9A24D] text-[#000000]"
                  : "text-[#8E8E8E]"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setView("register")}
              className={`flex-1 py-2 rounded-full text-sm transition
                ${view === "register"
                  ? "bg-[#C9A24D] text-[#000000]"
                  : "text-[#8E8E8E]"}`}
            >
              Sign up
            </button>
            
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center">
          {view === "login" && <Login setView={setView} />}
          {view === "register" && <Register setView={setView} />}
          {view === "otp" && <VerifyOTP setView={setView} />}
          {view === "forgot" && <ForgotPassword setView={setView} />}
        </div>
      </div>
    </div>
  );
}
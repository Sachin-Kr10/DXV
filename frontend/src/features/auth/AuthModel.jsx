import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import VerifyOTP from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";
import { IoClose } from "react-icons/io5";

export default function AuthModel({ onClose }) {
  const [view, setView] = useState("login");
  const [authData, setAuthData] = useState({
    email: "",
    purpose: ""
  });

  const switchView = newView => {
    setView(newView);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
      <div className="relative w-[92%] max-w-md min-h-[520px] bg-[#F7F7F7] rounded-2xl p-8 shadow-xl flex flex-col">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-[#8E8E8E] hover:text-[#C9A24D]"
        >
          <IoClose size={22} />
        </button>

        {(view === "login" || view === "register") && (
          <div className="flex bg-[#FFFFFF] border border-[#E5E5E5] rounded-full p-1 mb-6">
            <button
              onClick={() => switchView("login")}
              className={`flex-1 py-2 rounded-full text-sm transition ${
                view === "login"
                  ? "bg-[#C9A24D] text-[#000000]"
                  : "text-[#8E8E8E]"
              }`}
            >
              Sign in
            </button>

            <button
              onClick={() => switchView("register")}
              className={`flex-1 py-2 rounded-full text-sm transition ${
                view === "register"
                  ? "bg-[#C9A24D] text-[#000000]"
                  : "text-[#8E8E8E]"
              }`}
            >
              Sign up
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center">
          
          {view === "login" && (
            <Login
              setView={switchView}
              setAuthData={setAuthData}
            />
          )}

          {view === "register" && (
            <Signup
              setView={switchView}
              setAuthData={setAuthData}
            />
          )}

          {view === "otp" && authData?.email && (
            <VerifyOTP
  setView={switchView}
  authData={authData}
  onClose={onClose}
  onSuccess={onClose}
/>

          )}

          {view === "forgot" && (
            <ForgotPassword setView={switchView} />
          )}

        </div>
      </div>
    </div>
  );
}

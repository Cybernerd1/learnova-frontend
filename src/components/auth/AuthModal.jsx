import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets.js";
import api from "../../services/api.js";



const slides = [
  { url: assets.auth1 },
  { url: assets.auth2 },
  { url: assets.auth3 },
];


export default function AuthModal({ isOpen, onClose }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 4000;

  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [tempStep, setTempStep] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    timeoutRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearInterval(timeoutRef.current);
  }, [isOpen]);

  useEffect(() => {
    if (tempStep) setStep(tempStep);
  }, [tempStep]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      console.log("Login success:", res.data);
      onClose();
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      console.log("Signup success:", res.data);
      setTempStep("verifyOtp");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const otp = otpValues.join("");
      const res = await api.post("/auth/verify-otp", { email, otp });
      console.log("OTP verified:", res.data);
      setTempStep("login");
    } catch (err) {
      console.error("OTP error:", err.response?.data || err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/reset-password", { email, newPassword });
      console.log("Password reset:", res.data);
      setTempStep("login");
    } catch (err) {
      console.error("Reset error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl w-[90%] md:w-[80%] max-w-5xl h-[500px] flex overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md px-3 py-1 rounded text-white text-sm hover:bg-white/30"
        >
          ✕
        </button>

        {/* Carousel */}
        <div className="w-1/2 h-auto relative overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.url}
                alt={`Slide ${i}`}
                className="w-full h-auto object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Auth Form */}
        <div className="w-1/2 h-full p-8 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Student login</h2>

            {step === "login" && (
              <form className="space-y-4" onSubmit={handleLogin}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">Login</button>
                <p className="text-sm text-right"><button type="button" onClick={() => setTempStep("forgotPassword")} className="text-indigo-300 hover:underline">Forgot password?</button></p>
                <p className="text-sm">Don't have an account? <button type="button" onClick={() => setTempStep("signup")} className="text-indigo-300 hover:underline">Sign up</button></p>
              </form>
            )}

            {step === "signup" && (
              <form className="space-y-4" onSubmit={handleSignup}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">Next</button>
              </form>
            )}

            {step === "verifyOtp" && (
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                <div className="flex justify-between gap-2">
                  {otpValues.map((val, i) => (
                    <input
                      key={i}
                      maxLength="1"
                      value={val}
                      onChange={(e) => {
                        const copy = [...otpValues];
                        copy[i] = e.target.value;
                        setOtpValues(copy);
                      }}
                      className="w-10 h-10 text-center bg-white/20 text-white border border-white/30 rounded"
                    />
                  ))}
                </div>
                <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">Verify OTP</button>
              </form>
            )}

            {step === "forgotPassword" && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setTempStep("verifyOtp"); }}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Registered Email" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">Send OTP</button>
              </form>
            )}

            {step === "resetPassword" && (
              <form className="space-y-4" onSubmit={handleResetPassword}>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full p-2 bg-white/20 text-white border border-white/30 rounded" />
                <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">Reset Password</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

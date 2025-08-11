import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets.js";
import api from "../../services/api.js";
import { z } from "zod";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const slides = [
  { url: assets.auth1, title: "Connect & Collaborate", subtitle: "Join thousands of learners in our classrooms", description: "Experience seamless real-time collaboration with peers and instructors." },
  { url: assets.auth2, title: "Learn Together", subtitle: "Share knowledge, resources, and grow together", description: "Access a vast library of shared resources and contribute to our growing community." },
  { url: assets.auth3, title: "Achieve More", subtitle: "Track your progress and reach your learning goals", description: "Set goals, monitor progress, and celebrate achievements with our analytics." },
];

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/\d/, "Password must contain a number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character");

export default function AuthModal({ isOpen = true, onClose = () => { }, onSuccess = () => { } }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 4000;

  // Form states
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState("auth"); // 'auth', 'verify', 'forgotPassword', 'resetPassword'
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [verifyType, setVerifyType] = useState("signup"); // 'signup', 'login', 'reset'
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isAutoSendingOtp, setIsAutoSendingOtp] = useState(false);

  // Carousel auto-slide
  useEffect(() => {
    if (!isOpen) return;
    timeoutRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearInterval(timeoutRef.current);
  }, [isOpen]);

  // Clean up/reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setIndex(0);
      clearInterval(timeoutRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function validateForm(formType) {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) newErrors.email = emailResult.error.issues[0]?.message;
    }

    if (formType === "signup") {
      if (!name) newErrors.name = "Name is required";

      if (!password) {
        newErrors.password = "Password is required";
      } else {
        const passwordResult = passwordSchema.safeParse(password);
        if (!passwordResult.success) newErrors.password = passwordResult.error.issues[0]?.message;
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (formType === "login" && loginMethod === "password") {
      if (!password) {
        newErrors.password = "Password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle auth (login/signup)
  async function handleAuth(e) {
    e?.preventDefault();

    if (isLogin) {
      if (loginMethod === "otp") {
        return handleSendLoginOtp();
      } else {
        return handleLogin();
      }
    } else {
      return handleSignup();
    }
  }

  // Login with password
  async function handleLogin() {
    if (!validateForm("login")) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password
      });

      if (response.data.success) {
        // Check if user is verified
        if (response.data.user && !response.data.user.isVerified) {
          toast.info("Please verify your email first. We're sending you a verification code...");
          setNeedsVerification(true);
          setVerifyType("signup");

          // Automatically send verification OTP
          await handleAutoSendVerificationOtp();
          return;
        }

        const token = response.data.token || response.data.access_token;
        if (token) {
          localStorage.setItem("token", token);
        }

        toast.success(response.data.message || "Login successful!");
        // setSuccessMessage(response.data.message || "Login successful!");

        setTimeout(() => {
          onSuccess(response.data);
          onClose();
        }, 1500);
      } else {
        toast.error(response.data.message || "Login failed");
        setErrors({ general: response.data.message || "Login failed. Please try again." });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";

      // Check if error is due to unverified account
      if (errorMessage.toLowerCase().includes("verify") || errorMessage.toLowerCase().includes("verification") || errorMessage.toLowerCase().includes("not verified")) {
        toast.info("Please verify your email first. We're sending you a verification code...");
        setNeedsVerification(true);
        setVerifyType("signup");

        // Automatically send verification OTP
        await handleAutoSendVerificationOtp();
        return;
      }

      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  // Auto send verification OTP when email needs verification
  async function handleAutoSendVerificationOtp() {
    setIsAutoSendingOtp(true);

    try {
      const response = await api.post("/api/auth/send-verify-otp", { email });

      if (response.data.success) {
        toast.success("Verification code sent to your email!");
        setStep("verify");
        setVerifyType("signup");
        setOtpValues(["", "", "", "", "", ""]);
        setErrors({});
      } else {
        toast.error(response.data.message || "Failed to send verification code");
        setErrors({ general: "Failed to send verification code. Please try again." });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to send verification code";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsAutoSendingOtp(false);
    }
  }

  // Send OTP for login
  async function handleSendLoginOtp() {
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.issues[0]?.message });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post("/api/auth/send-login-otp", { email });

      if (response.data.success) {
        toast.success(response.data.message || "OTP sent to your email!");
        setVerifyType("login");
        setTimeout(() => setStep("verify"), 1000);
      } else {
        toast.error(response.data.message || "Failed to send OTP");
        setErrors({ general: response.data.message || "Failed to send OTP." });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to send OTP.";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  // Signup
  async function handleSignup() {
    if (!validateForm("signup")) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword
      });

      if (response.data.success) {
        toast.success(response.data.message || "Account created! Sending verification code...");
        setVerifyType("signup");

        // Automatically send verification OTP
        setTimeout(async () => {
          await handleAutoSendVerificationOtp();
        }, 1000);
      } else {
        toast.error(response.data.message || "Signup failed");
        setErrors({ general: response.data.message || "Signup failed." });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Signup failed.";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  // Google Auth
  function handleGoogleAuth() {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
      window.location.href = `${baseUrl}/api/auth/google`;
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error("Google authentication is not implemented yet.");

    }
  }

  // Verify OTP
  async function handleVerifyOtp(e) {
    e?.preventDefault();
    const otp = otpValues.join("");

    if (otp.length !== 6) {
      setErrors({ otp: "Please enter all 6 digits" });
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      let response;
      let endpoint;

      switch (verifyType) {
        case "signup":
          endpoint = "/api/auth/verify-account";
          response = await api.post(endpoint, { email, otp });
          break;
        case "login":
          endpoint = "/api/auth/otp-login";
          response = await api.post(endpoint, { email, otp });
          break;
        case "reset":
          endpoint = "/api/auth/reset-password";
          response = await api.post(endpoint, { email, otp, newPassword });
          break;
        default:
          throw new Error("Invalid verification type");
      }

      if (response.data.success) {
        const message = response.data.message || "Verification successful!";
        toast.success(message);

        if (verifyType === "login") {
          // Handle login success
          const token = response.data.token || response.data.access_token;
          if (token) {
            localStorage.setItem("token", token);
          }
          setTimeout(() => {
            onSuccess(response.data);
            onClose();
          }, 1500);
        } else if (verifyType === "signup") {
          // Show success message and redirect to login
          toast.success("Email verified successfully! You can now login.");
          setTimeout(() => {
            setStep("auth");
            setIsLogin(true);
            setNeedsVerification(false);
            resetFormExceptEmail(); // Keep email for convenience
          }, 2000);
        } else if (verifyType === "reset") {
          // Redirect to login
          setTimeout(() => {
            setStep("auth");
            setIsLogin(true);
            resetForm();
          }, 1500);
        }
      } else {
        toast.error(response.data.message || "Invalid OTP");
        setErrors({ otp: response.data.message || "Invalid OTP" });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Invalid OTP";
      toast.error(errorMessage);
      setErrors({ otp: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  // Send OTP for forgot password
  async function handleForgotPassword(e) {
    e?.preventDefault();

    if (!email) {
      setErrors({ email: "Email is required" });
      toast.error("Email is required");
      return;
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.issues[0]?.message });
      toast.error(emailResult.error.issues[0]?.message);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post("/api/auth/send-reset-otp", { email });

      if (response.data.success) {
        toast.success(response.data.message || "OTP sent to your email!");
        setVerifyType("reset");
        setTimeout(() => setStep("resetPassword"), 1000);
      } else {
        toast.error(response.data.message || "Failed to send reset OTP");
        setErrors({ general: response.data.message || "Failed to send reset OTP" });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to send reset OTP";
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  // Handle OTP input
  function handleOtpChange(idx, value) {
    if (value.length > 1) return;
    const arr = [...otpValues];
    arr[idx] = value.replace(/\D/g, "");
    setOtpValues(arr);

    if (value && idx < 5) {
      const nextField = document.querySelector(`input[name="otp-${idx + 1}"]`);
      nextField && nextField.focus();
    }
  }

  // Resend OTP
  async function handleResendOtp() {
    setLoading(true);
    try {
      let endpoint;
      switch (verifyType) {
        case "signup":
          endpoint = "/api/auth/send-verify-otp";
          break;
        case "login":
          endpoint = "/api/auth/send-login-otp";
          break;
        case "reset":
          endpoint = "/api/auth/send-reset-otp";
          break;
        default:
          endpoint = "/api/auth/send-verify-otp";
      }

      const response = await api.post(endpoint, { email });

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setOtpValues(["", "", "", "", "", ""]);
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  }

  // Reset all states & errors
  function resetForm() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setOtpValues(["", "", "", "", "", ""]);
    setNewPassword("");
    setErrors({});
    // setSuccessMessage("");
    setLoading(false);
    setStep("auth");
    setIsLogin(true);
    setLoginMethod("password");
    setVerifyType("signup");
    setNeedsVerification(false);
    setIsAutoSendingOtp(false);
  }

  // Reset form but keep email for convenience
  function resetFormExceptEmail() {
    setPassword("");
    setConfirmPassword("");
    setName("");
    setOtpValues(["", "", "", "", "", ""]);
    setNewPassword("");
    setErrors({});
    // setSuccessMessage("");
    setLoading(false);
    setVerifyType("signup");
    setNeedsVerification(false);
    setIsAutoSendingOtp(false);
  }

  // Toggle between login and signup
  function toggleAuthMode() {
    setIsLogin(!isLogin);
    setErrors({});
    // setSuccessMessage("");
    setNeedsVerification(false);
    if (!isLogin) {
      // Switching to login, reset signup fields
      setName("");
      setConfirmPassword("");
    }
  }

  // Handle back navigation
  function handleBack() {
    setErrors({});
    // setSuccessMessage("");
    setOtpValues(["", "", "", "", "", ""]);
    setNeedsVerification(false);

    if (step === "verify") {
      setStep("auth");
    } else if (step === "forgotPassword" || step === "resetPassword") {
      setStep("auth");
      setIsLogin(true);
    } else {
      setStep("auth");
    }
  }

  // Send verification OTP for existing unverified users
  async function handleSendVerificationForExisting() {
    if (!email) {
      setErrors({ email: "Please enter your email address" });
      return;
    }

    await handleAutoSendVerificationOtp();
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50 h-full w-full">
        <div className="relative bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-2xl  max-w-3/5 mx-4 flex overflow-hidden">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/50 bg-opacity-20 backdrop-blur-md w-8 h-8 rounded-full text-black text-sm hover:bg-opacity-30 flex items-center justify-center"
          >
            ✕
          </button>

          {/* Carousel */}
          <div className="w-auto relative overflow-hidden max-h-3/6">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="relative flex-shrink-0">
                  <img
                    src={slide.url}
                    alt={`Slide ${i}`}
                    className="h-fit w-fit object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 flex flex-col justify-start py-10 items-start px-10 text-[#2E2E2E]">
                    <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                    <h4 className="text-xl mb-1">{slide.subtitle}</h4>
                    <p className="text-sm max-w-md">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-white bg-gray-900 bg-opacity-80">
            <div className="w-full min-w-3/6 max-w-sm mx-auto">

              {/* Loading indicator for auto-sending OTP */}
              {isAutoSendingOtp && (
                <div className="mb-4 text-center text-blue-400 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    Sending verification code...
                  </div>
                </div>
              )}

              {/* Error Messages */}
              {errors.general && (
                <div className="mb-4 text-center text-red-400 font-medium">
                  {errors.general}
                </div>
              )}

              {/* LOGIN/SIGNUP */}
              {step === "auth" && (
                <form onSubmit={handleAuth} autoComplete="off">
                  <div className="relative flex w-full mb-6 items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold">{isLogin ? "Login" : "Sign up"}</h1>
                  </div>

                  {/* Login Method Toggle (only for login) */}
                  {isLogin && (
                    <div className="flex mb-4 bg-gray-800 bg-opacity-50 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setLoginMethod("password")}
                        className={`flex-1 py-2 px-4 text-sm rounded-md transition-colors ${loginMethod === "password" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"}`}
                      >
                        Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod("otp")}
                        className={`flex-1 py-2 px-4 text-sm rounded-md transition-colors ${loginMethod === "otp" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"}`}
                      >
                        OTP
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Name (only for signup) */}
                    {!isLogin && (
                      <div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your fullname"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        {/* {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>} */}
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                          autoComplete={isLogin ? "username" : "email"}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    {(!isLogin || (isLogin && loginMethod === "password")) && (
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-10 pr-12 py-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                          />
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                      </div>
                    )}

                    {/* Confirm Password (only for signup) */}
                    {!isLogin && (
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="w-full pl-10 pr-12 py-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                      disabled={loading || isAutoSendingOtp}
                    >
                      {loading
                        ? "Please wait..."
                        : isLogin
                          ? (loginMethod === "password" ? "Login" : "Send OTP")
                          : "Create Account"
                      }
                    </button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex justify-between items-center mt-4 text-sm">
                    {/* Forgot password link (only for login with password) */}
                    {isLogin && loginMethod === "password" && (
                      <button
                        type="button"
                        onClick={() => setStep("forgotPassword")}
                        className="text-red-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}

                    {/* Need to verify email link (only show when verification is needed) */}
                    {isLogin && needsVerification && (
                      <button
                        type="button"
                        onClick={handleSendVerificationForExisting}
                        className="text-yellow-400 hover:underline"
                        disabled={loading || isAutoSendingOtp}
                      >
                        {isAutoSendingOtp ? "Sending..." : "Verify email now"}
                      </button>
                    )}
                  </div>

                  {/* Or divider & Google */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-900 px-2 text-gray-400">OR</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="w-full mt-4 flex items-center justify-center gap-3 bg-opacity-10 hover:bg-opacity-20 border hover:bg-gray-800 border-gray-600 py-3 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </button>
                  </div>

                  {/* Toggle auth mode */}
                  <p className="text-center text-sm mt-6 text-gray-300">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="text-blue-400 hover:underline"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </form>
              )}

              {/* OTP Verification */}
              {step === "verify" && (
                <form onSubmit={handleVerifyOtp}>
                  <div className="relative flex w-full mb-4 items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold">You're almost done</h1>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 bg-[#333]/20 p-3 rounded-lg">
                    Enter the One Time Password (OTP) sent to <span className="text-white font-semibold">{email}</span>
                  </p>

                  <div className="space-y-6">
                    <div className="flex justify-center gap-3">
                      {otpValues.map((val, i) => (
                        <input
                          key={i}
                          name={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          value={val}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-12 h-12 text-center text-xl bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                          autoFocus={i === 0}
                        />
                      ))}
                    </div>
                    {errors.otp && <p className="text-red-400 text-xs mt-1 text-center">{errors.otp}</p>}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="text-blue-400 text-sm hover:underline disabled:text-gray-500 disabled:cursor-not-allowed"
                      onClick={handleResendOtp}
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}

              {/* Forgot Password */}
              {step === "forgotPassword" && (
                <form onSubmit={handleForgotPassword}>
                  <div className="relative flex w-full mb-6 items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold">Forgot Password</h1>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your registered email"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-medium transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? "Sending OTP..." : "Send Reset OTP"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Reset Password */}
              {step === "resetPassword" && (
                <form onSubmit={handleVerifyOtp}>
                  <div className="relative flex w-full mb-4 items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold">Reset Password</h1>
                  </div>

                  <div className="space-y-4">
                    {/* OTP Input */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3 bg-[#333]/20 p-3 rounded-lg">
                        Enter the OTP sent to <span className="text-white font-semibold">{email}</span>
                      </p>
                      <div className="flex justify-center gap-3 mb-4">
                        {otpValues.map((val, i) => (
                          <input
                            key={i}
                            name={`otp-${i}`}
                            type="text"
                            maxLength={1}
                            value={val}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            className="w-12 h-12 text-center text-xl bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                            autoFocus={i === 0}
                          />
                        ))}
                      </div>
                      {errors.otp && <p className="text-red-400 text-xs mt-1 text-center">{errors.otp}</p>}
                    </div>

                    {/* New Password */}
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-12 py-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          tabIndex={-1}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-medium transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? "Resetting..." : "Reset Password"}
                      </button>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="text-blue-400 text-sm hover:underline disabled:text-gray-500 disabled:cursor-not-allowed"
                      onClick={handleResendOtp}
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
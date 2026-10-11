'use client';
import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { Mail, X, Lock, User, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { signIn, useSession } from "next-auth/react";
import { isValidEmail, isValidOTPFormate } from "@/utils/Helper";

type propType = {
  open: boolean;
  onClose: () => void;
};
type stepType = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  
  const session = useSession();
  //console.log("User Session:", session);
  useEffect(() => {
    if (session?.data?.user) {
      onClose();      
    }
  }, [session, onClose]);
 

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("All fields are strictly required.");
      return;
    }
    
    setLoading(true);
    setError(""); 
    const trimmedEmail = email.trim()
    try {
      const { data } = await axios.post("/api/auth/register", { name, email: trimmedEmail, password });
      console.log("Auth Response Data Object:", data);
      setStep("otp");
      setLoading(false);
    } catch (err: any) {      
      console.error("Axios Request Failure Log:", err.response);      
      
      const serverMessage = err?.response?.data?.message ?? err?.response?.data;
      setError(typeof serverMessage === "string" ? serverMessage : "This email is already registered.");
    } finally {      
      if (!error) {
        setLoading(false);
      }
    }
  };


  const handleVerifyEmail = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setError("Please complete the 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/auth/verify-otp", { email, otp: otpCode });
      console.log("OTP Verify API Response:", data);
      setOtp(["", "", "", "", "", ""]);
      setStep("login");
    } catch (err: any) {
      console.error("Axios OTP Failure:", err.response);
      const serverMessage = err?.response?.data?.message;
      setError(serverMessage ?? "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        email, 
        password, 
        redirect: false 
      });

      console.log("Auth.js Login Attempt Response:", res);
      
      if (res?.error) {
        setError("Invalid email or password credentials."); 
        setLoading(false);
        return;
      }            
    } catch (err) {
      console.error("Client login action failed:", err);
      setError("A network error occurred. Please try again.");
      setLoading(false);
    } finally {      
      if (!error) {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error("Google Auth failed:", err);
      setError("Google authentication encountered a problem.");
    }
  };
  
  const handleOtpChange = (index: number, value: string) => {
    console.log(`OTP Input Change at index ${index}:`, value);
    //if (!isValidOTPFormate(value) && value !== "") return;
    const singleChar = value.slice(-1);
    if (!/^[0-9]?$/.test(singleChar) && singleChar !== "") return;
    const newOtp = [...otp];
    newOtp[index] = singleChar; 
    setOtp(newOtp);

    if (singleChar && index !== otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (!singleChar && index !== 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 bg-black/80 background-blur-md bg-opacity-80"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="fixed inset-0 z-100 flex items-center justify-center px-4 sm:px-6 lg:px-8"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px+100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                <div
                  className="absolute right-4 top-4 text-gray-500 hover:text-black transition"
                  onClick={onClose}
                >
                  <X size={20} />
                </div>
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">
                    DRIVEFLOW
                  </h1>
                  <div className="mt-1 text-xs text-gray-500">
                    Premium Vehicle Booking
                  </div>
                </div>
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition"
                  >
                  <Image
                    src={"/images/google.png"}
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Sign in with Google
                </button>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <div className="text-xs text-gray-500 mt-4">OR</div>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                <div>
                  {step == "login" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Welcome Back</h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>

                        {/* ✨ FIXED: Added the missing UI error display block to show backend errors */}
                        {error && <p className="text-red-500 text-xs font-semibold animate-pulse">*{error}</p>}

                        <button 
                          onClick={handleLogin}
                          disabled={loading}
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-opacity flex items-center justify-center"
                        >
                          Login
                        </button>
                      </div>
                      
                      <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <span 
                          role="button"
                          onClick={() => { setStep("signup"); setError(""); }} 
                          className="font-semibold text-emerald-500 cursor-pointer hover:text-black hover:underline select-none"
                        >
                          Sign Up
                        </span>
                      </div>
                    </motion.div>
                  )}



                  {step == "signup" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Create Account</h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <User size={18} className="text-gray-500" />
                          <input
                            type="text"
                            placeholder="Fullname"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setName(e.target.value)}
                            value={name} // Added value binding to ensure input is fully controlled
                          />
                        </div>
                        
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>

                        {error && <p className="text-red-500 text-sm">*{error}</p>}

                        <button
                          disabled={!name || !email || !password || loading}
                          onClick={handleSignUp}
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-opacity flex justify-center items-center disabled:opacity-50"
                        >
                          {!loading ? "Send OTP" : <Loader2 className="animate-spin" size={18} />}
                        </button>
                      </div>

                      <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        {/* ✨ FIXED: Changed from 'div' to 'span' with 'role="button"' to ensure completely standard HTML parsing */}
                        <span 
                          role="button"
                          onClick={() => setStep("login")} 
                          className="font-semibold text-emerald-500 cursor-pointer hover:text-black hover:underline select-none"
                        >
                          Login
                        </span>
                      </div>
                    </motion.div>
                  )}


                  {step == "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-semibold">Verify Email Account</h2>
                      <div className="mt-6 flex justify-between gap-2">
                        {
                          otp.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              className="w-12 h-12 text-center text-lg border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                              maxLength={1}
                              // ✨ FIXED: Changed from digit[i] to just digit so data state links cleanly
                              value={digit} 
                              placeholder="*"
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                            />
                          ))
                        }                        
                      </div>

                      {error && <p className="text-red-500 text-sm mt-4">*{error}</p>}

                      <button
                        onClick={handleVerifyEmail}
                        disabled={loading || otp.join("").length < 6} // Disabled unless all 6 numbers are typed
                        className="mt-6 w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-opacity flex items-center justify-center disabled:opacity-50"
                      >
                        {!loading ? "Verify" : <Loader2 className="animate-spin" size={18} />}
                      </button>
                    </motion.div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
        
      )}
    </AnimatePresence>
  );
}

export default AuthModal;

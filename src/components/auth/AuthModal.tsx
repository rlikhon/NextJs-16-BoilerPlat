import { Mail, X, Lock, User, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import axios from "axios";
//import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { signIn, useSession } from "next-auth/react";

type propType = {
  open: boolean;
  onClose: () => void;
};
type stepType = "login" | "signup" | "otp";
function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("otp");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { data: session } = useSession();
  console.log(session);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("All fields are strictly required.");
      return;
    }
    
    setLoading(true);
    setError(""); 

    try {
      const { data } = await axios.post(
        "/api/auth/register", 
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log("Registration Successful:", data); 
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Axios Request Failure Log:", error.response);
      
      const serverMessage = error?.response?.data?.message;
      setError(serverMessage ?? "Bad Request: Please check your form fields.");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    console.log("Login button clicked");
    
    try {
      // client-safe method communicates directly with /api/auth handlers
      const res = await signIn("credentials", {
        email, 
        password, 
        redirect: false // Stops immediate full-page reloads on failure
      });

      console.log("Auth Response Data Object:", res);
      
      if (res?.error) {
        setError("Invalid email or password credentials."); //
      } else {
        console.log("Logged in successfully! Route user to dashboard.");
        // window.location.href = "/dashboard";
      }
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Client login action failed:", err);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Google login button clicked");
    const res = await signIn("google");
    console.log("Auth Response Data Object:", res);
  };
  
  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value) && value !== "") return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index !== otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (!value && index !== 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    console.log("OTP submit button clicked");
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

                        <button 
                          onClick={handleLogin}
                          disabled={loading}
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-opacity flex items-center justify-center">Login</button>
                      </div>
                      <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account? 
                        <div onClick={() => setStep("signup")} className="font-semibold text-emerald-500 cursor-pointer hover:text-black hover:underline select-none">
                          Sign Up
                        </div>
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
                         className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-opacity flex justify-center items-center"
                         >
                          {!loading ? "Send OTP" : <Loader2 className="animate-spin" />}
                        </button>
                      </div>
                      <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account? 
                        <div onClick={() => setStep("login")} className="font-semibold text-emerald-500 cursor-pointer hover:text-black hover:underline select-none">
                          Login
                        </div>
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
                              value={digit[i]}
                              placeholder="*"
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                            />
                          ))
                        }                        
                      </div>

                      <button
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className="mt-6 w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-opacity flex items-center justify-center"
                      >
                        {!loading ? "Verify" : <Loader2 className="animate-spin" />}
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

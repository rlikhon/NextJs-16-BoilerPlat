"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react"; // ✨ Added useSession to defeat hydration flicker
import {
  Bike,
  Car,
  ChevronRight,
  Truck,
  Bus,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import AuthModal from "./auth/AuthModal";
import type { AppDispatch, RootState } from "@/redux/store";
import { setUserData } from "@/redux/userSlice";
import { button } from "motion/react-m";

const NavItems = ["Home", "Bookings", "About Us", "Contact"];

const Nav = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { userData } = useSelector((state: RootState) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { status } = useSession();

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut({ redirect: false });
      dispatch(setUserData(null));
      setProfileOpen(false);
      router.refresh();
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Sign out encountered an error:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Image
            src="/images/test-logo.png"
            alt="DriveFlow Platform Logo"
            width={240}
            height={130}
            priority // Forces rapid loading as a high-priority above-the-fold asset
            className="object-contain hover:opacity-90"
          />
          <div className="hidden md:flex items-center gap-10">
            {NavItems.map((item, index) => {
              let href = "";
              if (item == "Home") {
                href = "/";
              } else {
                href = `/${item.toLowerCase()}`;
              }

              const active = href === pathName;
              return (
                <Link
                  href={href}
                  className={`items-center transition-colors pl-2 pr-2
                  ${
                    active
                      ? "text-emerald-300"
                      : "text-white hover:text-emerald-500"
                  }`}
                  key={index}
                >
                  <span
                    key="nav-item-{index}"
                    className="text-sm font-semibold hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="hidden md:block items-center gap-4 relative">
              {/* ✨ FIXED: The Dual-Lock Loading Guard */}
              {status === "loading" ||
              (status === "authenticated" && !userData) ? (
                // Show the neutral animation pulse while NextAuth reads tokens OR Redux fetches profile data
                <div className="w-16 h-9 bg-slate-800/40 rounded-full animate-pulse border border-slate-700/30" />
              ) : !userData ? (
                // Guest View: ONLY shows if NextAuth is completely finished AND no user data exists
                <button
                  onClick={() => setAuthOpen(true)}
                  className="text-sm font-semibold rounded-full text-black hover:text-cyan-400 bg-white px-4 py-2"
                >
                  Login
                </button>
              ) : (
                // Authenticated View: Shows safely when userData has completely populated
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-11 h-11 rounded-full bg-white text-black font-bold focus:outline-none"
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-14 right-0 w-[300px] bg-white shadow-xl rounded-2xl border border-gray-200 p-4 z-50 text-black"
                      >
                        <div className="p-5">
                          {/* Inner modal contents stay exactly the same */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center text-black font-bold border border-green-500 text-lg">
                              {userData.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {userData.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate max-w-[180px]">
                                {userData.email}
                              </p>
                              <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 mt-0.5">
                                {userData.role}
                              </p>
                            </div>
                          </div>

                          {userData.role !== "partner" && (
                            <>
                              <hr className="my-2 border-gray-100" />
                              <div className="flex items-center gap-3 py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer transition">
                                <div className="flex -space-x-1.5">
                                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-white">
                                    <Bike size={10} className="text-gray-500" />
                                  </div>
                                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-white">
                                    <Car size={10} className="text-gray-500" />
                                  </div>
                                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-white">
                                    <Truck
                                      size={10}
                                      className="text-gray-500"
                                    />
                                  </div>
                                </div>
                                <span className="text-xs font-medium">
                                  Become a Partner
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                              </div>
                            </>
                          )}

                          <hr className="my-2 border-gray-100" />

                          <Link
                            href="/profile"
                            onClick={() => setProfileOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
                          >
                            Profile Details
                          </Link>

                          <button
                            onClick={handleLogout}
                            disabled={logoutLoading}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition disabled:opacity-50 mt-1"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            {logoutLoading ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden items-center gap-4 relative">
              {status === "loading" ||
              (status === "authenticated" && !userData) ? (
                <div className="w-16 h-9 bg-slate-800/40 rounded-full animate-pulse border border-slate-700/30" />
              ) : !userData ? (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="text-sm font-semibold rounded-full text-black hover:text-cyan-400 bg-white px-4 py-2"
                >
                  Login
                </button>
              ) : (
                // Authenticated View: Shows safely when userData has completely populated
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-11 h-11 rounded-full bg-white text-black font-bold focus:outline-none"
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[110px] left-1/2 w-[92%] -translate-x-1/2 bg-[#0B0B0B] shadow-2xl z-40 rounded-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/10 text-gray-100">
                {NavItems.map((item, index) => {
                  let href = "";
                  if (item == "Home") {
                    href = "/";
                  } else {
                    href = `/${item.toLowerCase()}`;
                  }
                  return (
                    <Link
                      key={index}
                      href={href}
                      className="px-6 py-4 text-gray-30 hover:bg-white/5"
                    >
                      <span
                        key="nav-item-{index}"
                        className="text-sm font-semibold hover:text-cyan-400 transition-colors"
                      >
                        {item}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && userData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 bg-white shadow-2xl z-50 rounded-t-3xl md:hidden overflow-hidden"
            >
              <div className="p-5">
                {/* Inner modal contents stay exactly the same */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center text-black font-bold border border-green-500 text-lg">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {userData.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[180px]">
                      {userData.email}
                    </p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 mt-0.5">
                      {userData.role}
                    </p>
                  </div>
                </div>

                {userData.role !== "partner" && (
                  <>
                    <hr className="my-2 border-gray-100" />
                    <div className="flex items-center gap-3 py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer transition">
                      <div className="flex -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-white">
                          <Bike size={10} className="text-gray-500" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-white">
                          <Car size={10} className="text-gray-500" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-white">
                          <Truck size={10} className="text-gray-500" />
                        </div>
                      </div>
                      <span className="text-xs font-medium">
                        Become a Partner
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  </>
                )}

                <hr className="my-2 border-gray-100" />

                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
                >
                  Profile Details
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition disabled:opacity-50 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {logoutLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;

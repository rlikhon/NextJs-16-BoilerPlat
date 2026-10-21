"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, BadgeCheck, CheckCircle, CreditCard, FileCheck, Hash, Landmark, MapPinHouse, PhoneIcon, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute top-0 left-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-black" />
          </button>

          <p className="text-xs text-gray-500 font-semibold">Step 3 of 3</p>

          <h1 className="mt-2 text-2xl font-semibold text-black">
            Bank and Payments Setup
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Used for partner payments
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="ahn"
              className="block text-xs font-semibold text-gray-500"
            >
              Account Holder Name
            </label>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-8 h-8 text-gray-400"><BadgeCheck size={24} className="text-green-500 mt-0.5" /></div>
              <input
                type="text"
                name="ahn"
                id="ahn"
                className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
                placeholder="Account Holder Name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ban"
              className="block text-xs font-semibold text-gray-500"
            >
              Bank Account Number
            </label>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-8 h-8 text-gray-400"><CreditCard size={24} className="text-green-500 mt-0.5" /></div>
              <input
                type="text"
                name="ban"
                id="ban"
                className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
                placeholder="Bank Account Number"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bn"
              className="block text-xs font-semibold text-gray-500"
            >
              Bank Name
            </label>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-8 h-8 text-gray-400"><Landmark size={24} className="text-green-500 mt-0.5" /></div>
              <input
                type="text"
                name="bn"
                id="bn"
                className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
                placeholder="Bank Name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="brn"
              className="block text-xs font-semibold text-gray-500"
            >
              Branch Name
            </label>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-8 h-8 text-gray-400"><MapPinHouse size={24} className="text-green-500 mt-0.5" /></div>
              <input
                type="text"
                name="brn"
                id="brn"
                className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
                placeholder="Branch Name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ron"
              className="block text-xs font-semibold text-gray-500"
            >
              Routing Number
            </label>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-8 h-8 text-gray-400"><Hash size={24} className="text-green-500 mt-0.5" /></div>
              <input
                type="text"
                name="ron"
                id="ron"
                className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
                placeholder="Routing Number"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mob"
              className="block text-xs font-semibold text-gray-500"
            >
              Mobile Number
            </label>
            <div className="flex items-center mt-2 gap-2">
              <div className="w-8 h-8 text-gray-400"><PhoneIcon size={24} className="text-green-500 mt-0.5" /></div>
              <input
                type="text"
                name="mob"
                id="mob"
                className="flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
                placeholder="Mobile Number"
              />
            </div>
          </div>
        </div>

        

        <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
          <CheckCircle size={16} className="mt-0.5" />
          <p className="mt-0.5">
            Bank details are verified befor first payout. This usually takes 24-48 hours.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default page;

"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileCheck, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
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

          <p className="text-xs text-gray-500 font-semibold">Step 2 of 3</p>

          <h1 className="mt-2 text-2xl font-semibold text-black">
            Upload Vehicle Documents
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Required for verification
          </p>
        </div>

        <div className="mt-8 space-y-6">
            <motion.label
              whileHover={{ scale: 1.02 }}              
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition"
            >
                <div>
                    <p className="text-smfont-semibold">National ID</p>
                    <p className="text-xs text-gray-500">Upload your National ID</p>
                </div>
                <div>
                    <span className="text-xs text-gray-400">Upload</span>
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                        <Upload size={20} />
                    </div>
                </div>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}              
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition"
            >
                <div>
                    <p className="text-smfont-semibold">Driving License(Valid)</p>
                    <p className="text-xs text-gray-500">Issued by BRTA</p>
                </div>
                <div>
                    <span className="text-xs text-gray-400">Upload</span>
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                        <Upload size={20} />
                    </div>
                </div>
            </motion.label>

        </div>

        <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
            <FileCheck size={16} className="mt-0.5" />
            <p className="mt-0.5">
                Documents are securely stored and manually verified by our team.
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

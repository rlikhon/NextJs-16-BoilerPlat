"use client";

import { motion } from "motion/react";
import React from "react";
import FooterSocials from "./parts/FooterSocials";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking -wide">
              DRIVE FLOW
            </h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Book any vehicle - from bikes to trucks. Trust owners. Transparnt pricing.
            </p>
            <div>
              <FooterSocials />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="max-x-7xl mx-auto flex flex-col sm:flex-row justify-between text-sm text-gray-500 gap-4 items-center ">
            &copy; {new Date().getFullYear()} DriveFlow. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;

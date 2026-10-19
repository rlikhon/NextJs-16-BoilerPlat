"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Bike, Car, Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const VEHICLES = [
  { id: "bike", label: "Bike", icon: Bike, desc: "2 wheelers" },
  { id: "auto", label: "Auto", icon: Car, desc: "3 wheelers" },
  { id: "car", label: "Car", icon: Car, desc: "4 wheelers" },
  { id: "loading", label: "Loading", icon: Package, desc: "Small Goods" },
  { id: "truck", label: "Truck", icon: Truck, desc: "Heavy transports" },
];

// Note: Always capitalize React components (changed from 'page' to 'VehicleOnboardingPage')
export default function VehicleOnboardingPage() {
  const router = useRouter();
  
  // Clean initialization prevents input warning crashes
  const [vehicleType, setVehicleType] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string>("");

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
          
          <p className="text-xs text-gray-500 font-semibold">Step 1 of 3</p>

          <h1 className="mt-2 text-2xl font-semibold text-black">What's your vehicle?</h1>
          <p className="text-sm text-gray-500 mt-2">
            Add your vehicle details to get started
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-3">
              Vehicle type
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VEHICLES.map((vehicle) => {
                const Icon = vehicle.icon;
                const active = vehicleType === vehicle.id;

                return (
                  <motion.div
                    key={vehicle.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVehicleType(vehicle.id)}
                    className={`flex flex-col items-center justify-center gap-2 border rounded-xl p-4 cursor-pointer text-center select-none ${
                      active
                        ? "bg-black text-white border-black"
                        : "border-gray-200 hover:border-black text-black bg-white transition-colors"
                    }`}
                  >                    
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        active ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="text-sm font-semibold">{vehicle.label}</div>
                    <p className={`text-xs ${active ? "text-gray-300" : "text-gray-500"}`}>
                      {vehicle.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label
              htmlFor="vn"
              className="text-sm text-gray-500 font-semibold"
            >
              Vehicle Number
            </label>
            <input
              type="text"
              onChange={(e) => setVehicleNumber(e.target.value)}
              value={vehicleNumber} 
              placeholder="DK123123123"
              id="vn"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="vm"
              className="text-sm text-gray-500 font-semibold"
            >
              Vehicle Model
            </label>
            <input
              type="text"
              onChange={(e) => setVehicleModel(e.target.value)}
              value={vehicleModel} 
              placeholder="Toyota X"
              id="vm"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-black transition"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/partner/onboarding/vehicle/${vehicleType}`)}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

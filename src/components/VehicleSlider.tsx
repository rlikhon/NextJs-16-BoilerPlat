import React from 'react'
import { motion } from "motion/react"
import { Bike, Car, Bus, CarTaxiFront, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

const VEHICLE_CATEGORIES = [
  { title: "All Vehicles", desc: "Browse the full fleets", Icon: CarTaxiFront, tag: "Popular"  },
  { title: "Bikes", desc: "Find the perfect bike for your daily commute or weekend adventures.", Icon: Bike, tag: "Quick" },
  { title: "Cars", desc: "Explore our wide range of cars, from compact models to luxury sedans.", Icon: Car, tag: "Comfort" },
  { title: "SUVs", desc: "Experience comfort and capability with our diverse SUV collection.", Icon: Car, tag: "Premium" },
  { title: "Vans", desc: "Discover our versatile vans, ideal for family trips or cargo transport.", Icon: Bus, tag: "Family" },
  { title: "Trucks", desc: "Discover our robust trucks, perfect for work and adventure.", Icon: Truck, tag: "Cargo" },
  
];
const VehicleSlider = () => {  
  return (
    <div className="w-full h-[200vh] bg-white py-20 px-4 overflow-hidden">
      <div className='max-w-7xl mx-auto'>
          
            <motion.div              
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-end justify-between mb-10"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className='h-px w-8 bg-zinc-900' />
                  <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>Fleet</span>                  
                </div>
                <h2 className='text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-none'>
                  Vehicles<br />
                  <span className='relative inline-block'>Categories
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className='absolute -bottom-2 left-0 right-0 h-0.5 bg-zinc-900 origin-left'                      
                    />                     
                  </span>  
                </h2>
                <p className='text-zinc-400 text-sm mt-3 font-medium max-w-md'>
                  Choose the ride that fits your journey
                </p>
              </div>

              <div className='hidden sm:flex items-center gap-2'>
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className='w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center 
                  hover:bg-zinc-900 hove:border-zinc-900 hover:text-white 
                  disabled:opacity-25 disabled:hover:bg-white disabled:hover:border-zinc-200 disabled:hover:text-zinc-900 disabled:cursor-not-allowed 
                  transition-all text-zinc-900 shadow-sm cursor-pointer'
                >

                  <ChevronLeft className='w-6 h-6 text-zinc-900 cursor-pointer' />
                </motion.div>

                <motion.div>
                  <ChevronRight className='w-6 h-6 text-zinc-900 cursor-pointer' />
                </motion.div>
              </div>
              
            </motion.div>
         
        
      </div>
    </div>
  )
}

export default VehicleSlider

'use client';
import React, { useState } from 'react'
import { motion } from "motion/react"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthModal from './auth/AuthModal';

const NavItems = ["Home", "Bookings", "About Us", "Contact"];

const Nav = () => {
  const [authOpen, setAuthOpen] = useState(false)
  const pathName = usePathname();
  return (
    <>
      <motion.div
      initial={{opacity: 0, y: -60}}
      animate={{opacity: 1, y: 0}}
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
      >
        <div className='max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between'>        
          <Image
          src="/images/test-logo.png"
          alt="DriveFlow Platform Logo"
          width={240}        
          height={130}   
          priority           // Forces rapid loading as a high-priority above-the-fold asset
          className="object-contain hover:opacity-90"
        />
        <div className="hidden md:flex items-center gap-10">
          {NavItems.map((item, index) => {
            let href = "";
            if(item == "Home") {
              href = "/";
            } else {
              href = `/${item.toLowerCase()}`;
            }
            
            const active = href === pathName;
            return (
              <Link 
                href={href} 
                className={`items-center transition-colors pl-2 pr-2
                  ${active 
                          ? "text-emerald-300" 
                          : "text-white hover:text-emerald-500"
                  }`}
                key={index}
              >
                <span key="nav-item-{index}" className="text-sm font-semibold hover:text-cyan-400 transition-colors">
                  {item}
                </span>
              </Link> 
            )
          })}
        </div>

        <button 
          onClick={() => setAuthOpen(true)}
          className="text-sm font-semibold rounded-full text-black hover:text-cyan-400 bg-white px-4 py-2"
        >
          Login
        </button> 
      </div>      
      
      </motion.div>    
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
    
  )
}

export default Nav

'use client';
import React from 'react'
import { motion } from "motion/react"
import Image from 'next/image'

const Nav = () => {
  return (    
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
        className="object-contain hover:opacity-90 transition-opacity"
      />
      </div>
    </motion.div>    
  )
}

export default Nav

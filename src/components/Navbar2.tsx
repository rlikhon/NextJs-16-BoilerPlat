import Image from 'next/image';
import Link from 'next/link';

export default function Navbar2() {
  return (
    <nav className="w-full bg-black border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO CONTAINER LAYER */}
        <Link href="/" className="flex items-center focus:outline-none">
          <div className="relative overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
            <Image
              src="/images/driveflow-logo.png"
              alt="DriveFlow Vehicle Platform Logo"
              // 1. INCREASED DIMENSIONS: Boosted values to make the graphic visually prominent
              width={240}        
              height={130}       
              priority           
              className="object-contain"
            />
          </div>
        </Link>

        {/* WORKSPACE NAVIGATION LINK STRINGS */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/rentals" className="hover:text-cyan-400 transition-colors">Vehicle Rentals</Link>
          <Link href="/ride-hailing" className="hover:text-cyan-400 transition-colors">Ride Hailing</Link>
          <Link href="/logistics" className="hover:text-cyan-400 transition-colors">Logistics Moving</Link>
        </div>

        {/* CALL TO ACTION WORKSPACE INTERACTIVE TRIGGERS */}
        <div className="flex items-center space-x-4">
          <button className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-black text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>

      </div>
    </nav>
  );
}

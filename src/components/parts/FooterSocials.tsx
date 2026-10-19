'use client'; // Required Next.js App Router boundary tag for motion interactivity

import { motion } from "motion/react";

// ==========================================
// 🎨 LIGHTWEIGHT BRAND SVG UTILITY COMPONENTS
// ==========================================

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ==========================================
// 🛠️ STRUCTURED DATA ARRAY MAPPING HOOK
// ==========================================

const SocialLinks = [
  { name: "Facebook", href: "http://www.facebook.com", component: FacebookIcon },
  { name: "Instagram", href: "http://www.instagram.com", component: InstagramIcon },
  { name: "Twitter", href: "http://www.twitter.com", component: TwitterIcon },
  { name: "LinkedIn", href: "http://www.linkedin.com", component: LinkedInIcon }
];

export default function FooterSocials() {
  return (
    <div className="mt-6 flex gap-4">
      {SocialLinks.map((item, index) => {
        // Assign the isolated uppercase variable for valid React component parsing
        const VisualIcon = item.component;

        return (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow us on ${item.name}`}
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Custom styled sizing applied seamlessly via standard layout metrics */}
            <VisualIcon className="w-6 h-6" />
          </motion.a>
        );
      })}
    </div>
  );
}

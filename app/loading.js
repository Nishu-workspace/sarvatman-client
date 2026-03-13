"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      <div className="relative flex items-center justify-center h-48 w-48">
        
        {/* Large Gear */}
        <motion.div
          className="absolute text-orange-600"
          style={{ x: -20, y: -20 }} // Fine-tune position
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Gear size={90} teeth={12} />
        </motion.div>

        {/* Small Gear */}
        <motion.div
          className="absolute text-zinc-500"
          style={{ x: 38, y: 35 }} // Positioned to "lock" with large gear
          animate={{ rotate: [0, -360] }} // Array syntax forces movement
          transition={{
            duration: 3, // Half the duration = Double the speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Gear size={50} teeth={8} />
        </motion.div>
        
      </div>

      <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500 animate-pulse">
        System Loading
      </p>
    </div>
  );
}

function Gear({ size, teeth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Gear Body */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="50" cy="50" r="8" fill="currentColor" />
      
      {/* Teeth */}
      {[...Array(teeth)].map((_, i) => (
        <rect
          key={i}
          x="44"
          y="2"
          width="12"
          height="15"
          rx="2"
          fill="currentColor"
          transform={`rotate(${(i * 360) / teeth} 50 50)`}
        />
      ))}
    </svg>
  );
}
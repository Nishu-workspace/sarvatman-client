'use client'
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const Counter = ({ value, delay = 0 }) => {
  const ref = useRef(null);
  // More lenient margin for mobile, and ensure it triggers even when already in view
  const isInView = useInView(ref, { 
    once: true, 
    margin: "0px", // Changed from -50px to 0px for better mobile detection
    amount: 0.1 // Trigger when just 10% visible
  });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Small delay to ensure animation triggers properly
      const timer = setTimeout(() => {
        const controls = animate(count, value, { 
          duration: 2, 
          ease: "easeOut",
          delay: delay
        });
        return () => controls.stop();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, count, value, delay]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default Counter;
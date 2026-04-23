"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, Clock, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { springTransition, buttonHover, buttonTap } from "../lib/animations";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-40 bg-white shadow-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top Bar - Hidden on mobile to save space, visible on desktop */}
      <motion.div
        className="hidden md:flex bg-slate-900 text-slate-300 text-xs py-2 px-6 justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span>Factory: Visnagar, Gujarat, India</span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 hover:text-white cursor-pointer">
            <Clock size={14} /> Mon - Sat: 9:00 AM - 7:00 PM
          </span>
          <a
            href="mailto:sarvatmaneco@gmail.com"
            className="hover:text-white hover:underline"
          >
            sarvatmaneco@gmail.com
          </a>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={springTransition}
        >
          <Link href="/">
            <div className="text-2xl md:text-3xl font-bold tracking-tighter text-black">
              SARVATMAN<span className="text-amber-500">.</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-wide">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={`hover:text-amber-600 transition-colors relative group ${
                    isActive ? "text-amber-600" : "text-slate-800"
                  }`}
                >
                  {item.label}
                  <motion.span
                    className={`absolute bottom-0 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div
            className="text-right hidden xl:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <p className="text-xs text-slate-500">Talk to an Engineer</p>
            <p className="font-bold text-lg leading-none">+91 9428919894</p>
          </motion.div>
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded transition-colors hover:bg-slate-800"
            >
              Get Quote
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Icon */}
        <motion.button
          className="lg:hidden text-slate-800 p-2"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`py-3 px-4 font-medium text-sm uppercase tracking-wide rounded transition-colors ${
                      isActive
                        ? "bg-amber-50 text-amber-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-amber-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-slate-100 mt-2">
                <a
                  href="tel:+919428919894"
                  className="flex items-center gap-2 py-3 px-4 text-sm font-medium text-slate-700"
                >
                  <Phone size={16} className="text-amber-500" />
                  +91 9428919894
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

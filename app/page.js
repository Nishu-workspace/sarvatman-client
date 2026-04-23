"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
// You will need to install lucide-react if you haven't
import {
  Menu,
  Phone,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Trophy,
  MapPin,
  Clock,
  MessageCircle, // For WhatsApp
  ArrowUpRight,
  CheckCircle2,
  Cog,
  Zap,
  Ruler,
} from "lucide-react";
import Link from "next/link";
import Counter from "../components/Counter";
// Assuming your images are set up correctly in your project
import slipPaver from "../public/images/slip_form_paver.png";
import img1 from "../public/images/IMG_3031.jpg";
import img2 from "../public/images/3B6A4921.jpg";
import kerb from "../public/images/Kerb_Laying_Machine_SKM-60.jpg";
import img3 from "../public/images/3B6A8133.jpg";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import TechincalCards from "../components/TechincalCards";
import api from "../lib/api";
import toast from "react-hot-toast";
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  viewportOptions,
  buttonHover,
  buttonTap,
  cardHover,
  modalBackdrop,
  modalContent,
  textReveal,
  imageReveal,
  sectionHeader,
  heroText,
  springTransition,
} from "../lib/animations";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("General Inquiry");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    location: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [homeInquiryData, setHomeInquiryData] = useState({
    name: "",
    phone: "",
    interestedMachine: "Kerb Paver SKM-60",
  });
  const [homeSubmitting, setHomeSubmitting] = useState(false);

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (inquiryData.name.trim().length < 2) {
      toast.error("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!/^[0-9]{10}$/.test(inquiryData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (inquiryData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/inquiries", {
        name: inquiryData.name.trim(),
        phone: inquiryData.phone,
        company: inquiryData.location,
        email: inquiryData.email || "no-email@provided.com",
        message: `Inquiry for product: ${selectedProduct}`,
      });
      toast.success(
        "Inquiry submitted successfully! We will contact you soon.",
      );
      setIsModalOpen(false);
      setInquiryData({ name: "", phone: "", location: "", email: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHomeSubmit = async (e) => {
    e.preventDefault();

    if (homeInquiryData.name.trim().length < 2) {
      toast.error("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!/^[0-9]{10}$/.test(homeInquiryData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setHomeSubmitting(true);
    try {
      await api.post("/inquiries", {
        name: homeInquiryData.name.trim(),
        phone: homeInquiryData.phone,
        company: "N/A",
        email: "no-email@provided.com",
        message: `Callback requested for: ${homeInquiryData.interestedMachine}`,
      });
      toast.success(
        "Callback requested successfully! We will contact you soon.",
      );
      setHomeInquiryData({
        name: "",
        phone: "",
        interestedMachine: "Kerb Paver SKM-60",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to request callback. Please try again.");
    } finally {
      setHomeSubmitting(false);
    }
  };

  // Track scroll for header animation
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // 2. Function to open modal with specific product
  const openQuoteModal = (productName) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };
   const otherProducts = [
    {
      id: 1,
      name: "Kerb Paver skm",
      slug: "kerb-paver-machine-skm-540",
      category: "Compact Pavers",
      description:
        "India's most trusted compact kerb paver. Ideal for tight spaces and rapid road edge construction.",
      specs: ["16HP Air Cooled", "Width: 600mm"], // Shortened for cleaner UI
      image: img1.src,
    },
    {
      id: 2,
      name: "Slipform Paver",
      category: "Cleaning Equipment",
      slug: "slipform-paver-sp-1080",
      description:
        "Heavy-duty hydraulic broom for effective dust and debris cleaning before asphalt laying.",
      specs: ["Width: 2.1 Meters", "Tractor Attached"],
      image: img2.src,
    },
    {
      id: 3,
      name: "Kerb Paver",
      slug: "kerb-paver-machine-skm-60",
      category: "Cutting Technology",
      description:
        "High-performance cutter for creating expansion joints in concrete roads and runways.",
      specs: ["Depth: 200mm", "Water Tank Incl."],
      image: img3.src,
    },
  ];
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">
      {/* ================= HEADER ================= */}
      <motion.header
        className="sticky top-0 z-40 bg-white shadow-md"
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
            <div className="text-2xl md:text-3xl font-bold tracking-tighter text-black">
              SARVATMAN<span className="text-amber-500">.</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-wide">
            {["Products", "About Us", "Contact Us"].map((item, index) => {
              let href = `#${item.toLowerCase().replace(" ", "-")}`;
              if (item === "Products") href = "/products";
              if (item === "About Us") href = "/about";
              if (item === "Contact Us") href = "/contact";

              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    className="hover:text-amber-600 transition-colors relative group"
                  >
                    {item}
                    <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA Button - Replaced Search with Call Action */}
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
            <motion.a
              href="#contact"
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded transition-colors"
              whileHover={buttonHover}
              whileTap={buttonTap}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Get Quote
            </motion.a>
          </div>

          {/* Mobile Menu Icon */}
          <motion.button
            className="lg:hidden text-slate-800 p-2"
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={28} />
          </motion.button>
        </div>
      </motion.header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-150 flex items-center">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={kerb.src}
            alt="Sarvatman Road Machinery Site"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Stronger gradient for better text readability */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center pt-10">
          <motion.div
            className="md:w-3/5 space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="inline-block bg-amber-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm"
              variants={staggerItem}
            >
              Heavy Duty Engineering
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              variants={heroText}
            >
              Build Roads That <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">
                Last A Lifetime
              </span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-lg leading-relaxed"
              variants={staggerItem}
            >
              From the compact SKM-60 to the massive SP-1080. We manufacture
              machinery tailored for Indian terrain and deadlines.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              variants={staggerItem}
            >
              {/* Opens Popup */}
              <motion.button
                onClick={() => openQuoteModal("Slip Form Paver SP-1080")}
                className="px-8 py-4 bg-amber-500 text-black font-bold rounded shadow-lg"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Get Best Price
              </motion.button>

              {/* Navigates to Page */}
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link
                  href="/products/slipform-paver-sp-1080"
                  className="px-8 py-4 border border-white text-white font-medium rounded hover:bg-white/10 transition flex items-center justify-center gap-2"
                >
                  View Specs <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Signal in Hero */}
            <motion.div
              className="pt-6 border-t border-white/10 flex gap-8"
              variants={staggerItem}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-white">
                  <Counter value={500} delay={0.2} />+
                </p>
                <p className="text-xs text-gray-400 uppercase">Machines Sold</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-white">
                  <Counter value={15} delay={0.4} />+
                </p>
                <p className="text-xs text-gray-400 uppercase">Years Exp.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SPOTLIGHT PRODUCT (Slip Form) ================= */}
      <section
        id="products"
        className="relative py-20 overflow-hidden bg-white"
      >
        {/* Background elements omitted for brevity, keeping it clean */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2 space-y-8"
              {...slideInLeft}
              viewport={viewportOptions}
              whileInView="animate"
              initial="initial"
            >
              <div>
                <motion.h2
                  className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-2"
                  {...textReveal}
                >
                  Slip Form Paver
                </motion.h2>
                <motion.p
                  className="text-2xl font-light text-amber-600"
                  {...textReveal}
                  transition={{ delay: 0.1, ...textReveal.transition }}
                >
                  Model: SP 1080
                </motion.p>
              </div>

              <motion.p
                className="text-slate-600 leading-relaxed text-lg"
                {...textReveal}
                transition={{ delay: 0.2, ...textReveal.transition }}
              >
                Engineered for rapid production of safety barriers, median
                dividers, and kerbs.{" "}
                <span className="font-bold text-slate-900">
                  Reduce manual labor by 70%
                </span>{" "}
                with our automatic leveling system.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                <motion.div
                  className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                  variants={staggerItem}
                  whileHover={cardHover}
                >
                  <h4 className="font-bold text-slate-900">Precision</h4>
                  <p className="text-sm text-slate-500">
                    Automatic Sensor Leveling
                  </p>
                </motion.div>
                <motion.div
                  className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                  variants={staggerItem}
                  whileHover={cardHover}
                >
                  <h4 className="font-bold text-slate-900">Speed</h4>
                  <p className="text-sm text-slate-500">Up to 1.5m / minute</p>
                </motion.div>
              </motion.div>

              <motion.button
                className="group flex items-center gap-3 bg-slate-900 text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl mt-4 overflow-hidden relative"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <span className="relative z-10"><a href="https://res.cloudinary.com/duhmwi1ve/image/upload/v1773851173/sarvatman/brochures/sarvatman-1773851173058.pdf">Download Brochure </a></span>
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
              </motion.button>
            </motion.div>

            <motion.div className="lg:w-1/2" {...imageReveal}>
              <motion.div
                className="relative group bg-slate-50/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-inner border border-slate-100"
                whileHover={{ scale: 1.02 }}
                transition={springTransition}
              >
                {/* Decorative background accent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <motion.img
                  src={slipPaver.src}
                  alt="Sarvatman Slip Form Paver SP 1080"
                  className="w-full h-auto object-contain drop-shadow-xl relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={springTransition}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OTHER PRODUCTS ================= */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...sectionHeader}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Machinery For Every Need
            </h2>
            <motion.div
              className="h-1 w-20 bg-amber-500 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 1 }} // Ensure container is visible
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px", amount: 0.05 }}
          >
            {otherProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm group flex flex-col items-center justify-center border border-slate-100"
                whileHover={cardHover}
                // Ensure items are visible even if animation hasn't triggered
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px", amount: 0.05 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* 1. Make Image Clickable via Link */}
                <div className="w-full relative overflow-hidden">
                  <Link
                    href={`/products/${product.slug}`}
                    className="cursor-pointer block"
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-56"
                      whileHover={{ scale: 1.1 }}
                      transition={springTransition}
                    />
                    <motion.div
                      className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOptions}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {product.category}
                    </motion.div>
                  </Link>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  {/* 2. Make Title Clickable */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-amber-600 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {product.specs.map((spec, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 text-xs font-medium text-slate-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportOptions}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 size={12} className="text-amber-500" />
                        {spec}
                      </motion.div>
                    ))}
                  </div>

                  {/* 3. TWO BUTTONS: One for Quote, One for Details */}
                  <div className="flex gap-3 mt-auto">
                    {/* Primary Action: Popup */}
                    <motion.button
                      onClick={() => openQuoteModal(product.name)}
                      className="flex-1 py-3 bg-amber-500 text-black rounded text-sm font-bold"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      Get Price
                    </motion.button>

                    {/* Secondary Action: Navigation */}
                    <motion.div
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                      className="flex-1"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex justify-center items-center py-3 border border-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition-all"
                      >
                        Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TechincalCards />

      {/* ================= WHY CHOOSE US ================= */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...sectionHeader}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for Indian Roads
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            {[
              {
                icon: ShieldCheck,
                title: "Rugged Durability",
                description:
                  "Engineered to withstand extreme heat and dust. Zero downtime construction.",
              },
              {
                icon: Wrench,
                title: "24/7 Parts Support",
                description:
                  "We are based in Gujarat. Spare parts and mechanic support are just a phone call away.",
              },
              {
                icon: Trophy,
                title: "Precision Finishing",
                description:
                  "Advanced hydraulic systems ensure your road levels pass government inspection every time.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center"
                variants={staggerItem}
                whileHover={{ ...cardHover, borderColor: "#f59e0b" }}
                transition={springTransition}
              >
                <motion.div
                  className="w-14 h-14 bg-slate-900 text-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <feature.icon size={28} />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= NEW: VISIT FACTORY SECTION ================= */}
      <section id="factory" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Info Side */}
            <motion.div
              className="md:w-1/2 space-y-8"
              {...slideInLeft}
              viewport={viewportOptions}
              whileInView="animate"
              initial="initial"
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                {...textReveal}
              >
                Come See The Machines <br />
                <span className="text-amber-500">In Action</span>
              </motion.h2>
              <motion.p
                className="text-slate-300 text-lg"
                {...textReveal}
                transition={{ delay: 0.1, ...textReveal.transition }}
              >
                We invite you to our manufacturing facility in Mehsana. Inspect
                the build quality, meet our engineers, and get a live
                demonstration before you buy.
              </motion.p>

              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                {[
                  {
                    icon: MapPin,
                    title: "Factory Address",
                    content:
                      "Navin Block No. 211, Khata No.843, Behind Atithi Hotel,Visnagar-Unjha Road, Before Tirupati Natural Park, At & Po. Iyasara, Taluka Visanagar, Dist. Mahesana, Gujarat - 384315  ",
                  },
                  {
                    icon: Phone,
                    title: "Call for Appointment",
                    content: "+91 9428919894 (Mr. Patel)",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    variants={staggerItem}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={springTransition}
                    >
                      <item.icon className="text-amber-500 mt-1" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                href="https://maps.app.goo.gl/DUayMAgyyNhsPjms6"
                target="_blank"
                className="inline-block mt-4 text-amber-500 border-b border-amber-500 pb-1"
                whileHover={{ color: "#fff", borderColor: "#fff" }}
                transition={springTransition}
              >
                Get Directions on Google Maps
              </motion.a>
            </motion.div>

            {/* Map/Image Side */}
            <motion.div
              className="md:w-1/2 w-full h-80 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 relative group"
              {...imageReveal}
            >
              {/* Placeholder for Map or Factory Photo */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-600"
                whileHover={{ scale: 1.02 }}
                transition={springTransition}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1254.7646184382697!2d72.49433345015295!3d23.711544199125214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNavin%20Block%20No.%20211%2C%20Khata%20No.843%2C%20Behind%20Atithi%20Hotel%2CVisnagar-Unjha%20Road%2C%20Before%20Tirupati%20Natural%20Park%2C%20At%20%26%20Po.%20Iyasara%2C%20Taluka%20Visanagar%2C%20Dist.%20Mahesana%2C%20Gujarat%20-%20384315!5e0!3m2!1sen!2sin!4v1773117289956!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= LEAD FORM CTA ================= */}
      <section id="contact" className="py-20 bg-amber-500">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row"
            {...scaleIn}
            viewport={viewportOptions}
            whileInView="animate"
            initial="initial"
          >
            <motion.div
              className="md:w-1/2 p-10 bg-slate-900 text-white flex flex-col justify-center"
              {...slideInLeft}
              viewport={viewportOptions}
              whileInView="animate"
              initial="initial"
            >
              <motion.h3 className="text-3xl font-bold mb-4" {...textReveal}>
                Request a Callback
              </motion.h3>
              <motion.p
                className="text-slate-300 mb-8"
                {...textReveal}
                transition={{ delay: 0.1, ...textReveal.transition }}
              >
                Leave your details and our senior engineer will call you back
                within 2 hours with a personalized quote.
              </motion.p>
              <motion.ul
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                {[
                  "Best Price Guarantee",
                  "Free Technical Consultation",
                  "Pan-India Delivery",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    variants={staggerItem}
                  >
                    <CheckCircle2 className="text-green-500" size={16} /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="md:w-1/2 p-10"
              {...slideInRight}
              viewport={viewportOptions}
              whileInView="animate"
              initial="initial"
            >
              <form className="space-y-4" onSubmit={handleHomeSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={homeInquiryData.name}
                    onChange={(e) =>
                      setHomeInquiryData({
                        ...homeInquiryData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-amber-500 transition-colors bg-white/50"
                    placeholder="Enter name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={homeInquiryData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setHomeInquiryData({
                        ...homeInquiryData,
                        phone: val,
                      });
                    }}
                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-amber-500 transition-colors bg-white/50"
                    placeholder="10-digit mobile number"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Interested Machine
                  </label>
                  <select
                    value={homeInquiryData.interestedMachine}
                    onChange={(e) =>
                      setHomeInquiryData({
                        ...homeInquiryData,
                        interestedMachine: e.target.value,
                      })
                    }
                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-amber-500 bg-white/50"
                  >
                    <option>Kerb Paver SKM-60</option>
                    <option>Slip Form Paver</option>
                    <option>Road Sweeper</option>
                    <option>Other</option>
                  </select>
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={homeSubmitting}
                  className="w-full bg-amber-500 text-black font-bold py-4 mt-4 rounded disabled:opacity-50"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: 0.4 }}
                >
                  {homeSubmitting ? "Submitting..." : "Call Me Back"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">SARVATMAN.</h3>
            <p className="text-sm mb-4">
              Leading the way in Indian road construction technology.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-amber-500 hover:text-black transition cursor-pointer">
                In
              </div>
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-amber-500 hover:text-black transition cursor-pointer">
                Fb
              </div>
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-amber-500 hover:text-black transition cursor-pointer">
                Yt
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  About Company
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  Factory Visit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Office</h4>
            <p className="text-sm mb-2">
              Navin Block No. 211, Khata No.843, Behind Atithi Hotel, Before
              Tirupati Natural Park, At & Po. Iyasara
            </p>
            <p className="text-sm mb-2">Visnagar-Unjha Road,</p>
            <p className="text-sm">Gujarat - 384315</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm mb-2 hover:text-white cursor-pointer">
              sarvatmaneco@gmail.com
            </p>
            <p className="text-lg font-bold text-amber-500">+91 9428919894</p>
          </div>
        </div>
        <div className="text-center text-xs mt-12 pt-8 border-t border-slate-900">
          &copy; {new Date().getFullYear()} Sarvatman Road Equipments. All
          rights reserved.
        </div>
      </footer>
      {/* ================= QUOTE POPUP MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            {...modalBackdrop}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
              {...modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 rounded-full p-1 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={springTransition}
              >
                <X size={20} />
              </motion.button>

              {/* Header */}
              <motion.div
                className="bg-amber-500 p-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-black">Get Best Price</h3>
                <p className="text-black/80 text-sm mt-1">
                  Quoting for:{" "}
                  <span className="font-bold">{selectedProduct}</span>
                </p>
              </motion.div>

              {/* Form */}
              <motion.div
                className="p-6 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <form className="space-y-4" onSubmit={handleModalSubmit}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) =>
                        setInquiryData({ ...inquiryData, name: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="e.g. Rajesh Patel"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={inquiryData.email}
                      onChange={(e) =>
                        setInquiryData({
                          ...inquiryData,
                          email: e.target.value,
                        })
                      }
                      className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="rajesh@company.com"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Mobile Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={inquiryData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setInquiryData({
                          ...inquiryData,
                          phone: val,
                        });
                      }}
                      className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="10-digit mobile number"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Company / Location
                    </label>
                    <input
                      type="text"
                      value={inquiryData.location}
                      onChange={(e) =>
                        setInquiryData({
                          ...inquiryData,
                          location: e.target.value,
                        })
                      }
                      className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="e.g. Surat"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded shadow-lg mt-2 disabled:opacity-50"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    {submitting ? "Submitting..." : "Send Me Price List"}
                  </motion.button>

                  <motion.p
                    className="text-xs text-center text-slate-400 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    Our sales team usually replies within 30 minutes.
                  </motion.p>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

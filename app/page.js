"use client";
import React from "react";
import Image from "next/image";
// You will need to install lucide-react if you haven't
import {
  Menu,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Trophy,
  MapPin,
  Clock,
  MessageCircle, // For WhatsApp
} from "lucide-react";
import Link from "next/link";
// Assuming your images are set up correctly in your project
import slipPaver from "../public/images/slip_form_paver.png";
import img1 from "../public/images/IMG_3031.jpg";
import img2 from "../public/images/3B6A4921.jpg";
import kerb from "../public/images/Kerb_Laying_Machine_SKM-60.jpg";
import img3 from "../public/images/3B6A8133.jpg";
import { X } from "lucide-react";
import { useState } from "react";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("General Inquiry");

  // 2. Function to open modal with specific product
  const openQuoteModal = (productName) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };
  const otherProducts = [
    {
      id: 1,
      name: "Kerb Paver SKM-60",
      slug: "kerb-paver-skm-60",
      category: "Compact Pavers",
      description:
        "India's most trusted compact kerb paver. Ideal for spaces and rapid road edge construction.",
      specs: ["16HP Air Cooled", "Width: 600mm"], // Shortened for cleaner UI
      image: img1.src,
    },
    {
      id: 2,
      name: "Hydraulic Road Sweeper",
      category: "Cleaning Equipment",
      slug: "hydraulic-road-sweeper",
      description:
        "Heavy-duty hydraulic broom for effective dust and debris cleaning before asphalt laying.",
      specs: ["Width: 2.1 Meters", "Tractor Attached"],
      image: img2.src,
    },
    {
      id: 3,
      name: "Concrete Groove Cutter",
      category: "Cutting Technology",
      description:
        "High-performance cutter for creating expansion joints in concrete roads and runways.",
      specs: ["Depth: 200mm", "Water Tank Incl."],
      image: img3.src,
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">
      {/* ================= FAB (Floating Action Buttons) ================= */}
      {/* Vital for mobile conversion */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
        <a
          href="tel:+919876543210"
          className="bg-amber-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          aria-label="Call Now"
        >
          <Phone size={28} />
        </a>
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        {/* Top Bar - Hidden on mobile to save space, visible on desktop */}
        <div className="hidden md:flex bg-slate-900 text-slate-300 text-xs py-2 px-6 justify-between items-center">
          <span>Factory: Mehsana, Gujarat, India</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              <Clock size={14} /> Mon - Sat: 9:00 AM - 7:00 PM
            </span>
            <a
              href="mailto:sales@sarvatmanroad.com"
              className="hover:text-white hover:underline"
            >
              sales@sarvatmanroad.com
            </a>
          </div>
        </div>

        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-bold tracking-tighter text-black">
              SARVATMAN<span className="text-amber-500">.</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-wide">
            <a href="/products" className="hover:text-amber-600 transition">
              Products
            </a>
            <a href="#factory" className="hover:text-amber-600 transition">
              Visit Factory
            </a>
            <a href="#why-us" className="hover:text-amber-600 transition">
              Why Us
            </a>
          </nav>

          {/* CTA Button - Replaced Search with Call Action */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right hidden xl:block">
              <p className="text-xs text-slate-500">Talk to an Engineer</p>
              <p className="font-bold text-lg leading-none">+91 98765 43210</p>
            </div>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded hover:bg-amber-500 hover:text-black transition-colors"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button className="lg:hidden text-slate-800 p-2">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={kerb.src}
            alt="Sarvatman Road Machinery Site"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Stronger gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center pt-10">
          <div className="md:w-3/5 space-y-8">
            <div className="inline-block bg-amber-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
              Heavy Duty Engineering
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Build Roads That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Last A Lifetime
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              From the compact SKM-60 to the massive SP-1080. We manufacture
              machinery tailored for Indian terrain and deadlines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Opens Popup */}
              <button
                onClick={() => openQuoteModal("Slip Form Paver SP-1080")}
                className="px-8 py-4 bg-amber-500 text-black font-bold rounded hover:bg-amber-400 transition shadow-lg"
              >
                Get Best Price
              </button>

              {/* Navigates to Page */}
              <Link
                href="/products/slip-form-paver"
                className="px-8 py-4 border border-white text-white font-medium rounded hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                View Specs <ArrowRight size={18} />
              </Link>
            </div>
            {/* Trust Signal in Hero */}
            <div className="pt-6 border-t border-white/10 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400 uppercase">Machines Sold</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-xs text-gray-400 uppercase">Years Exp.</p>
              </div>
            </div>
          </div>
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
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-2">
                  Slip Form Paver
                </h2>
                <p className="text-2xl font-light text-amber-600">
                  Model: SP 1080
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed text-lg">
                Engineered for rapid production of safety barriers, median
                dividers, and kerbs.{" "}
                <span className="font-bold text-slate-900">
                  Reduce manual labor by 70%
                </span>{" "}
                with our automatic leveling system.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-bold text-slate-900">Precision</h4>
                  <p className="text-sm text-slate-500">
                    Automatic Sensor Leveling
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-bold text-slate-900">Speed</h4>
                  <p className="text-sm text-slate-500">Up to 1.5m / minute</p>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded hover:bg-slate-800 transition shadow-xl mt-4">
                Download Brochure <ArrowRight size={18} />
              </button>
            </div>

            <div className="lg:w-1/2">
              <div className="relative group bg-slate-100 rounded-full p-8 md:p-12">
                <img
                  src={slipPaver.src}
                  alt="Sarvatman Slip Form Paver SP 1080"
                  className="w-full h-auto object-contain drop-shadow-2xl transform transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OTHER PRODUCTS ================= */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Machinery For Every Need
            </h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-slate-100"
              >
                {/* 1. Make Image Clickable via Link */}
                <Link
                  href={`/products/${product.slug}`}
                  className="cursor-pointer"
                >
                  <div className="h-56 bg-white p-4 relative flex items-center justify-center border-b border-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                </Link>

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
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 size={12} className="text-amber-500" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  {/* 3. TWO BUTTONS: One for Quote, One for Details */}
                  <div className="flex gap-3 mt-auto">
                    {/* Primary Action: Popup */}
                    <button
                      onClick={() => openQuoteModal(product.name)}
                      className="flex-1 py-3 bg-amber-500 text-black rounded text-sm font-bold hover:bg-amber-400 transition-all"
                    >
                      Get Price
                    </button>

                    {/* Secondary Action: Navigation */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 flex justify-center items-center py-3 border border-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for Indian Roads
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-amber-500 transition-colors shadow-sm text-center">
              <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Rugged Durability
              </h3>
              <p className="text-slate-500 text-sm">
                Engineered to withstand extreme heat and dust. Zero downtime
                construction.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-amber-500 transition-colors shadow-sm text-center">
              <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Wrench size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                24/7 Parts Support
              </h3>
              <p className="text-slate-500 text-sm">
                We are based in Gujarat. Spare parts and mechanic support are
                just a phone call away.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-amber-500 transition-colors shadow-sm text-center">
              <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Trophy size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Precision Finishing
              </h3>
              <p className="text-slate-500 text-sm">
                Advanced hydraulic systems ensure your road levels pass
                government inspection every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW: VISIT FACTORY SECTION ================= */}
      <section id="factory" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Info Side */}
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Come See The Machines <br />
                <span className="text-amber-500">In Action</span>
              </h2>
              <p className="text-slate-300 text-lg">
                We invite you to our manufacturing facility in Mehsana. Inspect
                the build quality, meet our engineers, and get a live
                demonstration before you buy.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Factory Address</h4>
                    <p className="text-slate-400 text-sm">
                      Plot No. 123, GIDC Phase II, <br />
                      Mehsana, Gujarat - 384002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">
                      Call for Appointment
                    </h4>
                    <p className="text-slate-400 text-sm">
                      +91 98765 43210 (Mr. Sharma)
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                className="inline-block mt-4 text-amber-500 border-b border-amber-500 pb-1 hover:text-white hover:border-white transition-colors"
              >
                Get Directions on Google Maps
              </a>
            </div>

            {/* Map/Image Side */}
            <div className="md:w-1/2 w-full h-80 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 relative group">
              {/* Placeholder for Map or Factory Photo */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-600">
                <span className="flex flex-col items-center gap-2">
                  <MapPin size={48} />
                  <span className="text-sm">
                    Google Map Embed Would Go Here
                  </span>
                </span>
              </div>
              {/* In production, use an iframe here: 
                 <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
               */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEAD FORM CTA ================= */}
      <section id="contact" className="py-20 bg-amber-500">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 bg-slate-900 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">Request a Callback</h3>
              <p className="text-slate-300 mb-8">
                Leave your details and our senior engineer will call you back
                within 2 hours with a personalized quote.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="text-green-500" size={16} /> Best
                  Price Guarantee
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="text-green-500" size={16} /> Free
                  Technical Consultation
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="text-green-500" size={16} />{" "}
                  Pan-India Delivery
                </li>
              </ul>
            </div>

            <div className="md:w-1/2 p-10">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="+91 98765 00000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Interested Machine
                  </label>
                  <select className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-amber-500 bg-transparent">
                    <option>Kerb Paver SKM-60</option>
                    <option>Slip Form Paver</option>
                    <option>Road Sweeper</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="w-full bg-amber-500 text-black font-bold py-4 mt-4 rounded hover:bg-amber-400 transition-colors">
                  Call Me Back
                </button>
              </form>
            </div>
          </div>
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
            <p className="text-sm mb-2">123 Business Hub,</p>
            <p className="text-sm mb-2">Highway Road, Mehsana,</p>
            <p className="text-sm">Gujarat - 384002</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm mb-2 hover:text-white cursor-pointer">
              sales@sarvatmanroad.com
            </p>
            <p className="text-lg font-bold text-amber-500">+91 98765 43210</p>
          </div>
        </div>
        <div className="text-center text-xs mt-12 pt-8 border-t border-slate-900">
          &copy; {new Date().getFullYear()} Sarvatman Road Equipments. All
          rights reserved.
        </div>
      </footer>
      {/* ================= QUOTE POPUP MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 rounded-full p-1"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="bg-amber-500 p-6">
              <h3 className="text-xl font-bold text-black">Get Best Price</h3>
              <p className="text-black/80 text-sm mt-1">
                Quoting for:{" "}
                <span className="font-bold">{selectedProduct}</span>
              </p>
            </div>

            {/* Form */}
            <div className="p-6 bg-white">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Rajesh Patel"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Mobile Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="+91 98765 00000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Company / Location
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Surat"
                  />
                </div>

                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-slate-800 transition shadow-lg mt-2">
                  Send Me Price List
                </button>

                <p className="text-xs text-center text-slate-400 mt-4">
                  Our sales team usually replies within 30 minutes.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

"use client"; // Needed for interactive elements like buttons/forms

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Menu,
  CheckCircle2,
  FileText, // For brochure
  Share2,
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
  Download,
  ShieldCheck,
} from "lucide-react";

// Placeholder images - Replace with your actual imports
// import productImg from "../../../public/images/slip_form_paver.png";

export default function ProductPage() {
  // Mock Data for this specific page (In real app, fetch this based on ID)
  const product = {
    name: "Slip Form Paver",
    model: "SP-1080",
    tagline: "High-Precision Concrete Paving for Highways & Canals",
    price: "Call for Price", // Never show high-ticket prices online
    description:
      "The SP-1080 is our flagship slipform paver designed for the Indian infrastructure sector. It offers fully automatic leveling and steering, ensuring concrete structures (kerbs, crash barriers, dividers) are laid with millimeter precision. Built with a heavy-duty chassis to withstand continuous operation in extreme heat.",
    features: [
      "Automatic Electronic Sensor Paver (MOBA System Compatible)",
      "Paving Speed: Up to 3 meters/minute",
      "Low Fuel Consumption: 4-5 Ltrs/Hour",
      "Zero Slump Concrete handling capacity",
      "Compact design for single-lane road operation",
    ],
    specs: [
      { label: "Paving Width", value: "Max 1800 mm" },
      { label: "Paving Height", value: "Max 1200 mm" },
      { label: "Engine Power", value: "60 HP @ 2200 RPM (Kirloskar)" },
      { label: "Operating Weight", value: "4,500 KG" },
      { label: "Drive System", value: "All Track Hydraulic Drive" },
      { label: "Hopper Capacity", value: "0.75 Cubic Meter" },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ================= FAB (Floating Action Buttons) ================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </a>
        <a
          href="tel:+919876543210"
          className="bg-amber-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <Phone size={28} />
        </a>
      </div>

      {/* ================= HEADER (Simplified for Product Page) ================= */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="hidden md:flex bg-slate-900 text-slate-300 text-xs py-2 px-6 justify-between items-center">
          <span>Factory: Mehsana, Gujarat</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Phone size={14} /> Sales: +91 98765 43210
            </span>
          </div>
        </div>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-black"
          >
            SARVATMAN<span className="text-amber-500">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-sm font-medium hover:text-amber-600">
              Back to Home
            </Link>
            <a
              href="#quote-form"
              className="bg-amber-500 text-black px-5 py-2 rounded font-bold hover:bg-amber-400 text-sm"
            >
              Get Quote
            </a>
          </div>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-amber-600">
            Products
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN: Images & Details */}
          <div className="lg:w-2/3 space-y-8">
            {/* Product Image Area */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="aspect-video bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center group">
                {/* Replace src with actual image variable */}
                <img
                  src="/api/placeholder/800/600"
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                  Best Seller
                </div>
              </div>

              {/* Thumbnails (Optional) */}
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 border hover:border-amber-500 cursor-pointer"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Title & Intro */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {product.name}{" "}
                <span className="text-amber-600">{product.model}</span>
              </h1>
              <p className="text-lg text-slate-500 mb-6">{product.tagline}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                  <ShieldCheck size={16} /> 1 Year Warranty
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                  <CheckCircle2 size={16} /> ISO 9001:2015 Certified
                </div>
              </div>

              <div className="prose text-slate-600 max-w-none">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Key Features List */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Why choose the {product.model}?
              </h3>
              <ul className="grid md:grid-cols-2 gap-y-3 gap-x-8">
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <CheckCircle2
                      className="text-amber-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Technical Specifications
              </h3>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <th className="px-6 py-4 font-medium text-slate-900 w-1/3 bg-slate-50/50">
                          {spec.label}
                        </th>
                        <td className="px-6 py-4 text-slate-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Brochure Download */}
            <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg">
                  Download Technical Brochure
                </h4>
                <p className="text-slate-400 text-sm">
                  Get detailed diagrams, dimensions, and performance charts.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 rounded font-bold hover:bg-amber-400 transition">
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Quote Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div
                className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-amber-500"
                id="quote-form"
              >
                <div className="mb-6">
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wide">
                    Starting Price
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    Request Quote
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    *Price varies based on customization
                  </p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Company / Location
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="e.g. L&T Construction, Surat"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 transition"
                  >
                    Get Best Price Now
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500 mb-2">
                    Or call us directly:
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 text-lg font-bold text-amber-600 hover:underline"
                  >
                    <Phone size={18} /> +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">
                  Need Technical Help?
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Talk to our Chief Engineer, Mr. Sharma, for specific project
                  requirements.
                </p>
                <a
                  href="https://wa.me/919876543210"
                  className="flex items-center gap-2 text-green-600 font-bold hover:underline"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER (Simple) ================= */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Sarvatman Road Equipments. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

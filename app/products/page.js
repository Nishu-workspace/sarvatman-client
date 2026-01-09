"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronRight,
  Phone,
  CheckCircle2,
  Download,
  X,
  Menu,
} from "lucide-react";

// --- PRODUCT DATA FROM BROCHURE ---
const allProducts = [
  // SLIPFORM PAVERS
  {
    id: "sp-1080",
    name: "Slipform Paver SP 1080",
    category: "Slipform Pavers",
    image: "/api/placeholder/600/400", // Replace with SP 1080 image
    tagline: "The Flagship Model for Highway Barriers",
    specs: [
      "Engine: Perkins 1100 Series (100 HP)",
      "Paving Width: Max 1,600 mm",
      "Paving Height: Max 1,300 mm",
    ],
    description:
      "Designed for offset paving of crash barriers and dividers. Features 3-track stability and fully automatic electronic sensing.",
    slug: "sp-1080",
  },
  {
    id: "sp-1000",
    name: "Slipform Paver SP 1000",
    category: "Slipform Pavers",
    image: "/api/placeholder/600/400", // Replace with SP 1000 image
    tagline: "High Capacity & Maneuverability",
    specs: [
      "Engine: Perkins 1100 Series (90 HP)",
      "Paving Width: Max 1,450 mm",
      "Paving Height: Max 1,050 mm",
    ],
    description:
      "Ideal for specialized high-capacity structures. Compact design with custom mold integration.",
    slug: "sp-1000",
  },

  // KERB PAVERS
  {
    id: "skm-540",
    name: "Kerb Paver SKM 540",
    category: "Kerb Pavers",
    image: "/api/placeholder/600/400", // Replace with SKM 540 image
    tagline: "Premium Hydrostatic Paver",
    specs: [
      "Engine: Yanmar 36 HP (Water Cooled)",
      "Steering: Power Steering (Moba Sensor)",
      "Max Dimensions: 750mm x 575mm",
    ],
    description:
      "Features fully hydrostatic drive and world-class components like Danfoss hydraulics and Wyco vibrators.",
    slug: "skm-540",
  },
  {
    id: "skm-60",
    name: "Kerb Paver SKM 60",
    category: "Kerb Pavers",
    image: "/api/placeholder/600/400", // Replace with SKM 60 image
    tagline: "Compact Ramming Paver",
    specs: [
      "Engine: 16 HP Petrol / 10 HP Diesel",
      "Speed: 60-70 mtr/hour",
      "Radius: Min 2.4 meters",
    ],
    description:
      "Cost-effective solution for residential and smaller road projects. Uses ramming mechanism for compaction.",
    slug: "skm-60",
  },

  // AUXILIARY EQUIPMENT
  {
    id: "sccm-750",
    name: "Hydraulic Road Sweeper",
    category: "Auxiliary",
    image: "/api/placeholder/600/400",
    tagline: "Model: SCCM-750",
    specs: [
      "Application: Road Cleaning",
      "Drive: Hydraulic Motor",
      "Mounting: Tractor Attached",
    ],
    description:
      "Heavy-duty broom for cleaning road surfaces before asphalt or concrete laying.",
    slug: "road-sweeper",
  },
  {
    id: "cutting-machines",
    name: "Concrete Cutting Machines",
    category: "Auxiliary",
    image: "/api/placeholder/600/400",
    tagline: "Models: SCCM 750 / SKCM 610",
    specs: [
      "Application: Joint Cutting",
      "Engine: Diesel / Electric",
      "Blade: Heavy Duty Diamond",
    ],
    description:
      "Precision cutting machines for creating expansion joints in cured concrete and kerbs.",
    slug: "cutting-machines",
  },
];

const categories = ["All", "Slipform Pavers", "Kerb Pavers", "Auxiliary"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("General Inquiry");

  // Filter Logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openQuoteModal = (productName) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-black"
          >
            SIDDHIVINAYAK<span className="text-amber-500">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 font-medium text-sm">
            <Link href="/" className="hover:text-amber-600">
              Home
            </Link>
            <Link href="/products" className="text-amber-600">
              Products
            </Link>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition"
            >
              <Phone size={16} /> +91 98765 43210
            </a>
          </div>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ================= PAGE TITLE ================= */}
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Our Product Range
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Manufacturer of Asphalt & Concrete Equipment. From the flagship SP
            1080 to compact kerb pavers.
          </p>
        </div>
      </section>

      {/* ================= CONTROLS (Filter & Search) ================= */}
      <section className="sticky top-18 z-30 bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-amber-500 text-black"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search model (e.g. SP 1080)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-slate-400"
              size={18}
            />
          </div>
        </div>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col"
              >
                {/* Image Link */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative h-56 bg-slate-100 flex items-center justify-center overflow-hidden"
                >
                  {/* Replace with Next/Image in real app */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-bold uppercase px-2 py-1 rounded tracking-wider">
                    {product.category}
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-amber-600 text-xs font-bold uppercase mb-4 tracking-wide">
                    {product.tagline}
                  </p>

                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs Mini List */}
                  <div className="space-y-2 mb-6 bg-slate-50 p-3 rounded text-xs font-medium text-slate-700">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                      onClick={() => openQuoteModal(product.name)}
                      className="py-3 bg-amber-500 text-black text-sm font-bold rounded hover:bg-amber-400 transition-colors"
                    >
                      Get Price
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center justify-center py-3 border border-slate-200 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors"
                    >
                      Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400">
              <p className="text-lg">
                No products found matching "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-amber-600 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= CATALOG DOWNLOAD CTA ================= */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Download 2025 Catalogue
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get the full technical specifications for the SP 1080, SKM 540, and
            our entire range of infrastructure machinery in one PDF.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded font-bold hover:bg-gray-200 transition">
            <Download size={20} /> Download PDF Brochure
          </button>
        </div>
      </section>

      {/* ================= QUOTE MODAL (Reused) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 rounded-full p-1"
            >
              <X size={20} />
            </button>

            <div className="bg-amber-500 p-6">
              <h3 className="text-xl font-bold text-black">Get Best Price</h3>
              <p className="text-black/80 text-sm mt-1">
                Quoting for:{" "}
                <span className="font-bold">{selectedProduct}</span>
              </p>
            </div>

            <div className="p-6 bg-white">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Rajesh Patel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500"
                    placeholder="+91 98765 00000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded p-3 text-sm focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Mehsana"
                  />
                </div>
                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-slate-800 transition mt-2">
                  Request Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

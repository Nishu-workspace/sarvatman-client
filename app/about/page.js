"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Trophy, Target, ArrowRight, Factory, Toolbox } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AboutUsPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Navbar />
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-32 overflow-hidden">
                {/* Background Image Setup */}
                <div
                    className="absolute inset-0 z-0 bg-slate-900"
                    style={{
                        backgroundImage: "url('/images/slip_form_paver.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.2
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-block bg-amber-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
                            Our Legacy
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Engineering <br />
                            <span className="text-amber-500">India's Infrastructure</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                            For over 15 years, Sarvatman has been at the forefront of designing and manufacturing heavy-duty road construction machinery built specifically for demanding terrains and tight deadlines.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats/Highlight Banner */}
            <section className="relative z-20 -mt-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-amber-500 text-black p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-black/10 border-b-4 border-slate-900"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {[
                            { label: "Years Experience", value: "15+" },
                            { label: "Machines Delivered", value: "500+" },
                            { label: "Active Projects", value: "120+" },
                            { label: "Service Engineers", value: "50+" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center px-4">
                                <div className="text-4xl md:text-5xl font-black mb-1">{stat.value}</div>
                                <div className="text-xs font-bold uppercase tracking-wide opacity-80">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* The Sarvatman Difference */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-bold text-amber-600 tracking-widest uppercase mb-3">
                                The Sarvatman Difference
                            </h2>
                            <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Not Just Assembled.<br />Engineered for Reality.
                            </h3>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                We don't believe in one-size-fits-all. Indian construction environments present unique challenges—extreme heat, heavy dust, and aggressive timelines. Our machines are over-engineered to compensate.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { icon: ShieldCheck, title: "Rugged Reliability", desc: "Constructed with high-tensile steel to withstand daily abuse on site." },
                                    { icon: Toolbox, title: "Zero Downtime Philosophy", desc: "Accessible maintenance points and tier-1 global components (Perkins, Rexroth)." },
                                    { icon: Factory, title: "In-House Manufacturing", desc: "End-to-end quality control at our state-of-the-art Mehsana facility." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="bg-slate-100 p-3 h-fit text-slate-900">
                                            <item.icon size={24} className="text-amber-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-slate-600">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2 relative"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative z-10 border-8 border-white shadow-2xl">
                                <img
                                    src="/images/3B6A8133.jpg"
                                    alt="Manufacturing process"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-2/3 border-8 border-white shadow-xl z-20">
                                <img
                                    src="/images/IMG_3031.jpg"
                                    alt="Machine inspection"
                                    className="w-full h-auto object-cover aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            {/* Decorative block */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500 z-0"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission & Vision */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.div variants={itemVariants} className="p-10 border border-slate-700 bg-slate-800/50 relative group hover:border-amber-500 transition-colors">
                            <Target size={40} className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-slate-400 leading-relaxed">
                                To empower infrastructure developers with highly reliable, technologically advanced, and locally supported machinery that drastically reduces project execution time and costs.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="p-10 border border-slate-700 bg-slate-800/50 relative group hover:border-amber-500 transition-colors">
                            <Trophy size={40} className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-slate-400 leading-relaxed">
                                To become India's undisputed leader in specialized road construction equipment, recognized globally for uncompromising quality and disruptive engineering solutions.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-amber-500">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to upgrade your fleet?</h2>
                    <p className="text-xl text-slate-800 mb-10 max-w-2xl mx-auto">
                        Contact our engineering team today to discuss your project requirements and find the perfect machine for the job.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 uppercase tracking-wide hover:bg-slate-800 transition-colors shadow-xl hover:shadow-2xl"
                    >
                        Get in Touch <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

        </main>
    );
}

import { ArrowUpRight, CheckCircle2, Clock, Cog, Ruler, Zap } from 'lucide-react'
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// Bar Animation 0 to 100
const PrecisionCard = () => {
  const ref = useRef(null);
  // once: true ensures it only animates the first time it comes into view
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, 100, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count]);

  return (
    <div ref={ref} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
      <div className="mb-4 text-orange-600">
        <Ruler size={28} />
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">
        Millimeter Precision
      </h4>
      <p className="text-gray-500 text-sm mb-4">
        Advanced electronic guidance and customized moulds for complex profiles
        like bridge parapets.
      </p>

      {/* Progress Bar Visual */}
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="bg-orange-600 h-full rounded-full"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>

      <p className="text-right text-xs font-mono text-orange-600 mt-2 font-bold flex justify-end items-center gap-1">
        {/* Animated Number */}
        <motion.span>{rounded}</motion.span>% ACCURACY
      </p>
    </div>
  );
};

const TechincalCards = () => {

  return (
    <section className="bg-gray-50 text-gray-900 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:flex md:justify-between md:items-end border-b border-gray-200 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-orange-600 tracking-wider uppercase mb-3 font-semibold">
              Why Choose Us?
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Engineering the road ahead.
            </h3>
          </div>
          <p className="mt-4 md:mt-0 text-gray-600 max-w-md text-sm md:text-right">
            Blending international R&D benchmarks with rugged, field-tested
            reliability.
          </p>
        </div>

        {/* The Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={{
            initial: { opacity: 0, y: 50, scale: 0.95 },
            animate: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Card 1: Main Value Prop (Span 2) */}
          <motion.div
            className="md:col-span-2 bg-white p-8 md:p-10 rounded-xl border border-gray-200 shadow-sm group"
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
            }}
            whileHover={{ y: -8, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", borderColor: "#d1d5db" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
                <Zap size={24} />
              </div>
              <ArrowUpRight className="text-gray-400 group-hover:text-orange-600 transition-colors" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              Technical Expertise & R&D
            </h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our products aren&#39;t just assembled; they are engineered.
              Backed by a modern R&D infrastructure, we continuously innovate
              to maintain a technologically advanced product line that meets
              international benchmarks.
            </p>
            {/* Subtle Tech Specs integrated */}
            <div className="flex gap-3 text-xs font-mono text-gray-500 uppercase tracking-wide">
              <span className="bg-gray-100 px-2 py-1 rounded">
                Advanced R&D
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                Global Standards
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                Robust Build
              </span>
            </div>
          </motion.div>

          {/* Card 2: The "Power Parts" List (Vertical) */}
          <motion.div
            className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between"
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
            }}
            whileHover={{ y: -8, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", borderColor: "#d1d5db" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Cog size={20} className="text-gray-400" />
                Global Components
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                We utilize only tier-1 globally recognized components for
                maximum reliability.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Perkins (UK) Engines",
                "Yanmar Engines",
                "Rexroth Hydraulic Pumps",
                "Wyco (USA) Vibrators",
                "MOBA Sensing",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-700 font-mono border-l-2 border-gray-200 pl-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 3: Precision (Span 1) */}
          <PrecisionCard />
          {/* Card 4: Execution & Operations (Span 2) */}
          <motion.div
            className="md:col-span-2 bg-white p-8 md:p-10 rounded-xl border border-gray-200 shadow-sm"
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
            }}
            whileHover={{ y: -8, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", borderColor: "#d1d5db" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} className="text-orange-600" />
                  <h4 className="text-lg font-bold text-gray-900">
                    Timely Execution
                  </h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We guarantee delivery through effective logistics planning.
                  Our wide distribution network ensures your project timeline
                  is never compromised.
                </p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 size={20} className="text-orange-600" />
                  <h4 className="text-lg font-bold text-gray-900">
                    Ease of Maintenance
                  </h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  High-capacity belt conveyors minimize downtime, while
                  accessible high-pressure cleaning systems prevent corrosion
                  and extend operational life.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

  )
}

export default TechincalCards
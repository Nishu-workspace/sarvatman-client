"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import api from "../../lib/api";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/inquiries", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "no-email@provided.com",
        company: "N/A",
        message: formData.message,
      });
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500 via-slate-900 to-slate-900"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's Build <span className="text-amber-500">Together</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Whether you need a quote, technical support, or want to visit our
            manufacturing facility, our team is ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 bg-white shadow-2xl border border-slate-100">
            {/* Contact Information Panel */}
            <motion.div
              className="lg:w-2/5 p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between group"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Image Background */}
              <div
                className="absolute inset-0 z-0 bg-slate-900"
                style={{
                  backgroundImage: "url('/images/3B6A4921.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors duration-500"></div>
              </div>

              {/* Decorative circle */}
              <div className="absolute z-10 top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold mb-8 z-10"
              >
                Contact Information
              </motion.h2>

              <div className="space-y-10 z-20">
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <MapPin className="text-amber-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Factory & Office
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Navin Block No. 211, Khata No.843, Behind Atithi
                        Hotel,Visnagar-Unjha Road
                        <br />
                        <br />
                        Mahesana, Gujarat - 384315
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Phone className="text-amber-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-slate-300 mb-1">+91 9428919894</p>
                      <p className="text-slate-300">+91 9428919894</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Mail className="text-amber-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-slate-300 mb-1">
                        sarvatmaneco@gmail.com
                      </p>
                      {/* <p className="text-slate-300">
                        support@sarvatmanroad.com
                      </p> */}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Business Hours */}
              <motion.div
                variants={itemVariants}
                className="mt-16 pt-8 border-t border-white/20 relative z-10"
              >
                <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                <p className="text-slate-300">
                  Monday - Saturday: 9:00 AM - 7:00 PM
                </p>
                <p className="text-slate-300">Sunday: Closed</p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:w-3/5 p-10 md:p-14"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Send us a Message
              </h2>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600">
                    Thank you for reaching out. One of our engineers will get
                    back to you within 2 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="+91 98765 00000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your requirements or questions..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group bg-amber-500 text-black font-bold px-8 py-4 rounded shadow-lg hover:shadow-xl hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && (
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 mb-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto h-[450px] bg-slate-200 overflow-hidden relative group border-t-4 border-amber-500 shadow-xl">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1254.7646184382697!2d72.49433345015295!3d23.711544199125214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNavin%20Block%20No.%20211%2C%20Khata%20No.843%2C%20Behind%20Atithi%20Hotel%2CVisnagar-Unjha%20Road%2C%20Before%20Tirupati%20Natural%20Park%2C%20At%20%26%20Po.%20Iyasara%2C%20Taluka%20Visanagar%2C%20Dist.%20Mahesana%2C%20Gujarat%20-%20384315!5e0!3m2!1sen!2sin!4v1773117289956!5m2!1sen!2sin"
                width="100%"
                height="450"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

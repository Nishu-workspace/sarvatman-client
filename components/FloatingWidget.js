"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

import { usePathname } from "next/navigation";

export default function FloatingWidget() {
    const pathname = usePathname();
    const springTransition = { type: "spring", stiffness: 300, damping: 20 };

    // Hide the widget on all admin routes
    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    // Add the logic the user wanted: pre-filled message
    const whatsappNumber = "919876543210";
    const whatsappMessage = encodeURIComponent("Hello Sarvatman! I am interested in your road machinery products.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
            >
                <MessageCircle size={28} />
            </motion.a>
            <motion.a
                href="tel:+919876543210"
                className="bg-amber-500 text-black p-4 rounded-full shadow-lg flex items-center justify-center"
                aria-label="Call Now"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
            >
                <Phone size={28} />
            </motion.a>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { getWhatsAppNumber, buildWhatsAppLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export default function FloatingWhatsApp() {
  const number = getWhatsAppNumber();
  const href = buildWhatsAppLink();
  if (!number) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-[115] md:bottom-7 md:right-7"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book via WhatsApp"
        data-cursor-active
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-base shadow-lg shadow-emerald-900/40 transition-transform hover:scale-110"
      >
        <WhatsAppIcon size={26} />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-charcoal px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-soft opacity-0 transition-opacity group-hover:opacity-100">
          Book REDNEXT
        </span>
      </a>
    </motion.div>
  );
}

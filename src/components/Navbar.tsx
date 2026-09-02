"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { navLinks } from "../../config/dj";
import { useAudio } from "@/components/providers/AudioProvider";
import { buildWhatsAppLink } from "@/lib/site";

function Wordmark() {
  return (
    <a
      href="#home"
      className="font-display text-lg font-extrabold tracking-[0.25em] text-soft"
    >
      RED<span className="text-electric">NEXT</span>
    </a>
  );
}

function SoundToggle() {
  const { status, isMuted, toggle } = useAudio();
  const muted = status !== "playing" || isMuted;
  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Enable sound" : "Mute sound"}
      data-cursor-active
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft/80 transition-colors hover:border-electric/50 hover:text-soft"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[110] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-base/70 py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Wordmark />

          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-soft/70 transition-colors hover:text-soft"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-active
              className="hidden rounded-full bg-soft px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-base transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
            >
              Book Now
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[150] flex flex-col bg-base"
          >
            <div className="flex items-center justify-between px-5 py-6">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center px-8">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-2 font-display text-4xl font-bold uppercase tracking-tight text-soft/85 transition-colors hover:text-electric"
                    >
                      <span className="font-mono text-xs text-electric/60">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 inline-flex w-fit rounded-full bg-soft px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-base"
              >
                Book Now
              </motion.a>
            </div>

            <div className="px-8 pb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              AGADIR · TAGHAZOUT · MOROCCO
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

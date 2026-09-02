"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/dj-hero.jpg"
          alt="REDNEXT performing on the Atlantic coast"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Cinematic overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-base/40 to-base" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/70 via-transparent to-base/40" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 100%, rgba(7,7,10,0.9) 0%, transparent 60%)" }} />

      {/* Decorative glow */}
      <motion.div
        style={{ y: midY }}
        className="absolute right-[8%] top-[20%] hidden h-72 w-72 rounded-full bg-electric/15 blur-[120px] lg:block"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-24 md:px-10 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-electric"
        >
          <span className="h-px w-12 bg-electric/60" />
          {`DJ · PRODUCER · AGADIR / TAGHAZOUT`}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.2rem,11vw,9rem)] font-black uppercase leading-[0.85] tracking-tight text-soft"
        >
          REDNEXT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-2xl font-medium uppercase tracking-[0.05em] text-soft/80 md:text-4xl"
        >
          Sound of the Atlantic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton>
            <a
              href="#music"
              data-cursor="play"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-soft px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-base"
            >
              Listen Now
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-soft backdrop-blur-sm transition-colors hover:border-electric/50 hover:text-electric"
            >
              Book REDNEXT
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-soft/50">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="block h-8 w-px bg-gradient-to-b from-electric to-transparent"
        />
      </motion.div>
    </section>
  );
}

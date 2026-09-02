"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] min-h-[520px] w-full items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/parallax.jpg"
          alt="The Atlantic Ocean at sunset at Taghazout"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-base/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      <div className="film-grain absolute inset-0 opacity-40" />

      {/* Animated headline */}
      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[11px] uppercase tracking-[0.4em] text-electric md:text-sm"
        >
          REDNEXT · AGADIR · TAGHAZOUT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-soft"
        >
          The Sound of
          <br />
          <span className="text-stroke">the Atlantic</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 h-px w-24 origin-center bg-electric/70"
        />
      </div>
    </section>
  );
}

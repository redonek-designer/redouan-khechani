"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { djConfig } from "../../../config/dj";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-base to-base" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <div>
            <Reveal>
              <SectionLabel label="About REDNEXT" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-soft md:text-7xl">
                About
                <br />
                <span className="text-electric">REDNEXT</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-soft/70 md:text-xl">
                {djConfig.bio}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-3 gap-4 font-display">
                {["AGADIR", "TAGHAZOUT", "MOROCCO"].map((place, i) => (
                  <motion.div
                    key={place}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                    className="border border-white/5 bg-charcoal/30 p-5 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      0{i + 1}
                    </p>
                    <p className="mt-2 text-lg font-bold uppercase tracking-tight text-soft md:text-xl">
                      {place}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: image + stats */}
          <div>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/images/dj-about.jpg"
                  alt="REDNEXT in the DJ booth"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-white/5 bg-white/5">
              {djConfig.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-charcoal/60 p-5 text-center md:p-8"
                >
                  <p className="font-display text-3xl font-black text-soft md:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted md:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

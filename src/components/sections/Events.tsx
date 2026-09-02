"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { djConfig, type Event } from "../../../config/dj";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function Events() {
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = djConfig.events.find((e) => e.id === hovered);

  return (
    <section id="events" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-base via-base to-charcoal/60" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel label="Upcoming Events" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl font-black uppercase tracking-tight text-soft md:text-7xl">
            Upcoming <span className="text-electric">Events</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          {djConfig.events.map((event, i) => (
            <EventRow
              key={event.id}
              event={event}
              index={i}
              active={hovered === event.id}
              onHover={() => setHovered(event.id)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <a
            href={djConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-active
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-electric"
          >
            Follow for more dates
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      {/* Floating preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            key={preview.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute right-[6%] top-40 z-10 hidden h-52 w-80 overflow-hidden rounded-xl border border-white/10 lg:block"
          >
            <Image
              src={preview.image}
              alt={preview.title}
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function EventRow({
  event,
  index,
  active,
  onHover,
  onLeave,
}: {
  event: Event;
  index: number;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      data-cursor-active
      className={`group grid cursor-pointer grid-cols-12 items-center gap-4 border-b border-white/5 py-6 transition-all duration-300 md:py-8 ${
        active ? "px-3 md:px-6" : ""
      }`}
    >
      <div className="col-span-3 font-display text-2xl font-bold tracking-tight text-soft md:col-span-2 md:text-4xl">
        {event.date}
        <span className="ml-2 align-top font-mono text-[10px] uppercase tracking-widest text-electric">
          {event.year}
        </span>
      </div>

      <div className="col-span-9 flex flex-1 items-center justify-between gap-4 md:col-span-10">
        <div>
          <h3
            className={`font-display text-xl font-bold uppercase tracking-tight transition-all duration-300 sm:text-2xl md:text-3xl ${
              active ? "text-electric" : "text-soft"
            }`}
          >
            {event.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {event.location}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span
            className={`hidden font-mono text-[10px] uppercase tracking-[0.25em] sm:inline ${
              event.status === "sold-out" ? "text-red-400/70" : "text-electric/70"
            }`}
          >
            {event.status === "upcoming" ? "Tickets soon" : event.status}
          </span>
          <ArrowUpRight
            className={`h-6 w-6 transition-all duration-300 ${
              active
                ? "translate-x-0.5 -translate-y-0.5 text-electric"
                : "text-muted"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

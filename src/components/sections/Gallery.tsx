"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { djConfig, type GalleryItem } from "../../../config/dj";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const show = useCallback(
    (i: number | null) => setSelected(i),
    []
  );
  const next = useCallback(
    () =>
      setSelected((s) =>
        s === null ? s : (s + 1) % djConfig.gallery.length
      ),
    []
  );
  const prev = useCallback(
    () =>
      setSelected((s) =>
        s === null ? s : (s - 1 + djConfig.gallery.length) % djConfig.gallery.length
      ),
    []
  );

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected, close, next, prev]);

  const current = selected !== null ? djConfig.gallery[selected] : null;

  return (
    <section id="gallery" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel label="Immersive Gallery" />
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-black uppercase tracking-tight text-soft md:text-7xl">
              The <span className="text-electric">Gallery</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Agadir · Taghazout · Behind the decks
            </p>
          </Reveal>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[repeat(4,minmax(0,220px))]">
          {djConfig.gallery.map((item, i) => (
            <Reveal
              key={item.id}
              delay={0.05 * i}
              className={`${item.span}`}
            >
              <GalleryTile
                item={item}
                onOpen={() => show(i)}
                tall={item.span.includes("row-span-2")}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-base/95 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-soft transition-colors hover:border-electric/50 hover:text-electric"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-soft transition-colors hover:border-electric/50 hover:text-electric md:left-8"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-soft transition-colors hover:border-electric/50 hover:text-electric md:right-8"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <div
              className="relative mx-16 h-[80vh] w-full max-w-4xl md:mx-24"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1200px) 80vw, 900px"
                    className="rounded-xl object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-xl font-bold uppercase tracking-tight text-soft">
                    {current.title}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {current.category}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(djConfig.gallery.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryTile({
  item,
  onOpen,
  tall,
}: {
  item: GalleryItem;
  onOpen: () => void;
  tall: boolean;
}) {
  return (
    <div
      onClick={onOpen}
      data-cursor="view"
      className={`group relative cursor-pointer overflow-hidden ${
        tall ? "h-full min-h-[240px]" : "h-[220px]"
      }`}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="translate-y-2 font-display text-lg font-bold uppercase tracking-tight text-soft opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {item.title}
        </p>
        <p className="translate-y-2 font-mono text-[9px] uppercase tracking-[0.25em] text-electric opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {item.category}
        </p>
      </div>
    </div>
  );
}

"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { djConfig } from "../../../config/dj";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function LocationMap() {
  return (
    <section id="location" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-base via-charcoal/50 to-base" />
      <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-electric/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel label="Based on the Atlantic coast" />
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-black uppercase tracking-tight text-soft md:text-7xl">
              Between <span className="text-electric">Agadir</span>
              <br />
              <span className="text-stroke">and the Ocean</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Map */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <div className="relative h-[420px] w-full md:h-[520px]">
                <iframe
                  title="REDNEXT location — Agadir and Taghazout, Morocco"
                  src={djConfig.map.embed}
                  className="h-full w-full border-0 grayscale-[0.8] invert-[0.9] hue-rotate-180 contrast-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 border border-electric/20" />
              </div>
            </div>
          </Reveal>

          {/* Location info + actions */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col gap-6 rounded-xl border border-white/5 bg-charcoal/40 p-7 backdrop-blur-md">
              <div className="space-y-5">
                <LocationRow
                  name={djConfig.map.agadir.name}
                  detail="Marina · Corniche · Nightlife"
                />
                <LocationRow
                  name={djConfig.map.taghazout.name}
                  detail="Surf town · Sunset · Beach clubs"
                />
              </div>

              <div className="h-px w-full bg-white/5" />

              <div className="flex flex-col gap-3">
                <MagneticButton className="w-full">
                  <a
                    href={djConfig.map.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-active
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-soft px-5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-base"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Map
                  </a>
                </MagneticButton>
                <MagneticButton className="w-full">
                  <a
                    href={djConfig.map.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-active
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-soft transition-colors hover:border-electric/50 hover:text-electric"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LocationRow({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-electric/30 bg-electric/10">
        <MapPin className="h-4 w-4 text-electric" />
      </div>
      <div>
        <p className="font-display text-xl font-bold uppercase tracking-tight text-soft">
          {name}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {detail}
        </p>
      </div>
    </div>
  );
}

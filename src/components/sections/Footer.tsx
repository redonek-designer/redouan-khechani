"use client";

import { ArrowUp } from "lucide-react";
import { djConfig } from "../../../config/dj";
import { getSocialLinks } from "@/lib/site";
import {
  InstagramIcon,
  SoundCloudIcon,
  YouTubeIcon,
  WhatsAppIcon,
} from "@/components/ui/BrandIcons";

export default function Footer() {
  const social = getSocialLinks();
  const socials = [
    { label: "Instagram", href: social.instagram, Icon: InstagramIcon },
    { label: "SoundCloud", href: social.soundcloud, Icon: SoundCloudIcon },
    { label: "YouTube", href: social.youtube, Icon: YouTubeIcon },
  ];
  if (social.whatsapp) {
    socials.push({ label: "WhatsApp", href: social.whatsapp, Icon: WhatsAppIcon });
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-charcoal/40">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-black tracking-[0.2em] text-soft">
              RED<span className="text-electric">NEXT</span>
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              {djConfig.locationShort} · MOROCCO
            </p>
          </div>

          <div className="flex items-start gap-6">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor-active
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-soft/70 transition-all hover:border-electric/50 hover:text-electric"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="flex items-start justify-start md:justify-end">
            <button
              onClick={scrollTop}
              data-cursor-active
              className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-electric"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-electric/40">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            © 2026 REDNEXT
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/60">
            Sound of the Atlantic.
          </p>
        </div>
      </div>
    </footer>
  );
}

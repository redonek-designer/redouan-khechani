"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { djConfig } from "../../../config/dj";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { buildWhatsAppLink, getSocialLinks } from "@/lib/site";
import { WhatsAppIcon, MailIcon } from "@/components/ui/BrandIcons";

type FormData = {
  name: string;
  email: string;
  date: string;
  location: string;
  message: string;
};

const initial: FormData = {
  name: "",
  email: "",
  date: "",
  location: "",
  message: "",
};

export default function Booking() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const whatsapp = buildWhatsAppLink();
  const social = getSocialLinks();

  const validate = (data: FormData) => {
    const e: Partial<FormData> = {};
    if (!data.name.trim()) e.name = "Please enter your name";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Enter a valid email address";
    if (!data.date) e.date = "Select an event date";
    if (!data.location.trim()) e.location = "Event location is required";
    if (!data.message.trim()) e.message = "Tell us about your event";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      return;
    }
    // TODO: connect to a real backend / email service here.
    // The payload is ready to POST to any endpoint.
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 6000);
    }, 1200);
  };

  const setField = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const inputCls = (hasError?: string) =>
    `w-full rounded-lg border bg-charcoal/40 px-4 py-3 text-soft placeholder:text-[#6f6f78] outline-none transition-colors focus:border-electric/60 ${
      hasError ? "border-red-400/60" : "border-white/10"
    }`;

  return (
    <section id="contact" className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-base via-base to-charcoal/70" />
      <div className="absolute left-1/2 top-0 h-72 w-[80vw] -translate-x-1/2 rounded-full bg-electric/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <SectionLabel label="Bookings · Events · Collabs" className="justify-center" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-soft">
              Let&apos;s Make Some{" "}
              <span className="text-electric">Noise.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              For bookings, events and collaborations
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Reveal delay={0.15}>
            <MagneticButton>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-active
                className="inline-flex items-center gap-2 rounded-full bg-soft px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-base"
              >
                <MessageCircle className="h-4 w-4" />
                Book REDNEXT
              </a>
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-active
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 transition-colors hover:border-emerald-300"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.25}>
            <MagneticButton>
              <a
                href={`mailto:${djConfig.email}`}
                data-cursor-active
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-soft transition-colors hover:border-electric/50 hover:text-electric"
              >
                <MailIcon size={16} />
                Email
              </a>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-white/10 bg-charcoal/40 p-6 backdrop-blur-md md:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-soft">
                    Request received
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    We&apos;ll be in touch about your event
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                        Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Your name"
                        className={inputCls(errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1 font-mono text-[10px] text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@email.com"
                        className={inputCls(errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1 font-mono text-[10px] text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                        Event Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setField("date", e.target.value)}
                        className={`${inputCls(errors.date)} [color-scheme:dark]`}
                      />
                      {errors.date && (
                        <p className="mt-1 font-mono text-[10px] text-red-400">
                          {errors.date}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                        Event Location
                      </label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setField("location", e.target.value)}
                        placeholder="City / Venue"
                        className={inputCls(errors.location)}
                      />
                      {errors.location && (
                        <p className="mt-1 font-mono text-[10px] text-red-400">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder="Tell us about the event, capacity, timeframe..."
                      className={`${inputCls(errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-[10px] text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-400">
                      Please fix the highlighted fields
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    data-cursor-active
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-soft px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-base transition-transform hover:scale-[1.02] disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Booking Request"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

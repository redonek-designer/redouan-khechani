"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useAudio } from "@/components/providers/AudioProvider";

export default function IntroGate() {
  const { loadingDone, experienceStarted, startExperience } = useExperience();
  const { enter, setMuted, setVolume } = useAudio();
  const [exit, setExit] = useState(false);

  const proceed = (withSound: boolean) => {
    if (withSound) {
      setVolume(0.7);
      setMuted(false);
      enter();
    } else {
      setMuted(true);
      enter();
    }
    setExit(true);
    setTimeout(startExperience, 900);
  };

  return (
    <AnimatePresence>
      {loadingDone && !experienceStarted && !exit && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/2 h-[90vh] w-[90vw] -translate-x-1/2 rounded-full bg-electric/10 blur-[160px]" />
            <div className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-full bg-violet/10 blur-[140px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-[11px] uppercase tracking-[0.4em] text-electric md:text-xs"
            >
              REDNEXT · AGADIR · TAGHAZOUT
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-soft md:text-6xl"
            >
              Enter the world
              <br />
              of <span className="text-electric">Sound of the Atlantic</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <button
                onClick={() => proceed(true)}
                data-cursor-active
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-electric/40 bg-electric/10 px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-soft transition-colors duration-300 hover:bg-electric/20"
              >
                <Volume2 className="h-4 w-4 text-electric" />
                Enter · Sound On
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => proceed(false)}
                data-cursor-active
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-soft"
              >
                <VolumeX className="h-3.5 w-3.5" />
                Enter Muted
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

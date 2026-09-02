"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function LoadingScreen() {
  const { completeLoading } = useExperience();
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // phase 0: wordmark -> 1: location -> 2: loading text -> 3: done
    const t1 = window.setTimeout(() => setPhase(1), 900);
    const t2 = window.setTimeout(() => setPhase(2), 1700);
    const t3 = window.setTimeout(() => setPhase(3), 2500);
    const t4 = window.setTimeout(() => setVisible(false), 3300);
    const t5 = window.setTimeout(() => completeLoading(), 3550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [completeLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[80vw] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-full bg-violet/10 blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center px-8 text-center">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="font-display text-5xl font-extrabold tracking-[0.35em] text-soft md:text-7xl"
            >
              REDNEXT
            </motion.div>

            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.div
                  key="loc"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mt-5 font-mono text-[11px] uppercase tracking-[0.4em] text-electric md:text-sm"
                >
                  AGADIR · TAGHAZOUT
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {phase >= 2 && (
                <motion.div
                  key="load"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted"
                >
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 animate-[eq_1s_ease-in-out_infinite] rounded-full bg-electric" />
                    <span className="h-2 w-2 animate-[eq_1.3s_ease-in-out_infinite] rounded-full bg-electric" />
                    <span className="h-2 w-2 animate-[eq_0.8s_ease-in-out_infinite] rounded-full bg-electric" />
                  </span>
                  <span className="ml-1">Loading experience...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

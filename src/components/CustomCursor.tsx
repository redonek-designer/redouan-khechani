"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "view" | "play" | "active";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (!fine || touch) return;
    if (window.innerWidth < 768) return;

    const enable = () => {
      setEnabled(true);
      document.body.classList.add("custom-cursor");
    };
    // defer so we don't synchronously setState inside the effect body
    const rafEnable = requestAnimationFrame(enable);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);
    };

    const findMode = (e: MouseEvent): Mode => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-cursor]") as HTMLElement | null;
      if (el) {
        const t = el.getAttribute("data-cursor");
        if (t === "view") return "view";
        if (t === "play") return "play";
        return "active";
      }
      const interactive = target?.closest?.(
        "button, a, input, textarea, select, [data-cursor-active]"
      );
      return interactive ? "active" : "default";
    };

    const onOver = (e: MouseEvent) => setMode(findMode(e));
    const onLeave = () => {
      setVisible(false);
      setMode("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafEnable);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const isText = mode === "view" || mode === "play";
  const size = isText ? 96 : mode === "active" ? 64 : 44;
  const label = mode === "view" ? "View" : "Play";

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-soft mix-blend-difference"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[199] flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          border: isText
            ? "1px solid rgba(91,140,255,0.8)"
            : mode === "active"
            ? "1px solid rgba(245,243,239,0.35)"
            : "1px solid rgba(91,140,255,0.4)",
          background: isText
            ? "rgba(91,140,255,0.08)"
            : mode === "active"
            ? "rgba(245,243,239,0.05)"
            : "transparent",
          boxShadow: isText ? "0 0 50px -12px rgba(91,140,255,0.7)" : undefined,
          transition: `width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, background 0.3s ease, opacity 0.25s ease`,
          willChange: "transform, width, height",
        }}
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric"
          style={{
            opacity: isText ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {label}
        </span>
      </div>
    </>
  );
}

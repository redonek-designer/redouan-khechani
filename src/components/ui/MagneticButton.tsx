"use client";

import { useRef, useState, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  style,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  };

  const reset = () => {
    setOffset({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={reset}
      onClick={onClick}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: active
          ? "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)"
          : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        display: "inline-block",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

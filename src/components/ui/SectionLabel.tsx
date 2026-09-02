"use client";

type Props = {
  label: string;
  className?: string;
};

export default function SectionLabel({ label, className = "" }: Props) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-muted ${className}`}
    >
      <span className="h-px w-10 bg-electric/60" />
      <span>{label}</span>
    </div>
  );
}

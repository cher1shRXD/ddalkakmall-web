"use client";

interface RowProps {
  label: string;
  desc?: string;
  children: React.ReactNode;
  inline?: boolean;
}

export const Row = ({ label, desc, children, inline }: RowProps) => (
  <div className={`flex py-3 ${inline ? "items-center justify-between gap-4" : "flex-col gap-2"}`}>
    <div className={inline ? "min-w-0" : undefined}>
      <p className="text-sm font-medium text-foreground">{label}</p>
      {desc && <p className="text-xs text-foreground-dim mt-0.5 leading-relaxed">{desc}</p>}
    </div>
    <div className={inline ? "shrink-0" : undefined}>{children}</div>
  </div>
);

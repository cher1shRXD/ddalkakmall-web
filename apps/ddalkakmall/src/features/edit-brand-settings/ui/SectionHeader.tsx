"use client";

export const SectionHeader = ({ title, desc }: { title: string; desc?: string }) => (
  <div className="mb-6">
    <h2 className="text-base font-semibold text-foreground">{title}</h2>
    {desc && <p className="text-sm text-foreground-dim mt-1">{desc}</p>}
  </div>
);

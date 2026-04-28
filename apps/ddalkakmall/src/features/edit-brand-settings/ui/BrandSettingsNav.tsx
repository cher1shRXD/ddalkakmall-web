"use client";

import { SECTIONS, SectionId } from "../constants/sections";

interface Props {
  activeId: SectionId;
  onSelect: (id: SectionId) => void;
}

export const BrandSettingsNav = ({ activeId, onSelect }: Props) => (
  <nav className="w-36 shrink-0 border-l border-border py-5 px-2 flex flex-col gap-0.5 overflow-y-auto">
    {SECTIONS.map(({ id, label, icon }) => (
      <button
        key={id}
        onClick={() => onSelect(id)}
        className={[
          "flex items-center gap-2 text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
          activeId === id
            ? "bg-surface-3 text-foreground font-semibold"
            : "text-foreground-dim hover:text-foreground hover:bg-surface-2",
        ].join(" ")}
      >
        <span className="shrink-0">{icon}</span>
        {label}
      </button>
    ))}
  </nav>
);

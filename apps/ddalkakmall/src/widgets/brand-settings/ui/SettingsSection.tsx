"use client";

export const SettingsSection = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-6">{children}</section>
);

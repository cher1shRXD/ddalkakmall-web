"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS, SectionId } from "../constants/sections";

export const useSettingsScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<SectionId>("basic");

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id as SectionId);
      },
      { root: container, threshold: 0.15, rootMargin: "0px 0px -60% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = container.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 8)
        setActiveId(SECTIONS[SECTIONS.length - 1].id as SectionId);
    };
    container.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: SectionId) => {
    const container = scrollRef.current;
    const el = container?.querySelector<HTMLElement>(`#${id}`);
    if (!container || !el) return;
    container.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  };

  return { scrollRef, activeId, scrollTo };
};

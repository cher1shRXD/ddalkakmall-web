'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  target?: Element | null;
}

export const Portal = ({ children, target }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    el.current = document.createElement('div');
    const root = target ?? document.body;
    root.appendChild(el.current);
    setMounted(true);
    return () => {
      if (el.current) root.removeChild(el.current);
    };
  }, [target]);

  if (!mounted || !el.current) return null;
  return createPortal(children, el.current);
}

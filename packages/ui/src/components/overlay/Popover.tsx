'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { Portal } from '../../utils/portal';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface PopoverProps {
  content: React.ReactNode;
  placement?: PopoverPlacement;
  children: React.ReactElement;
  trigger?: 'click' | 'hover';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface Pos { top: number; left: number; }

const getPos = (triggerRect: DOMRect, content: HTMLElement | null, placement: PopoverPlacement): Pos => {
  const gap = 8;
  const tw = content?.offsetWidth ?? 0;
  const th = content?.offsetHeight ?? 0;
  const { top, left, bottom, right, width, height } = triggerRect;

  const map: Record<PopoverPlacement, Pos> = {
    top:          { top: top - th - gap + window.scrollY,  left: left + (width - tw) / 2 + window.scrollX },
    bottom:       { top: bottom + gap + window.scrollY,     left: left + (width - tw) / 2 + window.scrollX },
    left:         { top: top + (height - th) / 2 + window.scrollY, left: left - tw - gap + window.scrollX },
    right:        { top: top + (height - th) / 2 + window.scrollY, left: right + gap + window.scrollX },
    'top-start':  { top: top - th - gap + window.scrollY,  left: left + window.scrollX },
    'top-end':    { top: top - th - gap + window.scrollY,  left: right - tw + window.scrollX },
    'bottom-start': { top: bottom + gap + window.scrollY,  left: left + window.scrollX },
    'bottom-end': { top: bottom + gap + window.scrollY,     left: right - tw + window.scrollX },
  };
  return map[placement];
}

const slideIn: Record<PopoverPlacement, object> = {
  top:          { y: 6 }, bottom:       { y: -6 },
  left:         { x: 6 }, right:        { x: -6 },
  'top-start':  { y: 6 }, 'top-end':    { y: 6 },
  'bottom-start': { y: -6 }, 'bottom-end': { y: -6 },
};

export const Popover = ({ content, placement = 'bottom', children, trigger = 'click', open: controlledOpen, onOpenChange }: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => { setInternalOpen(v); onOpenChange?.(v); };

  const updatePos = () => {
    if (triggerRef.current) {
      setPos(getPos(triggerRef.current.getBoundingClientRect(), contentRef.current, placement));
    }
  };

  const handleTriggerClick = () => {
    if (trigger === 'click') { updatePos(); setOpen(!isOpen); }
  };
  const handleMouseEnter = () => { if (trigger === 'hover') { updatePos(); setOpen(true); } };
  const handleMouseLeave = () => { if (trigger === 'hover') setOpen(false); };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onClick: handleTriggerClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={contentRef}
              style={{ ...styles.content, top: pos.top, left: pos.left, zIndex: zIndex.dropdown + 10 }}
              initial={{ opacity: 0, ...slideIn[placement] }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, ...slideIn[placement] }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  content: {
    position: 'absolute',
    background: colors.surface[1],
    color: colors.text.DEFAULT,
    border: `1px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.lg,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
};

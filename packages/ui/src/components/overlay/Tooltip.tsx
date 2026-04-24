'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { Portal } from '../../utils/portal';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: React.ReactNode;
  disabled?: boolean;
}

interface Pos { top: number; left: number; }

const getPos = (triggerRect: DOMRect, tooltipW: number, tooltipH: number, placement: TooltipPlacement): Pos => {
  const gap = 8;
  const { top, left, bottom, right, width, height } = triggerRect;

  const positions: Record<TooltipPlacement, Pos> = {
    top:          { top: top - tooltipH - gap + window.scrollY,  left: left + (width - tooltipW) / 2 + window.scrollX },
    bottom:       { top: bottom + gap + window.scrollY,           left: left + (width - tooltipW) / 2 + window.scrollX },
    left:         { top: top + (height - tooltipH) / 2 + window.scrollY, left: left - tooltipW - gap + window.scrollX },
    right:        { top: top + (height - tooltipH) / 2 + window.scrollY, left: right + gap + window.scrollX },
    'top-start':    { top: top - tooltipH - gap + window.scrollY,  left: left + window.scrollX },
    'top-end':      { top: top - tooltipH - gap + window.scrollY,  left: right - tooltipW + window.scrollX },
    'bottom-start': { top: bottom + gap + window.scrollY,           left: left + window.scrollX },
    'bottom-end':   { top: bottom + gap + window.scrollY,           left: right - tooltipW + window.scrollX },
  };
  return positions[placement];
}

const slideOffset: Record<TooltipPlacement, object> = {
  top:            { y: 4 }, bottom:       { y: -4 },
  left:           { x: 4 }, right:        { x: -4 },
  'top-start':    { y: 4 }, 'top-end':    { y: 4 },
  'bottom-start': { y: -4 }, 'bottom-end': { y: -4 },
};

export const Tooltip = ({ content, placement = 'top', delay = 400, children, disabled }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      if (wrapperRef.current) {
        const tw = tooltipRef.current?.offsetWidth ?? 0;
        const th = tooltipRef.current?.offsetHeight ?? 0;
        setPos(getPos(wrapperRef.current.getBoundingClientRect(), tw, th, placement));
        setVisible(true);
      }
    }, delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <>
      <span
        ref={wrapperRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        style={{ display: 'contents' }}
      >
        {children}
      </span>
      <Portal>
        <AnimatePresence>
          {visible && (
            <motion.div
              ref={tooltipRef}
              role="tooltip"
              style={{ ...styles.tooltip, top: pos.top, left: pos.left, zIndex: zIndex.toast - 100 }}
              initial={{ opacity: 0, ...slideOffset[placement] }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, ...slideOffset[placement] }}
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
  tooltip: {
    position: 'absolute',
    maxWidth: 240,
    padding: '6px 10px',
    background: colors.surface[4],
    color: colors.text.DEFAULT,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    borderRadius: radius.sm,
    pointerEvents: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    lineHeight: typography.lineHeight.normal,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    border: `1px solid ${colors.border.DEFAULT}`,
  },
};

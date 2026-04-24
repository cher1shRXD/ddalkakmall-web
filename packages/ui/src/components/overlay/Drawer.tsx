'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { Portal } from '../../utils/portal';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  title?: string;
  width?: number | string;
  height?: number | string;
  closable?: boolean;
  children: React.ReactNode;
}

const slideVariants: Record<DrawerPlacement, Variants> = {
  left:   { hidden: { x: '-100%' }, visible: { x: 0 } },
  right:  { hidden: { x: '100%' },  visible: { x: 0 } },
  top:    { hidden: { y: '-100%' }, visible: { y: 0 } },
  bottom: { hidden: { y: '100%' },  visible: { y: 0 } },
};

const drawerPositionStyle: Record<DrawerPlacement, React.CSSProperties> = {
  left:   { top: 0, left: 0, bottom: 0 },
  right:  { top: 0, right: 0, bottom: 0 },
  top:    { top: 0, left: 0, right: 0 },
  bottom: { bottom: 0, left: 0, right: 0 },
};

const drawerBorderRadius: Record<DrawerPlacement, string> = {
  left:   `0 ${radius.lg} ${radius.lg} 0`,
  right:  `${radius.lg} 0 0 ${radius.lg}`,
  top:    `0 0 ${radius.lg} ${radius.lg}`,
  bottom: `${radius.lg} ${radius.lg} 0 0`,
};

export const Drawer = ({ open, onClose, placement = 'right', title, width = 320, height = 320, closable = true, children }: DrawerProps) => {
  const isHorizontal = placement === 'left' || placement === 'right';
  const [vw, setVw] = useState(() => typeof window !== 'undefined' ? window.innerWidth : Infinity);

  useEffect(() => {
    const handler = () => setVw(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const fillsViewport = isHorizontal && typeof width === 'number' && vw <= width;
  const borderRadius = fillsViewport ? 0 : drawerBorderRadius[placement];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && closable) onClose(); };
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, closable, onClose]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              style={{ ...styles.backdrop, zIndex: zIndex.drawer - 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closable ? onClose : undefined}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              style={{
                ...styles.drawer,
                ...drawerPositionStyle[placement],
                ...(isHorizontal ? { width, maxWidth: '100vw' } : { height, maxHeight: '100vh' }),
                borderRadius,
                zIndex: zIndex.drawer,
              }}
              variants={slideVariants[placement]}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {(title || closable) && (
                <div style={styles.header}>
                  {title && <span style={styles.title}>{title}</span>}
                  {closable && (
                    <button
                      type="button"
                      style={styles.closeBtn}
                      onClick={onClose}
                      aria-label="닫기"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}
              <div style={styles.body}>{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: colors.overlay,
  },
  drawer: {
    position: 'fixed',
    background: colors.surface[1],
    color: colors.text.DEFAULT,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: `1px solid ${colors.border.sub}`,
    flexShrink: 0,
    minHeight: 56,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    flex: 1,
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.dim,
    borderRadius: radius.sm,
    padding: 0,
    marginLeft: 8,
    flexShrink: 0,
    transition: 'opacity 0.15s ease',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: 20,
  },
};

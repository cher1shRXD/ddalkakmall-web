'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { Portal } from '../../utils/portal';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapHeight?: string;
}

export const BottomSheet = ({ open, onClose, title, children, snapHeight = '60vh' }: BottomSheetProps) => {
  const controls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              style={{ ...styles.backdrop, zIndex: zIndex.dropdown + 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <motion.div
              ref={sheetRef}
              style={{ ...styles.sheet, maxHeight: snapHeight, zIndex: zIndex.dropdown + 2 }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              drag="y"
              dragControls={controls}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.2 }}
              dragSnapToOrigin
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              onDragEnd={(_, info) => {
                const height = sheetRef.current?.offsetHeight ?? 300;
                if (info.offset.y > height * 0.4 || info.velocity.y > 500) onClose();
              }}
            >
              <div
                style={styles.handleArea}
                onPointerDown={(e) => controls.start(e)}
              >
                <div style={styles.handle} />
              </div>
              {title && <div style={styles.titleBar}><span style={styles.title}>{title}</span></div>}
              <div style={styles.content}>{children}</div>
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
  sheet: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: colors.surface[1],
    color: colors.text.DEFAULT,
    borderRadius: `${radius['2xl']} ${radius['2xl']} 0 0`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    touchAction: 'none',
  },
  handleArea: {
    padding: '10px 0 4px',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'grab',
    flexShrink: 0,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    background: colors.border.DEFAULT,
  },
  titleBar: {
    padding: '8px 16px 12px',
    borderBottom: `1px solid ${colors.border.sub}`,
    flexShrink: 0,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  content: {
    overflowY: 'auto',
    flex: 1,
    padding: 16,
  },
};

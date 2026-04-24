'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { modalStore, type ModalConfig } from '../../store/modal';

const sizeWidths = { sm: 400, md: 520, lg: 680, xl: 860, full: '100%' };

export const ModalItem = ({ id, content, title, size = 'md', closable = true, stackIndex }: ModalConfig & { stackIndex: number }) => {
  const baseZ = zIndex.modal + stackIndex * 10;
  const width = sizeWidths[size];

  useEffect(() => {
    if (!closable) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') modalStore.close(id); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [id, closable]);

  return (
    <>
      {stackIndex === 0 && (
        <motion.div
          style={{ ...styles.backdrop, zIndex: baseZ - 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closable ? () => modalStore.close(id) : undefined}
        />
      )}
      <motion.div
        role="dialog"
        aria-modal="true"
        style={{
          ...styles.positioner,
          zIndex: baseZ,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          style={{ ...styles.modal, width: size === 'full' ? '100%' : width, maxWidth: size === 'full' ? '100%' : 'calc(100vw - 32px)' }}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {(title || closable) && (
            <div style={styles.header}>
              {title && <span style={styles.title}>{title}</span>}
              {closable && (
                <motion.button
                  type="button"
                  style={styles.closeBtn}
                  whileHover={{ scale: 1.1, background: colors.surface[3] }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => modalStore.close(id)}
                  aria-label="닫기"
                >
                  <X size={16} />
                </motion.button>
              )}
            </div>
          )}
          <div style={styles.body}>{content}</div>
        </motion.div>
      </motion.div>
    </>
  );
}


const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: colors.overlay,
  },
  positioner: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    pointerEvents: 'none',
  },
  modal: {
    background: colors.surface[1],
    borderRadius: radius.xl,
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 64px)',
    overflow: 'hidden',
    pointerEvents: 'all',
    border: `1px solid ${colors.border.sub}`,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 20px',
    borderBottom: `1px solid ${colors.border.sub}`,
    flexShrink: 0,
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
    transition: 'background 0.15s ease',
    padding: 0,
    marginLeft: 8,
    flexShrink: 0,
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: 20,
  },
};

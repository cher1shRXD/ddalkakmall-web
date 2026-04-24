'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { toastStore, type ToastData, type ToastType } from '../../store/toast';

const typeConfig: Record<ToastType, { color: string; icon: React.ReactNode }> = {
  success: { color: colors.success.DEFAULT, icon: <CheckCircle2 size={16} /> },
  error:   { color: colors.danger.DEFAULT,  icon: <XCircle size={16} /> },
  info:    { color: colors.info.DEFAULT,    icon: <Info size={16} /> },
  warning: { color: colors.warning.DEFAULT, icon: <AlertTriangle size={16} /> },
};

export const ToastItem = ({ id, type, message, duration }: ToastData) => {
  const cfg = typeConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => toastStore.remove(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration]);

  return (
    <motion.div
      layout
      style={{ ...styles.toast, borderLeftColor: cfg.color }}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <span style={{ ...styles.icon, color: cfg.color }}>{cfg.icon}</span>
      <span style={styles.message}>{message}</span>
      <button
        type="button"
        style={styles.closeBtn}
        onClick={() => toastStore.remove(id)}
        aria-label="닫기"
      >
        <X size={14} />
      </button>
      <motion.div
        style={{ ...styles.progress, background: cfg.color }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  toast: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: 340,
    maxWidth: 'calc(100vw - 32px)',
    padding: '12px 14px',
    background: colors.surface[1],
    color: colors.text.DEFAULT,
    border: `1px solid ${colors.border.DEFAULT}`,
    borderLeft: '3px solid',
    borderRadius: radius.md,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  message: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    lineHeight: typography.lineHeight.normal,
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.dim,
    padding: 2,
    flexShrink: 0,
    borderRadius: radius.sm,
    transition: 'opacity 0.15s ease',
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    transformOrigin: 'left',
    opacity: 0.5,
  },
};

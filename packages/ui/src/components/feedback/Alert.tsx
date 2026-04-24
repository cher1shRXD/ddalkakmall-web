'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

const variantConfig: Record<AlertVariant, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  info:    { color: colors.info.DEFAULT,    bg: colors.info.muted,    border: colors.info.DEFAULT,    icon: <Info size={16} /> },
  success: { color: colors.success.DEFAULT, bg: colors.success.muted, border: colors.success.DEFAULT, icon: <CheckCircle2 size={16} /> },
  warning: { color: colors.warning.DEFAULT, bg: colors.warning.muted, border: colors.warning.DEFAULT, icon: <AlertTriangle size={16} /> },
  danger:  { color: colors.danger.DEFAULT,  bg: colors.danger.muted,  border: colors.danger.DEFAULT,  icon: <XCircle size={16} /> },
};

export const Alert = ({ variant = 'info', title, children, closable, onClose, style }: AlertProps) => {
  const [visible, setVisible] = useState(true);
  const cfg = variantConfig[variant];

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          style={{
            ...styles.wrapper,
            background: cfg.bg,
            borderColor: cfg.border,
            ...style,
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
          transition={{ duration: 0.2 }}
        >
          <span style={{ ...styles.icon, color: cfg.color }}>{cfg.icon}</span>
          <div style={styles.body}>
            {title && <span style={{ ...styles.title, color: cfg.color }}>{title}</span>}
            <span style={styles.message}>{children}</span>
          </div>
          {closable && (
            <button
              type="button"
              style={{ ...styles.closeBtn, color: cfg.color }}
              onClick={handleClose}
              aria-label="닫기"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '12px 14px',
    borderRadius: radius.md,
    border: '1px solid',
    width: '100%',
    boxSizing: 'border-box',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
  },
  message: {
    fontSize: typography.fontSize.sm,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    lineHeight: typography.lineHeight.normal,
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 2,
    flexShrink: 0,
    borderRadius: radius.sm,
    marginTop: 1,
    transition: 'opacity 0.15s ease',
  },
};

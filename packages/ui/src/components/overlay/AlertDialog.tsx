'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { dialogStore, type DialogConfig } from '../../store/dialog';

const variantColor: Record<string, string> = {
  info:    colors.info.DEFAULT,
  success: colors.success.DEFAULT,
  warning: colors.warning.DEFAULT,
  danger:  colors.danger.DEFAULT,
};

const variantIcon: Record<string, React.ReactNode> = {
  info:    <Info size={28} />,
  success: <CheckCircle2 size={28} />,
  warning: <AlertTriangle size={28} />,
  danger:  <XCircle size={28} />,
};

export const AlertDialogItem = ({ message, title, variant = 'info', confirmLabel = '확인' }: Omit<DialogConfig, 'id' | 'type' | 'resolve' | 'cancelLabel'>) => {
  const accentColor = variantColor[variant];

  return (
    <>
      <motion.div
        style={{ ...styles.backdrop, zIndex: zIndex.dialog - 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div style={{ ...styles.positioner, zIndex: zIndex.dialog }}>
        <motion.div
          role="alertdialog"
          aria-modal="true"
          style={styles.dialog}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ color: accentColor, display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            {variantIcon[variant]}
          </span>
          {title && <span style={styles.title}>{title}</span>}
          <p style={styles.message}>{message}</p>
          <motion.button
            type="button"
            style={{ ...styles.confirmBtn, background: accentColor }}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ opacity: 0.75 }}
            onClick={() => dialogStore.resolve(true)}
          >
            {confirmLabel}
          </motion.button>
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
  },
  dialog: {
    background: colors.surface[1],
    color: colors.text.DEFAULT,
    borderRadius: radius.xl,
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    border: `1px solid ${colors.border.sub}`,
    width: 360,
    maxWidth: 'calc(100vw - 32px)',
    padding: '28px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  confirmBtn: {
    marginTop: 8,
    width: '100%',
    height: 42,
    border: 'none',
    borderRadius: radius.md,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.inverse,
    cursor: 'pointer',
    fontFamily: typography.fontFamily.sans,
    transition: 'opacity 0.15s ease',
  },
};

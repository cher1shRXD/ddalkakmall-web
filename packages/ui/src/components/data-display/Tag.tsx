'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export type TagVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface TagProps {
  variant?: TagVariant;
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const variantStyles: Record<TagVariant, React.CSSProperties> = {
  primary: { background: colors.primary.muted, color: colors.primary.DEFAULT, border: `1px solid ${colors.primary.DEFAULT}40` },
  success: { background: colors.success.muted, color: colors.success.DEFAULT, border: `1px solid ${colors.success.DEFAULT}40` },
  warning: { background: colors.warning.muted, color: colors.warning.DEFAULT, border: `1px solid ${colors.warning.DEFAULT}40` },
  danger:  { background: colors.danger.muted,  color: colors.danger.DEFAULT,  border: `1px solid ${colors.danger.DEFAULT}40` },
  info:    { background: colors.info.muted,    color: colors.info.DEFAULT,    border: `1px solid ${colors.info.DEFAULT}40` },
  neutral: { background: colors.surface[2],    color: colors.text.sub,        border: `1px solid ${colors.border.DEFAULT}` },
};

export const Tag = ({ variant = 'neutral', removable, onRemove, children, style }: TagProps) => {
  return (
    <AnimatePresence>
      <motion.span
        style={{ ...styles.tag, ...variantStyles[variant], ...style }}
        layout
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85, width: 0, padding: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
        {removable && (
          <motion.button
            type="button"
            style={{ ...styles.removeBtn, color: 'currentColor' }}
            whileHover={{ opacity: 0.7 }}
            onClick={onRemove}
            aria-label="제거"
          >
            <X size={10} />
          </motion.button>
        )}
      </motion.span>
    </AnimatePresence>
  );
}


const styles: Record<string, React.CSSProperties> = {
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '3px 8px',
    borderRadius: radius.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.sans,
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    opacity: 0.6,
    lineHeight: 0,
    flexShrink: 0,
  },
};

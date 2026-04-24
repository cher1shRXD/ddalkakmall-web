'use client';

import { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FormField = ({ label, error, hint, required, children, style }: FormFieldProps) => {
  const id = useId();

  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
          {required && <span style={styles.required}>*</span>}
        </label>
      )}
      <div style={styles.control}>
        {children}
      </div>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.span
            key="error"
            style={styles.errorText}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {error}
          </motion.span>
        ) : hint ? (
          <motion.span
            key="hint"
            style={styles.hintText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {hint}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  required: {
    color: colors.danger.DEFAULT,
    fontSize: typography.fontSize.md,
    lineHeight: 1,
  },
  control: {
    width: '100%',
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.danger.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  hintText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
  },
};

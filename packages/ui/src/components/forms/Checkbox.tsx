'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Checkbox = ({ checked = false, indeterminate = false, onChange, disabled, label, style }: CheckboxProps) => {
  const isChecked = indeterminate || checked;

  return (
    <label style={{ ...styles.label, ...(disabled && styles.disabled), ...style }}>
      <div style={styles.boxContainer}>
        <motion.div
          style={{
            ...styles.box,
            ...(isChecked ? styles.boxChecked : styles.boxUnchecked),
          }}
          animate={{ scale: isChecked ? 1 : 1 }}
          whileTap={{ scale: disabled ? 1 : 0.92 }}
          onClick={() => !disabled && onChange?.(!checked)}
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              !disabled && onChange?.(!checked);
            }
          }}
        >
          <AnimatePresence mode="wait">
            {indeterminate ? (
              <motion.svg
                key="indeterminate"
                width="10" height="2" viewBox="0 0 10 2" fill="none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.1 }}
              >
                <path d="M1 1H9" stroke={colors.text.inverse} strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            ) : checked ? (
              <motion.svg
                key="check"
                width="10" height="8" viewBox="0 0 10 8" fill="none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.1 }}
              >
                <motion.path
                  d="M1 4L3.5 6.5L9 1"
                  stroke={colors.text.inverse}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.15 }}
                />
              </motion.svg>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
      {label && <span style={styles.labelText}>{label}</span>}
    </label>
  );
}

const styles: Record<string, React.CSSProperties> = {
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
  },
  disabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  boxContainer: {
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'background 0.15s ease, border-color 0.15s ease',
    outline: 'none',
    boxSizing: 'border-box',
  },
  boxUnchecked: {
    background: colors.surface[2],
    border: `1.5px solid ${colors.border.DEFAULT}`,
  },
  boxChecked: {
    background: colors.primary.DEFAULT,
    border: `1.5px solid ${colors.primary.DEFAULT}`,
  },
  labelText: {
    fontSize: typography.fontSize.md,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    lineHeight: typography.lineHeight.normal,
  },
};

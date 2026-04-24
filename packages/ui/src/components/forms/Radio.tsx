'use client';

import { createContext, useContext, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  direction?: 'row' | 'column';
  gap?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const RadioGroup = ({ value, onChange, name, disabled, direction = 'column', gap = 12, children, style }: RadioGroupProps) => {
  const id = useId();
  return (
    <RadioGroupContext.Provider value={{ value, onChange, name: name ?? id, disabled }}>
      <div
        role="radiogroup"
        style={{ display: 'flex', flexDirection: direction, gap, ...style }}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Radio = ({ value, label, disabled: localDisabled, style }: RadioProps) => {
  const ctx = useContext(RadioGroupContext);
  const checked = ctx ? ctx.value === value : false;
  const isDisabled = localDisabled || ctx?.disabled;

  const handleSelect = () => {
    if (!isDisabled) ctx?.onChange(value);
  };

  return (
    <label style={{ ...styles.label, ...(isDisabled && styles.disabled), ...style }}>
      <motion.div
        style={{ ...styles.outer, ...(checked ? styles.outerChecked : styles.outerUnchecked) }}
        whileTap={isDisabled ? {} : { scale: 0.9 }}
        onClick={handleSelect}
        role="radio"
        aria-checked={checked}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleSelect(); }
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              style={styles.dot}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
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
  },
  disabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  outer: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'border-color 0.15s ease',
    outline: 'none',
  },
  outerUnchecked: {
    border: `1.5px solid ${colors.border.DEFAULT}`,
    background: colors.surface[2],
  },
  outerChecked: {
    border: `1.5px solid ${colors.primary.DEFAULT}`,
    background: colors.surface[2],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: colors.primary.DEFAULT,
  },
  labelText: {
    fontSize: typography.fontSize.md,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
};

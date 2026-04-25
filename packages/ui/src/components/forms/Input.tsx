'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'sm' | 'md' | 'lg';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  prefix,
  suffix,
  error,
  clearable,
  onClear,
  disabled,
  style,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined ? String(value).length > 0 : false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          ...styles.wrapper,
          ...styles[`size_${size}`],
          ...(focused && styles.focused),
          ...(error && styles.errored),
          ...(disabled && styles.disabled),
        }}
      >
        {prefix && <span style={styles.adornment}>{prefix}</span>}
        <input
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          style={{ ...styles.input, ...styles[`inputSize_${size}`] }}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          {...props}
        />
        {clearable && hasValue && !disabled && (
          <motion.button
            type="button"
            style={styles.clearBtn}
            onClick={onClear}
            whileHover={{ opacity: 0.7 }}
            tabIndex={-1}
          >
            <X size={13} />
          </motion.button>
        )}
        {suffix && <span style={styles.adornment}>{suffix}</span>}
      </div>
      {error && (
        <motion.span
          style={styles.errorText}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    background: colors.surface[2],
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: colors.border.DEFAULT,
    borderRadius: radius.md,
    transition: 'border-color 0.15s ease',
    overflow: 'hidden',
  },
  size_sm: { height: 30, paddingLeft: 8, paddingRight: 8 },
  size_md: { height: 36, paddingLeft: 12, paddingRight: 12 },
  size_lg: { height: 44, paddingLeft: 14, paddingRight: 14 },
  focused: { borderColor: colors.border.focus },
  errored: { borderColor: colors.danger.DEFAULT },
  disabled: { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    width: '100%',
    minWidth: 0,
  },
  inputSize_sm: { fontSize: typography.fontSize.sm },
  inputSize_md: { fontSize: typography.fontSize.md },
  inputSize_lg: { fontSize: typography.fontSize.lg },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    color: colors.text.dim,
    flexShrink: 0,
    marginRight: 6,
  },
  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.dim,
    padding: 2,
    marginLeft: 4,
    borderRadius: radius.sm,
    flexShrink: 0,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.danger.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
};

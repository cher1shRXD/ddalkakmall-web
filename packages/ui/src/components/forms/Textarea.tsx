'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  autoResize?: boolean;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  error,
  autoResize = false,
  showCount = false,
  maxLength,
  disabled,
  value,
  onChange,
  style,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(
    typeof value === 'string' ? value.length : 0
  );
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    if (autoResize && resolvedRef.current) {
      resolvedRef.current.style.height = 'auto';
      resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
    }
    onChange?.(e);
  };

  useEffect(() => {
    if (autoResize && resolvedRef.current) {
      resolvedRef.current.style.height = 'auto';
      resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
    }
  }, [value, autoResize, resolvedRef]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          ...styles.wrapper,
          ...(focused && styles.focused),
          ...(error && styles.errored),
          ...(disabled && styles.disabled),
        }}
      >
        <textarea
          ref={resolvedRef}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          style={{ ...styles.textarea, ...(autoResize && styles.autoResize), ...style }}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          {...props}
        />
      </div>
      <div style={styles.footer}>
        {error && (
          <motion.span
            style={styles.errorText}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.span>
        )}
        {showCount && maxLength && (
          <span style={styles.counter}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    background: colors.surface[2],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.md,
    transition: 'border-color 0.15s ease',
    overflow: 'hidden',
  },
  focused: {
    borderColor: colors.border.focus,
  },
  errored: {
    borderColor: colors.danger.DEFAULT,
  },
  disabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'vertical',
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.normal,
    padding: '10px 12px',
    minHeight: 80,
    width: '100%',
    boxSizing: 'border-box',
  },
  autoResize: {
    resize: 'none',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.danger.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  counter: {
    fontSize: typography.fontSize.xs,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
    marginLeft: 'auto',
  },
};

'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { Spinner } from '../feedback/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

type OmittedNativeProps = 'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, OmittedNativeProps> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  type = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{
        ...styles.base,
        ...styles[variant],
        ...styles[`size_${size}`],
        ...(fullWidth && styles.fullWidth),
        ...(isDisabled && styles.disabled),
        ...style,
      }}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-disabled={isDisabled}
      data-variant={variant}
      data-size={size}
      {...(props as object)}
    >
      {loading ? (
        <Spinner size="sm" color={variant === 'primary' ? colors.text.inverse : colors.primary.DEFAULT} />
      ) : leftIcon ? (
        <span style={styles.icon}>{leftIcon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {!loading && rightIcon && <span style={styles.icon}>{rightIcon}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: radius.md,
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    letterSpacing: typography.letterSpacing.normal,
    transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
  },
  primary: {
    background: colors.primary.DEFAULT,
    color: colors.text.inverse,
    borderColor: colors.primary.DEFAULT,
  },
  secondary: {
    background: colors.surface[2],
    color: colors.text.DEFAULT,
    borderColor: colors.border.DEFAULT,
  },
  ghost: {
    background: 'transparent',
    color: colors.text.sub,
    borderColor: 'transparent',
  },
  danger: {
    background: colors.danger.DEFAULT,
    color: '#ffffff',
    borderColor: colors.danger.DEFAULT,
  },
  outline: {
    background: 'transparent',
    color: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  size_sm: {
    height: 30,
    padding: '0 10px',
    fontSize: typography.fontSize.sm,
    borderRadius: radius.sm,
    gap: 4,
  },
  size_md: {
    height: 36,
    padding: '0 14px',
    fontSize: typography.fontSize.md,
  },
  size_lg: {
    height: 44,
    padding: '0 20px',
    fontSize: typography.fontSize.lg,
    borderRadius: radius.lg,
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
};

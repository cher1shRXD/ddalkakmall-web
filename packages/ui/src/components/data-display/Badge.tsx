'use client';

import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface BadgeProps {
  count?: number;
  dot?: boolean;
  variant?: BadgeVariant;
  max?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  primary: { background: colors.primary.DEFAULT, color: '#fff' },
  success: { background: colors.success.DEFAULT, color: '#fff' },
  warning: { background: colors.warning.DEFAULT, color: colors.text.inverse },
  danger:  { background: colors.danger.DEFAULT,  color: '#fff' },
  info:    { background: colors.info.DEFAULT,    color: '#fff' },
  neutral: { background: colors.surface[3],      color: colors.text.sub },
};

export const Badge = ({ count, dot, variant = 'danger', max = 99, children, style }: BadgeProps) => {
  const vs = variantStyles[variant];
  const displayCount = count !== undefined ? (count > max ? `${max}+` : String(count)) : null;

  if (!children) {
    if (dot) return <span style={{ ...styles.dot, ...vs, ...style }} />;
    if (displayCount !== null) return <span style={{ ...styles.badge, ...vs, ...style }}>{displayCount}</span>;
    return null;
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex', ...style }}>
      {children}
      {dot && <span style={{ ...styles.dotOverlay, ...vs }} />}
      {!dot && displayCount !== null && (
        <span style={{ ...styles.badgeOverlay, ...vs }}>{displayCount}</span>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    height: 18,
    padding: '0 5px',
    borderRadius: radius.full,
    fontSize: '11px',
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
    lineHeight: 1,
    boxSizing: 'border-box',
  },
  dot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: -6,
    right: -8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    height: 18,
    padding: '0 5px',
    borderRadius: radius.full,
    fontSize: '11px',
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
    lineHeight: 1,
    boxSizing: 'border-box',
    border: `2px solid ${colors.background}`,
  },
  dotOverlay: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: '50%',
    border: `2px solid ${colors.background}`,
  },
};

'use client';

import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  style?: React.CSSProperties;
}

export const Divider = ({ orientation = 'horizontal', label, style }: DividerProps) => {
  if (orientation === 'vertical') {
    return (
      <div
        style={{
          ...styles.vertical,
          ...style,
        }}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div style={{ ...styles.labelWrapper, ...style }} role="separator">
        <div style={styles.line} />
        <span style={styles.label}>{label}</span>
        <div style={styles.line} />
      </div>
    );
  }

  return (
    <div
      style={{ ...styles.horizontal, ...style }}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  horizontal: {
    width: '100%',
    height: '1px',
    background: colors.border.DEFAULT,
    flexShrink: 0,
  },
  vertical: {
    width: '1px',
    alignSelf: 'stretch',
    background: colors.border.DEFAULT,
    flexShrink: 0,
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  line: {
    flex: 1,
    height: '1px',
    background: colors.border.DEFAULT,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
};

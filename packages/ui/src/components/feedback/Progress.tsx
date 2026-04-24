'use client';

import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
  label?: string;
  style?: React.CSSProperties;
}

const trackHeights = { sm: 4, md: 8, lg: 12 };

export const Progress = ({ value, max = 100, size = 'md', color, showLabel, label, style }: ProgressProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const trackH = trackHeights[size];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {(showLabel || label) && (
        <div style={styles.header}>
          {label && <span style={styles.label}>{label}</span>}
          {showLabel && <span style={styles.pctText}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ ...styles.track, height: trackH, borderRadius: trackH / 2 }}>
        <motion.div
          style={{
            ...styles.fill,
            background: color ?? colors.primary.DEFAULT,
            borderRadius: trackH / 2,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
  },
  pctText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.mono,
  },
  track: {
    width: '100%',
    background: colors.surface[3],
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
};

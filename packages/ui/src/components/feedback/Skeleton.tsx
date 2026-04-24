'use client';

import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const Skeleton = ({ width = '100%', height = 16, circle, borderRadius, style }: SkeletonProps) => {
  return (
    <div
      style={{
        ...styles.wrapper,
        width,
        height,
        borderRadius: circle ? '50%' : (borderRadius ?? radius.sm),
        ...style,
      }}
    >
      <motion.div
        style={styles.shimmer}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 }}
      />
    </div>
  );
}

export interface SkeletonTextProps {
  lines?: number;
  gap?: number;
  lastLineWidth?: string;
  style?: React.CSSProperties;
}

export const SkeletonText = ({ lines = 3, gap = 8, lastLineWidth = '60%', style }: SkeletonTextProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? lastLineWidth : '100%'} height={14} />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    background: colors.surface[2],
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
  },
  shimmer: {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent 0%, ${colors.surface[3]} 50%, transparent 100%)`,
    transform: 'skewX(-12deg)',
  },
};

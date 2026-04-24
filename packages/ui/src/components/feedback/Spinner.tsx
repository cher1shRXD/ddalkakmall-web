'use client';

import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const sizeMap: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 40 };
const strokeMap: Record<SpinnerSize, number> = { sm: 2, md: 2.5, lg: 3 };

export const Spinner = ({ size = 'md', color }: SpinnerProps) => {
  const dim = sizeMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke * 2) / 2;
  const circ = 2 * Math.PI * radius;
  const trackColor = colors.surface[3];
  const fillColor = color ?? colors.primary.DEFAULT;

  return (
    <motion.svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={stroke}
      />
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={radius}
        fill="none"
        stroke={fillColor}
        strokeWidth={stroke}
        strokeDasharray={`${circ * 0.72} ${circ * 0.28}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
      />
    </motion.svg>
  );
}

'use client';

import { forwardRef } from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingColor = 'default' | 'sub' | 'dim' | 'primary';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  color?: HeadingColor;
  truncate?: boolean;
}

const fontSizeMap: Record<HeadingLevel, string> = {
  1: typography.fontSize['4xl'],
  2: typography.fontSize['3xl'],
  3: typography.fontSize['2xl'],
  4: typography.fontSize.xl,
  5: typography.fontSize.lg,
  6: typography.fontSize.md,
};

const colorMap: Record<HeadingColor, string> = {
  default: colors.text.DEFAULT,
  sub: colors.text.sub,
  dim: colors.text.dim,
  primary: colors.primary.DEFAULT,
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({
  level = 2,
  color = 'default',
  truncate = false,
  style,
  children,
  ...props
}, ref) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Tag
      ref={ref}
      style={{
        fontFamily: typography.fontFamily.sans,
        fontSize: fontSizeMap[level],
        fontWeight: typography.fontWeight.bold,
        color: colorMap[color],
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
        margin: 0,
        ...(truncate && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
});

Heading.displayName = 'Heading';

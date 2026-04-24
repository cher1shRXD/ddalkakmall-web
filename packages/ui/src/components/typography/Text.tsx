'use client';

import { forwardRef } from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextColor = 'default' | 'sub' | 'dim' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type TextElement = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'code';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  mono?: boolean;
}

const colorMap: Record<TextColor, string> = {
  default: colors.text.DEFAULT,
  sub: colors.text.sub,
  dim: colors.text.dim,
  primary: colors.primary.DEFAULT,
  success: colors.success.DEFAULT,
  warning: colors.warning.DEFAULT,
  danger: colors.danger.DEFAULT,
  info: colors.info.DEFAULT,
};

export const Text = forwardRef<HTMLElement, TextProps>(({
  as: Tag = 'span',
  size = 'md',
  weight = 'regular',
  color = 'default',
  truncate = false,
  mono = false,
  style,
  children,
  ...props
}, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag
      ref={ref as any}
      style={{
        fontFamily: mono ? typography.fontFamily.mono : typography.fontFamily.sans,
        fontSize: typography.fontSize[size],
        fontWeight: typography.fontWeight[weight],
        color: colorMap[color],
        lineHeight: typography.lineHeight.normal,
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

Text.displayName = 'Text';

'use client';

import { useState } from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  style?: React.CSSProperties;
}

const sizeMap: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 52, xl: 64 };
const fontSizeMap: Record<AvatarSize, string> = {
  xs: typography.fontSize.xs,
  sm: typography.fontSize.sm,
  md: typography.fontSize.md,
  lg: typography.fontSize.xl,
  xl: typography.fontSize['2xl'],
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
}

const BG_COLORS = [
  '#7c6ef7', '#34c98a', '#f5a623', '#f25f5c', '#4da8f7',
  '#a78bfa', '#34d399', '#fb923c', '#f87171', '#60a5fa',
];

const pickColor = (name?: string): string => {
  if (!name) return colors.surface[3];
  const code = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return BG_COLORS[code % BG_COLORS.length];
}

export const Avatar = ({ src, name, size = 'md', style }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const dim = sizeMap[size];
  const showImg = src && !imgError;

  return (
    <div
      style={{
        ...styles.base,
        width: dim,
        height: dim,
        background: showImg ? 'transparent' : pickColor(name),
        fontSize: fontSizeMap[size],
        ...style,
      }}
      aria-label={name}
    >
      {showImg ? (
        <img src={src} alt={name} style={styles.img} onError={() => setImgError(true)} />
      ) : (
        <span style={styles.initials}>
          {name ? getInitials(name) : <FallbackIcon dim={dim} />}
        </span>
      )}
    </div>
  );
}

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
  style?: React.CSSProperties;
}

export const AvatarGroup = ({ avatars, max = 4, size = 'md', style }: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const extra = avatars.length - max;
  const dim = sizeMap[size];
  const overlap = Math.floor(dim * 0.3);

  return (
    <div style={{ display: 'flex', ...style }}>
      {visible.map((a, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -overlap, zIndex: visible.length - i }}>
          <Avatar {...a} size={size} style={{ border: `2px solid ${colors.background}`, borderRadius: '50%' }} />
        </div>
      ))}
      {extra > 0 && (
        <div
          style={{
            marginLeft: -overlap,
            width: dim,
            height: dim,
            borderRadius: '50%',
            background: colors.surface[3],
            border: `2px solid ${colors.background}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: typography.fontSize.xs,
            color: colors.text.sub,
            fontFamily: typography.fontFamily.sans,
            fontWeight: typography.fontWeight.semibold,
            zIndex: 0,
          }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

const FallbackIcon = ({ dim }: { dim: number }) => {
  const s = dim * 0.5;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5" /><path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  initials: {
    color: '#ffffff',
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const colors = {
  background: 'var(--background)',

  surface: {
    1: 'var(--surface-1)',
    2: 'var(--surface-2)',
    3: 'var(--surface-3)',
    4: 'var(--surface-4)',
  },

  border: {
    DEFAULT: 'var(--border)',
    sub: 'var(--border-sub)',
    focus: 'var(--border-focus)',
  },

  primary: {
    DEFAULT: 'var(--primary)',
    hover: 'var(--primary-hover)',
    active: 'var(--primary-active)',
    muted: 'var(--primary-muted)',
  },

  success: {
    DEFAULT: 'var(--success)',
    muted: 'var(--success-muted)',
  },

  warning: {
    DEFAULT: 'var(--warning)',
    muted: 'var(--warning-muted)',
  },

  danger: {
    DEFAULT: 'var(--danger)',
    muted: 'var(--danger-muted)',
  },

  info: {
    DEFAULT: 'var(--info)',
    muted: 'var(--info-muted)',
  },

  text: {
    DEFAULT: 'var(--foreground)',
    sub: 'var(--foreground-sub)',
    dim: 'var(--foreground-dim)',
    inverse: 'var(--foreground-inverse)',
  },

  overlay: 'var(--overlay)',
} as const;

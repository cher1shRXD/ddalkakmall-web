export const colors = {
  background: '#0a0a0a',

  surface: {
    1: '#111111',
    2: '#191919',
    3: '#222222',
    4: '#2c2c2c',
  },

  border: {
    DEFAULT: '#2a2a2a',
    sub: '#1a1a1a',
    focus: 'rgba(255, 255, 255, 0.45)',
  },

  primary: {
    DEFAULT: '#ffffff',
    hover: '#e8e8e8',
    active: '#d0d0d0',
    muted: 'rgba(255, 255, 255, 0.08)',
  },

  success: {
    DEFAULT: '#34c98a',
    muted: 'rgba(52, 201, 138, 0.12)',
  },

  warning: {
    DEFAULT: '#f5a623',
    muted: 'rgba(245, 166, 35, 0.12)',
  },

  danger: {
    DEFAULT: '#f25f5c',
    muted: 'rgba(242, 95, 92, 0.12)',
  },

  info: {
    DEFAULT: '#4da8f7',
    muted: 'rgba(77, 168, 247, 0.12)',
  },

  text: {
    DEFAULT: '#f0f0f0',
    sub: '#808080',
    dim: '#484848',
    inverse: '#0a0a0a',
  },

  overlay: 'rgba(0, 0, 0, 0.85)',
} as const;

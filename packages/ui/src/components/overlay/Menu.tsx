'use client';

import { useState } from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  style?: React.CSSProperties;
}

export const Menu = ({ items, style }: MenuProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div style={{ ...styles.menu, ...style }} role="menu">
      {items.map((item, i) => {
        if (item.separator) {
          return <div key={`sep-${i}`} style={styles.separator} role="separator" />;
        }
        const isHovered = hoveredKey === item.key && !item.disabled;
        return (
          <button
            key={item.key}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            style={{
              ...styles.item,
              ...(item.danger && styles.itemDanger),
              ...(item.disabled && styles.itemDisabled),
              background: isHovered
                ? (item.danger ? colors.danger.muted : colors.surface[3])
                : 'none',
            }}
            onMouseEnter={() => !item.disabled && setHoveredKey(item.key)}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => { item.onClick?.(); }}
          >
            {item.icon && <span style={styles.icon}>{item.icon}</span>}
            <span style={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  menu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'left',
    transition: 'background 0.1s ease',
    borderRadius: radius.sm,
    margin: '0 4px',
    boxSizing: 'border-box',
    color: colors.text.DEFAULT,
  },
  itemDanger: { color: colors.danger.DEFAULT },
  itemDisabled: { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' },
  icon: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    flexShrink: 0,
    opacity: 0.7,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: 'inherit',
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
  },
  separator: {
    height: 1,
    background: colors.border.sub,
    margin: '4px 0',
  },
};

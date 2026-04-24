'use client';

import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export type TabsVariant = 'underline' | 'fill';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  style?: React.CSSProperties;
}

export const Tabs = ({ items, defaultValue, value: controlled, onChange, variant = 'underline', style }: TabsProps) => {
  const uid = useId();
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? '');
  const active = controlled !== undefined ? controlled : internal;

  const handleChange = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  const activeItem = items.find((i) => i.value === active);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <div
        role="tablist"
        style={{
          ...styles.tabList,
          ...(variant === 'fill' && styles.tabListFill),
        }}
      >
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              style={{
                ...styles.tab,
                ...(variant === 'fill' ? styles.tabFill : styles.tabUnderline),
                ...(item.disabled && styles.tabDisabled),
              }}
              onClick={() => !item.disabled && handleChange(item.value)}
            >
              <span style={{ ...styles.tabLabel, ...(isActive && styles.tabLabelActive) }}>
                {item.label}
              </span>
              {isActive && variant === 'underline' && (
                <motion.div layoutId={`${uid}-underline`} style={styles.underlineIndicator} transition={{ duration: 0.18, ease: 'easeOut' }} />
              )}
              {isActive && variant === 'fill' && (
                <motion.div layoutId={`${uid}-pill`} style={styles.pillIndicator} transition={{ duration: 0.18, ease: 'easeOut' }} />
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {activeItem?.content !== undefined && (
          <motion.div
            key={active}
            role="tabpanel"
            style={styles.panel}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            {activeItem.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tabList: {
    display: 'flex',
    borderBottom: `1px solid ${colors.border.DEFAULT}`,
    position: 'relative',
  },
  tabListFill: {
    gap: 4,
    padding: 4,
    background: colors.surface[2],
    borderRadius: radius.lg,
    border: 'none',
  },
  tab: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    flex: 'none',
    zIndex: 1,
  },
  tabFill: {
    flex: 1,
    borderRadius: radius.md,
    padding: '7px 12px',
    zIndex: 1,
  },
  tabUnderline: {
    paddingBottom: 12,
  },
  tabDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  tabLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
    position: 'relative',
    zIndex: 1,
    transition: 'color 0.15s ease',
  },
  tabLabelActive: {
    color: colors.text.DEFAULT,
    fontWeight: typography.fontWeight.semibold,
  },
  underlineIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    background: colors.primary.DEFAULT,
    borderRadius: '2px 2px 0 0',
  },
  pillIndicator: {
    position: 'absolute',
    inset: 0,
    background: colors.surface[3],
    borderRadius: radius.md,
    zIndex: 0,
  },
  panel: {
    paddingTop: 16,
  },
};

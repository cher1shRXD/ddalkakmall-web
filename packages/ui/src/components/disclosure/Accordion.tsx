'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface AccordionItem {
  value: string;
  header: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultValues?: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
  style?: React.CSSProperties;
}

export const Accordion = ({ items, multiple = false, defaultValues = [], value: controlled, onChange, style }: AccordionProps) => {
  const [internal, setInternal] = useState<string[]>(defaultValues);
  const open = controlled !== undefined ? controlled : internal;

  const toggle = (v: string) => {
    let next: string[];
    if (open.includes(v)) {
      next = open.filter((x) => x !== v);
    } else {
      next = multiple ? [...open, v] : [v];
    }
    setInternal(next);
    onChange?.(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value} style={{ ...styles.item, ...(item.disabled && styles.itemDisabled) }}>
            <motion.button
              type="button"
              style={styles.header}
              onClick={() => !item.disabled && toggle(item.value)}
              aria-expanded={isOpen}
              whileHover={item.disabled ? {} : { background: colors.surface[3] }}
            >
              <span style={styles.headerText}>{item.header}</span>
              <motion.span
                style={styles.chevron}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
              >
                <ChevronDown size={15} />
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={styles.content}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  item: {
    background: colors.surface[1],
    border: `1px solid ${colors.border.sub}`,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  itemDisabled: {
    opacity: 0.45,
    pointerEvents: 'none',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'left',
    transition: 'background 0.15s ease',
    gap: 12,
  },
  headerText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    flex: 1,
  },
  chevron: {
    color: colors.text.dim,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  content: {
    padding: '12px 16px 16px',
    fontSize: typography.fontSize.md,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    lineHeight: typography.lineHeight.relaxed,
    borderTop: `1px solid ${colors.border.sub}`,
  },
};

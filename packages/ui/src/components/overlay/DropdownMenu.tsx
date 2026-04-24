'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { Menu, type MenuItem } from './Menu';
import { Portal } from '../../utils/portal';

export interface DropdownMenuProps {
  items: MenuItem[];
  trigger: React.ReactElement;
  placement?: 'bottom-start' | 'bottom-end' | 'bottom';
}

export const DropdownMenu = ({ items, trigger, placement = 'bottom-start' }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, minWidth: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const menuW = menuRef.current?.offsetWidth ?? 0;
      const gap = 6;
      let left = rect.left + window.scrollX;
      if (placement === 'bottom-end') left = rect.right - menuW + window.scrollX;
      if (placement === 'bottom') left = rect.left + (rect.width - menuW) / 2 + window.scrollX;
      setPos({ top: rect.bottom + gap + window.scrollY, left, minWidth: rect.width });
    }
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const wrappedItems: MenuItem[] = items.map((item) => ({
    ...item,
    onClick: () => { item.onClick?.(); setOpen(false); },
  }));

  return (
    <>
      {cloneElement(trigger, { ref: triggerRef, onClick: handleOpen })}
      <Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              style={{ ...styles.dropdown, top: pos.top, left: pos.left, minWidth: pos.minWidth, zIndex: zIndex.dropdown }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
            >
              <Menu items={wrappedItems} />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  dropdown: {
    position: 'absolute',
    background: colors.surface[1],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.lg,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
};

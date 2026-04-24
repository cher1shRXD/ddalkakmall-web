'use client';

import { motion, AnimatePresence } from 'framer-motion';

export interface CollapseProps {
  open: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Collapse = ({ open, children, style }: CollapseProps) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="collapse"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: 'hidden', ...style }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

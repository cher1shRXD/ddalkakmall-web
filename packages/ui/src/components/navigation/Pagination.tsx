'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface PaginationProps {
  total: number;
  page: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  siblingCount?: number;
  style?: React.CSSProperties;
}

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

const getPages = (total: number, current: number, siblings: number): (number | '...')[] => {
  const totalPages = total;
  if (totalPages <= 7) return range(1, totalPages);

  const left = Math.max(2, current - siblings);
  const right = Math.min(totalPages - 1, current + siblings);

  const pages: (number | '...')[] = [1];
  if (left > 2) pages.push('...');
  pages.push(...range(left, right));
  if (right < totalPages - 1) pages.push('...');
  pages.push(totalPages);
  return pages;
}

export const Pagination = ({ total, page, pageSize = 10, onChange, siblingCount = 1, style }: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);
  const pages = getPages(totalPages, page, siblingCount);

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChange?.(p);
  };

  return (
    <nav aria-label="pagination" style={{ ...styles.nav, ...style }}>
      <motion.button
        type="button"
        style={{ ...styles.btn, ...(page === 1 && styles.btnDisabled) }}
        onClick={() => go(page - 1)}
        disabled={page === 1}
        whileHover={page === 1 ? {} : { background: colors.surface[3] }}
        whileTap={page === 1 ? {} : { opacity: 0.7 }}
        aria-label="이전 페이지"
      >
        <ChevronLeft size={15} />
      </motion.button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} style={styles.ellipsis}>···</span>
        ) : (
          <motion.button
            key={p}
            type="button"
            style={{ ...styles.btn, ...(p === page ? styles.btnActive : {}) }}
            onClick={() => go(p)}
            whileHover={p === page ? {} : { background: colors.surface[3] }}
            whileTap={p === page ? {} : { opacity: 0.7 }}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </motion.button>
        )
      )}

      <motion.button
        type="button"
        style={{ ...styles.btn, ...(page === totalPages && styles.btnDisabled) }}
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        whileHover={page === totalPages ? {} : { background: colors.surface[3] }}
        whileTap={page === totalPages ? {} : { scale: 0.95 }}
        aria-label="다음 페이지"
      >
        <ChevronRight size={15} />
      </motion.button>
    </nav>
  );
}


const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 34,
    height: 34,
    padding: '0 6px',
    background: colors.surface[2],
    border: `1px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.md,
    fontSize: typography.fontSize.sm,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.15s ease',
    fontWeight: typography.fontWeight.medium,
  },
  btnActive: {
    background: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
  btnDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  ellipsis: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 34,
    height: 34,
    fontSize: typography.fontSize.sm,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
    letterSpacing: '0.1em',
  },
};

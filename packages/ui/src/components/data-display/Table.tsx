'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { Checkbox } from '../forms/Checkbox';

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T extends { id?: string | number }> {
  columns: TableColumn<T>[];
  data: T[];
  selectable?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;
  onRowClick?: (row: T) => void;
  emptyText?: string;
  loading?: boolean;
  style?: React.CSSProperties;
}

type SortDir = 'asc' | 'desc' | null;

export const Table = <T extends { id?: string | number }>({
  columns,
  data,
  selectable,
  selectedIds = [],
  onSelectionChange,
  onRowClick,
  emptyText = '데이터가 없습니다',
  loading,
  style,
}: TableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc'); }
    else if (sortDir === 'asc') setSortDir('desc');
    else { setSortKey(null); setSortDir(null); }
  };

  const allSelected = data.length > 0 && data.every((r) => r.id !== undefined && selectedIds.includes(r.id));
  const someSelected = data.some((r) => r.id !== undefined && selectedIds.includes(r.id));

  const toggleAll = () => {
    if (allSelected) onSelectionChange?.([]);
    else onSelectionChange?.(data.map((r) => r.id!).filter(Boolean));
  };
  const toggleRow = (id: string | number) => {
    onSelectionChange?.(selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]);
  };

  const rowKey = (row: T, i: number) => (row.id !== undefined ? String(row.id) : String(i));

  return (
    <div style={{ ...styles.wrapper, ...style }}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            {selectable && (
              <th style={{ ...styles.th, width: 44, padding: '0 16px' }}>
                <Checkbox checked={allSelected} indeterminate={someSelected && !allSelected} onChange={toggleAll} />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  ...styles.th,
                  width: col.width,
                  textAlign: col.align ?? 'left',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: col.sortable ? 'none' : 'auto',
                }}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span style={styles.thContent}>
                  {col.header}
                  {col.sortable && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {loading ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={styles.emptyCell}>
                <span style={styles.emptyText}>로딩 중...</span>
              </td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={styles.emptyCell}>
                <span style={styles.emptyText}>{emptyText}</span>
              </td></tr>
            ) : data.map((row, i) => {
              const id = row.id;
              const isSelected = id !== undefined && selectedIds.includes(id);
              return (
                <motion.tr
                  key={rowKey(row, i)}
                  style={{
                    ...styles.row,
                    ...(isSelected && styles.rowSelected),
                    ...(onRowClick && styles.rowClickable),
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={onRowClick ? { background: colors.surface[3] } : undefined}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && id !== undefined && (
                    <td style={{ ...styles.td, width: 44, padding: '0 16px' }} onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={isSelected} onChange={() => toggleRow(id)} />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} style={{ ...styles.td, width: col.width, textAlign: col.align ?? 'left' }}>
                      {col.render ? col.render(row, i) : (row as Record<string, React.ReactNode>)[col.key]}
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 3L7 11" stroke={active ? colors.primary.DEFAULT : colors.text.dim} strokeWidth="1.5" strokeLinecap="round" />
      {(!active || dir === 'asc') && <path d="M4 6L7 3L10 6" stroke={active && dir === 'asc' ? colors.primary.DEFAULT : colors.text.dim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
      {(!active || dir === 'desc') && <path d="M4 8L7 11L10 8" stroke={active && dir === 'desc' ? colors.primary.DEFAULT : colors.text.dim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    overflow: 'auto',
    borderRadius: radius.lg,
    border: `1px solid ${colors.border.DEFAULT}`,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: typography.fontFamily.sans,
  },
  headerRow: {
    background: colors.surface[2],
    borderBottom: `1px solid ${colors.border.DEFAULT}`,
  },
  th: {
    padding: '10px 16px',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dim,
    whiteSpace: 'nowrap',
  },
  thContent: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  row: {
    borderBottom: `1px solid ${colors.border.sub}`,
    transition: 'background 0.1s ease',
  },
  rowSelected: {
    background: colors.primary.muted,
  },
  rowClickable: {
    cursor: 'pointer',
  },
  td: {
    padding: '12px 16px',
    fontSize: typography.fontSize.sm,
    color: colors.text.DEFAULT,
    verticalAlign: 'middle',
  },
  emptyCell: {
    padding: '48px 16px',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
  },
};

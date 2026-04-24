'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { useIsMobile } from '../../utils/useIsMobile';
import { BottomSheet } from '../overlay/BottomSheet';
import { Portal } from '../../utils/portal';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const Select = ({ options, value, onChange, placeholder = '선택', disabled, searchable, error, size = 'md', style }: SelectProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = search ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())) : options;

  const handleOpen = () => {
    if (disabled) return;
    if (!isMobile && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 6 + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
    setOpen(true);
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
    setSearch('');
  };

  useEffect(() => {
    if (!open) { setSearch(''); setHoveredValue(null); }
  }, [open]);

  const optionList = (
    <>
      {searchable && (
        <div style={styles.searchWrapper}>
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색..."
            style={styles.searchInput}
          />
        </div>
      )}
      <div style={styles.optionList}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>결과 없음</div>
        ) : filtered.map((opt) => (
          <div
            key={opt.value}
            style={{
              ...styles.option,
              ...(opt.value === value && styles.optionSelected),
              ...(opt.disabled && styles.optionDisabled),
              background: hoveredValue === opt.value && !opt.disabled ? colors.surface[3] : undefined,
            }}
            onMouseEnter={() => !opt.disabled && setHoveredValue(opt.value)}
            onMouseLeave={() => setHoveredValue(null)}
            onClick={() => !opt.disabled && handleSelect(opt.value)}
          >
            {opt.label}
            {opt.value === value && <Check size={14} strokeWidth={2.5} />}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      <motion.button
        ref={triggerRef}
        type="button"
        style={{
          ...styles.trigger,
          ...styles[`size_${size}`],
          ...(open && styles.triggerOpen),
          ...(error && styles.triggerError),
          ...(disabled && styles.triggerDisabled),
        }}
        whileTap={disabled ? {} : { scale: 0.99 }}
        onClick={handleOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={selected ? styles.selectedText : styles.placeholder}>
          {selected?.label ?? placeholder}
        </span>
        <motion.span
          style={styles.chevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      {error && <span style={styles.errorText}>{error}</span>}

      {isMobile ? (
        <BottomSheet open={open} onClose={() => setOpen(false)} title={placeholder}>
          {optionList}
        </BottomSheet>
      ) : (
        <Portal>
          <AnimatePresence>
            {open && (
              <>
                <div style={styles.overlay} onClick={() => setOpen(false)} />
                <motion.div
                  role="listbox"
                  style={{ ...styles.dropdown, top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width, zIndex: zIndex.dropdown }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  {optionList}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Portal>
      )}
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    background: colors.surface[2],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.md,
    cursor: 'pointer',
    fontFamily: typography.fontFamily.sans,
    textAlign: 'left',
    transition: 'border-color 0.15s ease',
    outline: 'none',
  },
  size_sm: { height: 30, padding: '0 8px', fontSize: typography.fontSize.sm },
  size_md: { height: 36, padding: '0 12px', fontSize: typography.fontSize.md },
  size_lg: { height: 44, padding: '0 14px', fontSize: typography.fontSize.lg },
  triggerOpen: { borderColor: colors.border.focus },
  triggerError: { borderColor: colors.danger.DEFAULT },
  triggerDisabled: { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' },
  selectedText: { color: colors.text.DEFAULT, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  placeholder: { color: colors.text.dim, flex: 1 },
  chevron: { color: colors.text.dim, display: 'flex', alignItems: 'center', marginLeft: 8, flexShrink: 0 },
  overlay: { position: 'fixed', inset: 0, zIndex: zIndex.dropdown - 1 },
  dropdown: {
    position: 'absolute',
    background: colors.surface[1],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.lg,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    maxHeight: 280,
    display: 'flex',
    flexDirection: 'column',
  },
  searchWrapper: {
    padding: '8px 8px 4px',
    borderBottom: `1px solid ${colors.border.sub}`,
    flexShrink: 0,
  },
  searchInput: {
    width: '100%',
    background: colors.surface[2],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.sm,
    outline: 'none',
    padding: '6px 10px',
    fontSize: typography.fontSize.sm,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    boxSizing: 'border-box',
  },
  optionList: { overflowY: 'auto', padding: '4px 0' },
  option: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    fontSize: typography.fontSize.md,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    cursor: 'pointer',
    transition: 'background 0.1s ease',
    gap: 8,
  },
  optionSelected: { color: colors.primary.DEFAULT },
  optionDisabled: { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' },
  empty: { padding: '16px 12px', color: colors.text.dim, fontSize: typography.fontSize.sm, fontFamily: typography.fontFamily.sans, textAlign: 'center' },
  errorText: { fontSize: typography.fontSize.xs, color: colors.danger.DEFAULT, fontFamily: typography.fontFamily.sans },
};

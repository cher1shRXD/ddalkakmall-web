'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/zIndex';
import { useIsMobile } from '../../utils/useIsMobile';
import { BottomSheet } from '../overlay/BottomSheet';
import { Portal } from '../../utils/portal';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const formatDate = (d: Date) => {
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
}
const isSameDay = (a: Date, b: Date) => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
const isBetween = (d: Date, start: Date, end: Date) => {
  const t = d.getTime();
  return t > start.getTime() && t < end.getTime();
}

export const DateRangePicker = ({ value, onChange, placeholder = '날짜 범위 선택', disabled, style }: DateRangePickerProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState<'start' | 'end'>('start');
  const [cursor, setCursor] = useState(new Date());
  const [hover, setHover] = useState<Date | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const range: DateRange = value ?? { start: null, end: null };

  const handleOpen = () => {
    if (disabled) return;
    if (!isMobile && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 6 + window.scrollY, left: rect.left + window.scrollX });
    }
    setPicking('start');
    setOpen(true);
  };

  const handleSelect = (date: Date) => {
    if (picking === 'start') {
      onChange?.({ start: date, end: null });
      setPicking('end');
    } else {
      if (range.start && date < range.start) {
        onChange?.({ start: date, end: range.start });
      } else {
        onChange?.({ start: range.start, end: date });
      }
      setOpen(false);
      setHover(null);
      setPicking('start');
    }
  };

  const displayText = range.start && range.end
    ? `${formatDate(range.start)} ~ ${formatDate(range.end)}`
    : range.start
    ? `${formatDate(range.start)} ~ 종료일 선택`
    : placeholder;

  const rangeCalendar = (
    <RangeCalendar
      cursor={cursor}
      onCursorChange={setCursor}
      range={range}
      hover={hover}
      onHover={setHover}
      onSelect={handleSelect}
      picking={picking}
      showTwo={!isMobile}
    />
  );

  return (
    <div style={{ position: 'relative', ...style }}>
      <motion.button
        ref={triggerRef}
        type="button"
        style={{
          ...styles.trigger,
          ...(open && styles.triggerOpen),
          ...(disabled && styles.triggerDisabled),
        }}
        whileTap={disabled ? {} : { scale: 0.99 }}
        onClick={handleOpen}
        disabled={disabled}
      >
        <Calendar size={15} />
        <span style={(range.start || range.end) ? styles.valueText : styles.placeholder}>
          {displayText}
        </span>
        {(range.start || range.end) && (
          <motion.button
            type="button"
            style={styles.clearBtn}
            whileHover={{ opacity: 0.7 }}
            onClick={(e) => { e.stopPropagation(); onChange?.({ start: null, end: null }); }}
          >
            <X size={13} />
          </motion.button>
        )}
      </motion.button>

      {isMobile ? (
        <BottomSheet open={open} onClose={() => setOpen(false)} title={picking === 'start' ? '시작일 선택' : '종료일 선택'}>
          {rangeCalendar}
        </BottomSheet>
      ) : (
        <Portal>
          <AnimatePresence>
            {open && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: zIndex.dropdown - 1 }} onClick={() => setOpen(false)} />
                <motion.div
                  style={{ ...styles.dropdown, top: dropdownPos.top, left: dropdownPos.left, zIndex: zIndex.dropdown }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  {rangeCalendar}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Portal>
      )}
    </div>
  );
}

interface RangeCalendarProps {
  cursor: Date;
  onCursorChange: (d: Date) => void;
  range: DateRange;
  hover: Date | null;
  onHover: (d: Date | null) => void;
  onSelect: (d: Date) => void;
  picking: 'start' | 'end';
  showTwo: boolean;
}

const RangeCalendar = ({ cursor, onCursorChange, range, hover, onHover, onSelect, picking, showTwo }: RangeCalendarProps) => {
  const months = showTwo
    ? [cursor, new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)]
    : [cursor];

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        {months.map((monthDate, idx) => (
          <MonthGrid
            key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}
            date={monthDate}
            range={range}
            hover={hover}
            onHover={onHover}
            onSelect={onSelect}
            showPrev={idx === 0}
            showNext={idx === months.length - 1}
            onPrev={() => onCursorChange(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            onNext={() => onCursorChange(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            picking={picking}
          />
        ))}
      </div>
    </div>
  );
}

interface MonthGridProps {
  date: Date;
  range: DateRange;
  hover: Date | null;
  onHover: (d: Date | null) => void;
  onSelect: (d: Date) => void;
  showPrev: boolean;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  picking: 'start' | 'end';
}

const MonthGrid = ({ date, range, hover, onHover, onSelect, showPrev, showNext, onPrev, onNext, picking }: MonthGridProps) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))];

  const effectiveEnd = picking === 'end' && range.start && hover ? hover : range.end;

  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <div style={calStyles.header}>
        {showPrev ? (
          <motion.button type="button" style={calStyles.navBtn} onClick={onPrev} whileTap={{ scale: 0.9 }}>
            <ChevronLeft size={15} />
          </motion.button>
        ) : <div style={{ width: 28 }} />}
        <span style={calStyles.monthLabel}>{year}년 {month + 1}월</span>
        {showNext ? (
          <motion.button type="button" style={calStyles.navBtn} onClick={onNext} whileTap={{ scale: 0.9 }}>
            <ChevronRight size={15} />
          </motion.button>
        ) : <div style={{ width: 28 }} />}
      </div>
      <div style={calStyles.dayHeaders}>
        {DAYS.map((d) => <span key={d} style={calStyles.dayHeader}>{d}</span>)}
      </div>
      <div style={calStyles.grid}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const isStart = range.start ? isSameDay(d, range.start) : false;
          const isEnd = effectiveEnd ? isSameDay(d, effectiveEnd) : false;
          const inRange = range.start && effectiveEnd && d > range.start && d < effectiveEnd ? isBetween(d, range.start, effectiveEnd) : false;

          return (
            <motion.button
              key={d.toISOString()}
              type="button"
              style={{
                ...calStyles.day,
                ...(isStart && calStyles.dayStart),
                ...(isEnd && calStyles.dayEnd),
                ...(inRange && calStyles.dayInRange),
              }}
              whileHover={!isStart && !isEnd ? { background: colors.surface[3] } : {}}
              whileTap={{ opacity: 0.7 }}
              onClick={() => onSelect(d)}
              onMouseEnter={() => onHover(d)}
              onMouseLeave={() => onHover(null)}
            >
              {d.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    height: 36,
    padding: '0 12px',
    background: colors.surface[2],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.md,
    cursor: 'pointer',
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.md,
    color: colors.text.dim,
    textAlign: 'left',
    transition: 'border-color 0.15s ease',
    outline: 'none',
  },
  triggerOpen: { borderColor: colors.border.focus },
  triggerDisabled: { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' },
  valueText: { color: colors.text.DEFAULT, flex: 1 },
  placeholder: { color: colors.text.dim, flex: 1 },
  clearBtn: { display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: colors.text.dim, padding: 2, marginLeft: 'auto' },
  dropdown: {
    position: 'absolute',
    background: colors.surface[1],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.lg,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
};

const calStyles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  navBtn: { background: 'none', border: 'none', cursor: 'pointer', color: colors.text.sub, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: radius.sm, padding: 0 },
  monthLabel: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text.DEFAULT, fontFamily: typography.fontFamily.sans },
  dayHeaders: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 },
  dayHeader: { textAlign: 'center', fontSize: typography.fontSize.xs, color: colors.text.dim, fontFamily: typography.fontFamily.sans, padding: '4px 0', fontWeight: typography.fontWeight.medium },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 },
  day: {
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.DEFAULT,
    background: 'transparent',
    border: 'none',
    borderRadius: radius.sm,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.1s ease',
  },
  dayStart: { background: colors.primary.DEFAULT, color: colors.text.inverse, fontWeight: typography.fontWeight.semibold, borderRadius: `${radius.sm} 0 0 ${radius.sm}` },
  dayEnd: { background: colors.primary.DEFAULT, color: colors.text.inverse, fontWeight: typography.fontWeight.semibold, borderRadius: `0 ${radius.sm} ${radius.sm} 0` },
  dayInRange: { background: colors.primary.muted, borderRadius: 0 },
};

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { colors } from "../../tokens/colors";
import { typography } from "../../tokens/typography";
import { radius } from "../../tokens/radius";
import { zIndex } from "../../tokens/zIndex";
import { Portal } from "../../utils/portal";
import { BottomSheet } from "../overlay/BottomSheet";
import { useIsMobile } from "../../utils/useIsMobile";

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  style?: React.CSSProperties;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
};

const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "날짜 선택",
  disabled,
  minDate,
  maxDate,
  style,
}: DatePickerProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => value ?? new Date());
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    if (disabled) return;
    if (!isMobile && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6 + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 260),
      });
    }
    setOpen(true);
  };

  const handleSelect = (date: Date) => {
    onChange?.(date);
    setOpen(false);
  };

  const calendar = (
    <CalendarView
      cursor={cursor}
      onCursorChange={setCursor}
      value={value ?? null}
      onSelect={handleSelect}
      minDate={minDate}
      maxDate={maxDate}
    />
  );

  return (
    <div style={{ position: "relative", ...style }}>
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
        <span style={value ? styles.valueText : styles.placeholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        {value && (
          <motion.button
            type="button"
            style={styles.clearBtn}
            whileHover={{ opacity: 0.7 }}
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
          >
            <X size={13} />
          </motion.button>
        )}
      </motion.button>

      {isMobile ? (
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title={placeholder}
        >
          {calendar}
        </BottomSheet>
      ) : (
        <Portal>
          <AnimatePresence>
            {open && (
              <>
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: zIndex.dropdown - 1,
                  }}
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  style={{
                    ...styles.dropdown,
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    zIndex: zIndex.dropdown,
                  }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  {calendar}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Portal>
      )}
    </div>
  );
};

interface CalendarProps {
  cursor: Date;
  onCursorChange: (d: Date) => void;
  value: Date | null;
  onSelect: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const CalendarView = ({
  cursor,
  onCursorChange,
  value,
  onSelect,
  minDate,
  maxDate,
}: CalendarProps) => {
  const [direction, setDirection] = useState(0);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  const changeMonth = (delta: number) => {
    setDirection(delta);
    onCursorChange(new Date(year, month + delta, 1));
  };

  const isDisabled = (d: Date) =>
    (minDate && d < minDate) || (maxDate && d > maxDate) || false;

  return (
    <div style={calStyles.wrapper}>
      <div style={calStyles.header}>
        <motion.button
          type="button"
          style={calStyles.navBtn}
          onClick={() => changeMonth(-1)}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={15} />
        </motion.button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${year}-${month}`}
            style={calStyles.monthLabel}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2 }}
          >
            {year}년 {month + 1}월
          </motion.span>
        </AnimatePresence>
        <motion.button
          type="button"
          style={calStyles.navBtn}
          onClick={() => changeMonth(1)}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={15} />
        </motion.button>
      </div>

      <div style={calStyles.dayHeaders}>
        {DAYS.map((d, i) => (
          <span
            key={d}
            style={{
              ...calStyles.dayHeader,
              ...(i === 0 && { color: colors.danger.DEFAULT }),
              ...(i === 6 && { color: colors.info.DEFAULT }),
            }}
          >
            {d}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${year}-${month}`}
          style={calStyles.grid}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.2 }}
        >
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />;
            const isSelected = value ? isSameDay(date, value) : false;
            const isToday = isSameDay(date, today);
            const disabled = isDisabled(date);
            const isSunday = date.getDay() === 0;
            const isSaturday = date.getDay() === 6;

            return (
              <motion.button
                key={date.toISOString()}
                type="button"
                style={{
                  ...calStyles.day,
                  ...(isSelected && calStyles.daySelected),
                  ...(isToday && !isSelected && calStyles.dayToday),
                  ...(disabled && calStyles.dayDisabled),
                  ...(isSunday &&
                    !isSelected && { color: colors.danger.DEFAULT }),
                  ...(isSaturday &&
                    !isSelected && { color: colors.info.DEFAULT }),
                }}
                whileHover={
                  disabled
                    ? {}
                    : {
                        background: isSelected
                          ? colors.primary.hover
                          : colors.surface[3],
                      }
                }
                whileTap={disabled ? {} : { opacity: 0.7 }}
                onClick={() => !disabled && onSelect(date)}
              >
                {date.getDate()}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div style={calStyles.footer}>
        <motion.button
          type="button"
          style={calStyles.todayBtn}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onCursorChange(new Date());
            onSelect(new Date());
          }}
        >
          오늘
        </motion.button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    minWidth: 180,
    height: 44,
    padding: "0 14px",
    background: colors.surface[2],
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: colors.border.DEFAULT,
    borderRadius: radius.md,
    cursor: "pointer",
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    color: colors.text.dim,
    textAlign: "left",
    transition: "border-color 0.15s ease",
    outline: "none",
  },
  triggerOpen: { borderColor: colors.border.focus },
  triggerDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  valueText: { color: colors.text.DEFAULT, flex: 1 },
  placeholder: { color: colors.text.dim, flex: 1 },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.text.dim,
    padding: 2,
    marginLeft: "auto",
  },
  dropdown: {
    position: "absolute",
    background: colors.surface[1],
    border: `1.5px solid ${colors.border.DEFAULT}`,
    borderRadius: radius.md,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    overflow: "hidden",
    minWidth: 260,
  },
};

const calStyles: Record<string, React.CSSProperties> = {
  wrapper: { padding: "12px 14px" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  navBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.text.sub,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    padding: 0,
  },
  monthLabel: {
    fontSize: "14px",
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  dayHeaders: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: 2,
  },
  dayHeader: {
    textAlign: "center",
    fontSize: "11px",
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
    padding: "4px 0",
    fontWeight: typography.fontWeight.medium,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 0, // 간격 제거
  },
  day: {
    width: "100%",
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontFamily: typography.fontFamily.sans,
    color: colors.text.DEFAULT,
    background: "transparent",
    border: "none",
    borderRadius: radius.sm,
    cursor: "pointer",
    outline: "none",
    transition: "background 0.1s ease",
  },
  daySelected: {
    background: colors.primary.DEFAULT,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
  dayToday: {
    border: `1px solid ${colors.primary.DEFAULT}`,
    color: colors.primary.DEFAULT,
    fontWeight: typography.fontWeight.semibold,
  },
  dayDisabled: {
    opacity: 0.3,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  footer: {
    marginTop: 8,
    display: "flex",
    justifyContent: "center",
    borderTop: `1px solid ${colors.border.sub}`,
    paddingTop: 8,
  },
  todayBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.primary.DEFAULT,
    fontSize: "13px",
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    padding: "4px 12px",
    borderRadius: radius.sm,
  },
};

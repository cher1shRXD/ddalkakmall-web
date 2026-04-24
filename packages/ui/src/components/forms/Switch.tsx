'use client';

import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  style?: React.CSSProperties;
}

const sizeConfig = {
  sm: { track: { width: 34, height: 18 }, thumb: 14, padding: 2 },
  md: { track: { width: 50, height: 28 }, thumb: 24, padding: 2 },
  lg: { track: { width: 66, height: 36 }, thumb: 32, padding: 2 },
};

export const Switch = ({
  checked = false,
  onChange,
  disabled,
  size = 'md',
  label,
  labelPosition = 'right',
  style,
}: SwitchProps) => {
  const cfg = sizeConfig[size];

  const handleToggle = () => {
    if (!disabled) onChange?.(!checked);
  };

  const travel = cfg.track.width / 2 - 2;

  return (
    <label
      onClick={handleToggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
        ...style,
      }}
    >
      <motion.div
        style={{
          width: cfg.track.width,
          height: cfg.track.height,
          borderRadius: 9999,
          background: checked ? colors.primary.DEFAULT : colors.surface[3],
          position: 'relative',
        }}
        animate={{
          background: checked ? colors.primary.DEFAULT : colors.surface[3],
        }}
        transition={{ duration: 0.2 }}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: cfg.thumb,
            height: cfg.thumb,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
          animate={{
            x: checked ? travel - cfg.thumb : -travel,
            y: '-50%',
          }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        />
      </motion.div>

      {label && (
        <span
          style={{
            color: colors.text.DEFAULT,
            fontFamily: typography.fontFamily.sans,
            fontSize:
              typography.fontSize[
                size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'
              ],
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
'use client';

import { motion } from 'framer-motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface CardProps {
  hoverable?: boolean;
  padding?: number | string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Card = ({ hoverable, padding = 20, header, footer, children, style, onClick }: CardProps) => {
  if (hoverable) {
    return (
      <motion.div
        style={{ ...styles.card, ...style }}
        whileHover={{ background: colors.surface[2] }}
        transition={{ duration: 0.15 }}
        onClick={onClick}
      >
        {header && <div style={styles.header}>{header}</div>}
        <div style={{ ...styles.body, padding }}>{children}</div>
        {footer && <div style={styles.footer}>{footer}</div>}
      </motion.div>
    );
  }

  return (
    <div style={{ ...styles.card, ...style }} onClick={onClick}>
      {header && <div style={styles.header}>{header}</div>}
      <div style={{ ...styles.body, padding }}>{children}</div>
      {footer && <div style={styles.footer}>{footer}</div>}
    </div>
  );
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export const CardHeader = ({ title, subtitle, action, style }: CardHeaderProps) => {
  return (
    <div style={{ ...styles.header, ...style }}>
      <div style={styles.headerContent}>
        {title && <span style={styles.cardTitle}>{title}</span>}
        {subtitle && <span style={styles.cardSubtitle}>{subtitle}</span>}
      </div>
      {action && <div style={styles.headerAction}>{action}</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: colors.surface[1],
    border: `1px solid ${colors.border.sub}`,
    borderRadius: radius.xl,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '14px 20px',
    borderBottom: `1px solid ${colors.border.sub}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexShrink: 0,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  cardSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
  },
  headerAction: { flexShrink: 0 },
  body: { flex: 1 },
  footer: {
    padding: '12px 20px',
    borderTop: `1px solid ${colors.border.sub}`,
    flexShrink: 0,
    background: colors.surface[2],
  },
};

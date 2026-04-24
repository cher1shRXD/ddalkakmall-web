'use client';

import { ChevronRight } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Breadcrumb = ({ items, separator, style }: BreadcrumbProps) => {
  const sep = separator ?? <DefaultSep />;

  return (
    <nav aria-label="breadcrumb" style={{ ...styles.nav, ...style }}>
      <ol style={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} style={styles.item}>
              {isLast ? (
                <span style={styles.current} aria-current="page">{item.label}</span>
              ) : (
                <>
                  {item.href ? (
                    <a href={item.href} style={styles.link}>{item.label}</a>
                  ) : (
                    <button type="button" style={styles.linkBtn} onClick={item.onClick}>{item.label}</button>
                  )}
                  <span style={styles.sep} aria-hidden="true">{sep}</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const DefaultSep = () => <ChevronRight size={13} />;

const styles: Record<string, React.CSSProperties> = {
  nav: {},
  list: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    fontSize: typography.fontSize.sm,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    textDecoration: 'none',
    transition: 'color 0.15s ease',
  },
  linkBtn: {
    fontSize: typography.fontSize.sm,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'color 0.15s ease',
  },
  current: {
    fontSize: typography.fontSize.sm,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
  },
  sep: {
    color: colors.text.dim,
    display: 'flex',
    alignItems: 'center',
  },
};

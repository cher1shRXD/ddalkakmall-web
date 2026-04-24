let counter = 0;

export const uniqueId = (prefix = 'id'): string => {
  return `${prefix}-${++counter}`;
}

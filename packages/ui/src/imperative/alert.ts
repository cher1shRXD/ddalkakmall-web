import { dialogStore, type DialogVariant } from '../store/dialog';

interface AlertOptions {
  title?: string;
  variant?: DialogVariant;
  confirmLabel?: string;
}

export const alert = (message: string, options?: AlertOptions): Promise<void> => {
  return new Promise((resolve) => {
    dialogStore.open({
      type: 'alert',
      message,
      title: options?.title,
      variant: options?.variant ?? 'info',
      confirmLabel: options?.confirmLabel ?? '확인',
      resolve: () => resolve(),
    });
  });
}

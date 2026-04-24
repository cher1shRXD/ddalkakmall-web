import { dialogStore, type DialogVariant } from '../store/dialog';

interface ConfirmOptions {
  title?: string;
  variant?: DialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const confirm = (message: string, options?: ConfirmOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    dialogStore.open({
      type: 'confirm',
      message,
      title: options?.title,
      variant: options?.variant ?? 'info',
      confirmLabel: options?.confirmLabel ?? '확인',
      cancelLabel: options?.cancelLabel ?? '취소',
      resolve,
    });
  });
}

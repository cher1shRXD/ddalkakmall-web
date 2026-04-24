import { toastStore, type ToastType } from '../store/toast';

interface ToastOptions {
  duration?: number;
}

const add = (type: ToastType, message: string, options?: ToastOptions): string => {
  return toastStore.add({ type, message, duration: options?.duration ?? 3000 });
}

export const toast = {
  success: (message: string, options?: ToastOptions) => add('success', message, options),
  error: (message: string, options?: ToastOptions) => add('error', message, options),
  info: (message: string, options?: ToastOptions) => add('info', message, options),
  warning: (message: string, options?: ToastOptions) => add('warning', message, options),
  dismiss: (id?: string) => (id ? toastStore.remove(id) : toastStore.clear()),
};

import { uniqueId } from '../utils/uniqueId';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

type Subscriber = () => void;

let toasts: ToastData[] = [];
const subscribers = new Set<Subscriber>();

const notify = () => subscribers.forEach((s) => s());

export const toastStore = {
  getToasts: () => toasts,

  add(item: Omit<ToastData, 'id'>): string {
    const id = uniqueId('toast');
    toasts = [...toasts, { id, ...item }];
    notify();
    return id;
  },

  remove(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },

  clear() {
    toasts = [];
    notify();
  },

  subscribe(fn: Subscriber): () => void {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
};

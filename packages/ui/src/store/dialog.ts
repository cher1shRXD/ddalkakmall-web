import { uniqueId } from '../utils/uniqueId';

export type DialogVariant = 'info' | 'success' | 'warning' | 'danger';

export interface DialogConfig {
  id: string;
  type: 'alert' | 'confirm';
  message: string;
  title?: string;
  variant?: DialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  resolve: (value: boolean) => void;
}

type Subscriber = () => void;

let dialog: DialogConfig | null = null;
const subscribers = new Set<Subscriber>();

const notify = () => subscribers.forEach((s) => s());

export const dialogStore = {
  getDialog: () => dialog,

  open(config: Omit<DialogConfig, 'id'>): void {
    const id = uniqueId('dialog');
    dialog = { id, ...config };
    notify();
  },

  resolve(value: boolean) {
    dialog?.resolve(value);
    dialog = null;
    notify();
  },

  subscribe(fn: Subscriber): () => void {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
};

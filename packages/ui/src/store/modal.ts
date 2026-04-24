import type { ReactNode } from 'react';
import { uniqueId } from '../utils/uniqueId';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalConfig {
  id: string;
  content: ReactNode;
  title?: string;
  size?: ModalSize;
  closable?: boolean;
  onClose?: () => void;
}

type Subscriber = () => void;

let modals: ModalConfig[] = [];
const subscribers = new Set<Subscriber>();

const notify = () => subscribers.forEach((s) => s());

export const modalStore = {
  getModals: () => modals,

  open(config: Omit<ModalConfig, 'id'>): string {
    const id = uniqueId('modal');
    modals = [...modals, { id, closable: true, size: 'md', ...config }];
    notify();
    return id;
  },

  close(id: string) {
    const modal = modals.find((m) => m.id === id);
    modal?.onClose?.();
    modals = modals.filter((m) => m.id !== id);
    notify();
  },

  closeAll() {
    modals.forEach((m) => m.onClose?.());
    modals = [];
    notify();
  },

  subscribe(fn: Subscriber): () => void {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
};

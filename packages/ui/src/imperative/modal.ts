import type { ReactNode } from 'react';
import { modalStore, type ModalSize } from '../store/modal';

interface ModalOptions {
  title?: string;
  size?: ModalSize;
  closable?: boolean;
  onClose?: () => void;
}

export const modal = {
  open(content: ReactNode, options?: ModalOptions): string {
    return modalStore.open({ content, ...options });
  },
  close(id: string) {
    modalStore.close(id);
  },
  closeAll() {
    modalStore.closeAll();
  },
};

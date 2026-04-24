'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from '../utils/portal';
import { toastStore, type ToastData as ToastItemType } from '../store/toast';
import { modalStore, type ModalConfig } from '../store/modal';
import { dialogStore, type DialogConfig } from '../store/dialog';
import { zIndex } from '../tokens/zIndex';
import { ToastItem } from '../components/feedback/Toast';
import { ModalItem } from '../components/overlay/Modal';
import { AlertDialogItem } from '../components/overlay/AlertDialog';
import { ConfirmDialogItem } from '../components/overlay/ConfirmDialog';

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastLayer />
      <ModalLayer />
      <DialogLayer />
    </>
  );
}

const ToastLayer = () => {
  const [toasts, setToasts] = useState<ToastItemType[]>(() => toastStore.getToasts());

  useEffect(() => toastStore.subscribe(() => setToasts([...toastStore.getToasts()])), []);

  return (
    <Portal>
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 8,
        zIndex: zIndex.toast,
        pointerEvents: 'none',
      }}>
        <AnimatePresence>
          {toasts.map((t) => (
            <div key={t.id} style={{ pointerEvents: 'all' }}>
              <ToastItem {...t} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </Portal>
  );
}

const ModalLayer = () => {
  const [modals, setModals] = useState<ModalConfig[]>(() => modalStore.getModals());

  useEffect(() => modalStore.subscribe(() => setModals([...modalStore.getModals()])), []);

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modals.length]);

  return (
    <Portal>
      <AnimatePresence>
        {modals.map((m, i) => (
          <ModalItem key={m.id} {...m} stackIndex={i} />
        ))}
      </AnimatePresence>
    </Portal>
  );
}

const DialogLayer = () => {
  const [dialog, setDialog] = useState<DialogConfig | null>(() => dialogStore.getDialog());

  useEffect(() => dialogStore.subscribe(() => setDialog(dialogStore.getDialog())), []);

  return (
    <Portal>
      <AnimatePresence>
        {dialog && (
          dialog.type === 'alert' ? (
            <AlertDialogItem key={dialog.id} {...dialog} />
          ) : (
            <ConfirmDialogItem key={dialog.id} {...dialog} />
          )
        )}
      </AnimatePresence>
    </Portal>
  );
}

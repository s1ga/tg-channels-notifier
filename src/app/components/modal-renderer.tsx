'use client';

import { CurrentModal } from '@/app/interfaces/current-modal';
import ModalService from '@/app/services/modal.service';
import { Suspense, useEffect, useState } from 'react';

export default function ModalRenderer() {
  const [modal, setModal] = useState<CurrentModal | null>(null);

  useEffect(() => {
    const unsub = ModalService.subscribe(setModal);

    return () => {
      unsub();
    };
  }, []);

  if (modal) {
    const Modal = ModalService.get(modal.name);
    return <Suspense><Modal {...modal?.props} /></Suspense>;
  }

  return null;
}

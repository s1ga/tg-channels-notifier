import Modals from '@/app/enums/modals';
import ModalService from '@/app/services/modal.service';

export default function useModal<P = any>(name: Modals) {
  return {
    open: (props: P) => {
      ModalService.set({ name, props });
    },
    close: () => {
      ModalService.set(null);
    },
  };
}

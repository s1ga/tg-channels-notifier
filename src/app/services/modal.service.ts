import MODALS from '@/app/constants/modals';
import Modals from '@/app/enums/modals';
import { CurrentModal, Handler } from '@/app/interfaces/current-modal';

export default class ModalService {
  private static subs = new Set<Handler>();
  private static modal: CurrentModal<unknown> | null = null;

  public static subscribe(handler: Handler): () => void {
    if (typeof handler === 'function') this.subs.add(handler);

    return () => {
      this.subs.delete(handler);
    };
  }

  public static set(currentModal: CurrentModal<unknown> | null): void {
    this.modal = currentModal;
    this.subs.forEach((handler: Handler) => handler(this.modal));
  }

  public static get(modal: Modals) {
    return MODALS[modal] ?? null;
  }
}

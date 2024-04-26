import Modals from '@/app/enums/modals';

export interface CurrentModal<P = any> {
  name: Modals;
  props: P;
}

// eslint-disable-next-line no-unused-vars
export type Handler = (modal: CurrentModal<unknown> | null) => void;

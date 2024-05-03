import Modals from '@/app/enums/modals';
import useModal from '@/app/hooks/modal';
import { OverviewModalProps } from '@/app/interfaces/overview-modal-props';

export default function useOverviewModal() {
  const overviewModal = useModal<OverviewModalProps>(Modals.Overview);

  return () => overviewModal.open({ onClose: overviewModal.close });
}

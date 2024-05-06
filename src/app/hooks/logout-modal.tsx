import Modals from '@/app/enums/modals';
import useModal from '@/app/hooks/modal';
import { LogoutModalProps } from '@/app/interfaces/logout-modal-props';

export default function useLogoutModal(toForceDelete: boolean = false) {
  const logoutModal = useModal<LogoutModalProps>(Modals.Logout);

  return () => logoutModal.open({ onClose: logoutModal.close, toForceDelete });
}

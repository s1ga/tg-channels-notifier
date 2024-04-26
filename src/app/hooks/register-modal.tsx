import Modals from '@/app/enums/modals';
import useModal from '@/app/hooks/modal';
import { RegisterModalProps } from '@/app/interfaces/register-modal-props';

export default function useRegisterModal() {
  const registerModal = useModal<RegisterModalProps>(Modals.Register);

  return () => registerModal.open({ onClose: registerModal.close });
}

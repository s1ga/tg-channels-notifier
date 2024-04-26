import { RegisterModalProps } from '@/app/interfaces/register-modal-props';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';

export default function RegisterModal({ onClose }: RegisterModalProps) {
  return (
    <Dialog
      fullWidth
      open={true}
      onClose={onClose}
    >
      <DialogContent>
        <DialogContentText>Hello!</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

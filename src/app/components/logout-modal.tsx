import { LogoutModalProps } from '@/app/interfaces/logout-modal-props';
import { resetClient } from '@/store/features/client/client-slice';
import { useAppDispatch } from '@/store/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export default function LogoutModal({ onClose, toForceDelete = false }: LogoutModalProps) {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(resetClient(toForceDelete));
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      onClose={onClose}
    >
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {toForceDelete && <>Be aware of that force logout will clear session from both
          browser and Telegram. That means that all your handlers will be stopped and
          running services would not be working.</>}
          {!toForceDelete && <>Be aware of that logout action just clears your session data in browser.
          All handlers and connections are still running and you can destroy them
          in Telegram application in devices tab.</>}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button size="medium" onClick={onClose}>Close</Button>
        <Button size="medium" onClick={logout}>Logout</Button>
      </DialogActions>
    </Dialog>
  );
}

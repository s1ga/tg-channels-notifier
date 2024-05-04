import { TextField } from '@mui/material';

export default function OverviewStep1Modal() {
  return (
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="name"
      label="Bot name"
      type="text"
      fullWidth
      variant="standard"
    />
  );
}

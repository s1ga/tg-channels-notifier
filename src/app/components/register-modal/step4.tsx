import { TextField } from '@mui/material';

export default function RegisterStep4Modal() {
  return <TextField
    autoFocus
    required
    margin="dense"
    id="code"
    name="code"
    label="Code"
    type="text"
    fullWidth
    variant="standard"
  />;
}

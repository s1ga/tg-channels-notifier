import { TextField, Typography } from '@mui/material';

export default function RegisterStep2Modal() {
  return (
    <>
      <Typography variant="body1" marginBottom={1}>
        Fill your API ID and hash to proceed with your Telegram connection
      </Typography>
      <TextField
        autoFocus
        required
        margin="dense"
        id="id"
        name="id"
        label="API Id"
        type="password"
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        id="hash"
        name="hash"
        label="API hash"
        type="password"
        fullWidth
        variant="standard"
      />
    </>
  );
}

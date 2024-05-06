import { List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

export default function RegisterStep3Modal() {
  return (
    <>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper', listStyle: 'decimal', paddingTop: 0 }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Note: Be precise with the entered data because any incorrect flood may block
          the ability to connect your account!
        </Typography>
        <Typography variant="body1">
          You need to fill your Telegram phone number and 2FA password.
        </Typography>
        <ListItem
          key="telegram-number"
          sx={{ display: 'list-item', padding: 0, paddingTop: 0.5, marginLeft: 2 }}
        >
          <ListItemText primary="Enter your number in international format" />
        </ListItem>
        <ListItem
          key="telegram-password"
          sx={{ display: 'list-item', padding: 0, paddingTop: 0.5, marginLeft: 2 }}
        >
          <ListItemText primary={`
            Enter your 2FA password. If you don't have one, just left the input empty.
            Please keep in mind, that in case of having password and skipping to enter it,
            you will not be able to sign in.`
          } />
        </ListItem>
      </List>

      <TextField
        autoFocus
        required
        margin="dense"
        id="phone"
        name="phone"
        label="Phone number"
        type="tel"
        fullWidth
        variant="standard"
        placeholder="+12223334455"
      />
      <TextField
        margin="dense"
        id="password"
        name="password"
        label="2FA password"
        type="password"
        fullWidth
        variant="standard"
      />
    </>
  );
}

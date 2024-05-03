import { Link, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function RegisterStep1Modal() {
  const list = [
    {
      id: 0,
      description: <>
        Login into your&nbsp;
         <Link target="_blank" rel="noopener noreferrer" href="https://my.telegram.org" underline="always">
           Telegram account
         </Link>
      </>,
    },
    {
      id: 1,
      description: <>Click &quot;API development tools&quot;</>,
    },
    {
      id: 2,
      description: <>If you already have a created application, you can click &quot;Next&quot; on modal</>,
    },
    {
      id: 3,
      description: <>
        Otherwise, fill your application details (only app title and short name required)&nbsp;
        and click &quot;Create application&quot;
      </>,
    },
  ];

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper', listStyle: 'decimal', paddingTop: 0 }}
    >
      <Typography variant="body1">You need to obtain an API ID and hash:</Typography>
      {list.map((item) => (
        <ListItem key={item.id} sx={{ display: 'list-item', padding: 0, paddingTop: 0.5, marginLeft: 2 }}>
          <ListItemText primary={item.description} />
        </ListItem>
      ))}
    </List>
  );
}

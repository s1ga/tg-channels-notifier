import { Avatar as MuiAvatar, ListItemAvatar } from '@mui/material';
import { memo } from 'react';

function AvatarMemo({ url = '', alt }: { url?: string, alt?: string }) {
  return (
    <ListItemAvatar>
      <MuiAvatar
        alt={`Avatar${alt ? ` of ${alt}` : ''}`}
        src={url}
      />
    </ListItemAvatar>
  );
}

const Avatar = memo(AvatarMemo);
export default Avatar;

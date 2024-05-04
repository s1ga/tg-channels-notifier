import {
  Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { ChannelsItemProps } from '@/app/interfaces/channels-props';
import { memo } from 'react';
import { areEqual } from 'react-window';
import { Api } from 'telegram';
import Avatar from '@/app/components/avatar';

function ChannelsItemMemo({ data, index, style }: ChannelsItemProps) {
  const { channels, selected, images, onSelect } = data;
  const currentChannel = channels[index].entity as Api.Channel;
  const photoUrl = images[currentChannel.id.toString()] || '';

  return (
    <ListItem disablePadding style={style}>
      <ListItemButton role={undefined} dense onClick={() => onSelect(currentChannel.id)}>
        <Avatar url={photoUrl} alt={currentChannel.username} />
        <ListItemText primary={<h3>{currentChannel.title}</h3>} />
        <ListItemIcon>
          <Checkbox
            edge="end"
            tabIndex={-1}
            disableRipple
            checked={selected.has(currentChannel.id)}
          />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}

const ChannelsItem = memo(ChannelsItemMemo, areEqual);
export default ChannelsItem;

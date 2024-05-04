import ChannelsItem from '@/app/components/channels-item';
import { ChannelsProps } from '@/app/interfaces/channels-props';
import { FixedSizeList } from 'react-window';

export default function Channels({ channels, selected, images, onSelect, isSmall = false }: ChannelsProps) {
  return (
    <FixedSizeList
      itemCount={channels.length}
      itemData={{ channels, selected, images, onSelect }}
      width="100%"
      height={isSmall ? 220 : 440}
      itemSize={isSmall ? 70 : 80}
    >
      {ChannelsItem}
    </FixedSizeList>
  );
}

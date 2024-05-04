/* eslint-disable no-unused-vars */
import { CSSProperties } from 'react';
import { Api } from 'telegram/tl/api';
import { Dialog } from 'telegram/tl/custom/dialog';

export interface ChannelsProps {
  channels: Dialog[];
  selected: Set<Api.long>;
  images: Record<string, string>;
  onSelect: (index: Api.long) => void;
  isSmall?: boolean;
}

export interface ChannelsItemProps {
  data: {
    channels: ChannelsProps['channels'];
    selected: ChannelsProps['selected'];
    images: ChannelsProps['images'];
    onSelect: ChannelsProps['onSelect'];
  };
  index: number;
  style: CSSProperties;
}

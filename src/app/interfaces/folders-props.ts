/* eslint-disable no-unused-vars */
import { Api } from 'telegram';
import { Dialog } from 'telegram/tl/custom/dialog';

export interface FoldersProps {
  folders: Api.DialogFilter[];
  foldersChannels: Record<number, Dialog[]>;
  images: Record<string, string>;
  selected: Set<Api.long>;
  onSelect: (index: Api.long) => void;
}

export interface FoldersItemProps {
  name: string;
  channels: Dialog[];
  images: FoldersProps['images'];
  selected: FoldersProps['selected'];
  onSelect: FoldersProps['onSelect'];
}

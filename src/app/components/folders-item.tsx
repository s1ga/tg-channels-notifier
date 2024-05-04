import Channels from '@/app/components/channels';
import CollapsiblePlate from '@/app/components/collapsible-plate';
import { FoldersItemProps } from '@/app/interfaces/folders-props';
import { Folder } from '@mui/icons-material';

export default function FoldersItem({ name, channels, images, selected, onSelect }: FoldersItemProps) {
  if (!channels.length) return null;

  return (
    <CollapsiblePlate title={name} Icon={<Folder />}>
      <Channels
        channels={channels}
        isSmall={true}
        images={images}
        selected={selected}
        onSelect={onSelect}
      />
    </CollapsiblePlate>
  );
}

import FoldersItem from '@/app/components/folders-item';
import { FoldersProps } from '@/app/interfaces/folders-props';
import { List } from '@mui/material';
import { Api } from 'telegram';

export default function Folders({ folders, foldersChannels, images, selected, onSelect }: FoldersProps) {
  return (
    <List sx={{ width: '100%' }}>
      {folders.map((f: Api.DialogFilter) => (
        <FoldersItem
          key={f.id}
          name={f.title}
          channels={foldersChannels[f.id]}
          images={images}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </List>
  );
}

import Channels from '@/app/components/channels';
import Folders from '@/app/components/folders';
import Tabs from '@/app/components/tabs';
import { Tab } from '@/app/interfaces/tab';
import {
  getChannels, selectChannelsState, selectFoldersChannels, toggleSelected,
} from '@/store/features/channels/channels-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect } from 'react';
import { Api } from 'telegram';

export default function OverviewStep2Modal() {
  const dispatch = useAppDispatch();
  const { channels, selected, folders, images } = useAppSelector(selectChannelsState);
  const foldersChannels = useAppSelector(selectFoldersChannels);
  const onSelect = useCallback((index: Api.long) => {
    dispatch(toggleSelected(index));
  }, [dispatch]);

  const tabs: Tab[] = (() => {
    const tabs: Tab[] = [
      {
        id: 0,
        name: 'Channels list',
        content: <Channels
          channels={channels}
          selected={selected}
          images={images}
          onSelect={onSelect}
        />,
      },
    ];

    if (folders?.length) {
      tabs.push({
        id: 1,
        name: 'Folders',
        content: <Folders
          folders={folders}
          foldersChannels={foldersChannels}
          selected={selected}
          images={images}
          onSelect={onSelect}
        />,
      });
    }

    return tabs;
  })();

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  return <Tabs tabList={tabs} />;
}

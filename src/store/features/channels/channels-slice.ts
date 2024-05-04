import createAppSlice from '@/store/create-app-slice';
import { ClientSliceState, setError, setLoading } from '@/store/features/client/client-slice';
import { buildBase64WithType } from '@/store/utils';
import { createListenerMiddleware, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { Api } from 'telegram';
import { Dialog } from 'telegram/tl/custom/dialog';
import { strippedPhotoToJpg } from 'telegram/Utils';

export interface ChannelsSliceState {
  channels: Dialog[];
  folders: Api.DialogFilter[];
  images: Record<string, string>;
  selected: Set<Api.long>;
  isLoading: boolean;
}

interface GetChannelsPayload {
  channels: ChannelsSliceState['channels'];
  folders: ChannelsSliceState['folders'];
  images: ChannelsSliceState['images'];
}

const foldersSelector = (state: ChannelsSliceState) => state.folders;
const channelsSelector = (state: ChannelsSliceState) => state.channels;
const selectedSelector = (state: ChannelsSliceState) => state.selected;
const imagesSelector = (state: ChannelsSliceState) => state.images;

const initialState: ChannelsSliceState = {
  channels: [],
  folders: [],
  images: {},
  selected: new Set<Api.long>(),
  isLoading: false,
};

export const channelsSlice = createAppSlice({
  name: 'channels',
  initialState,
  reducers: (create) => ({
    getChannels: create.reducer((state) => ({
      ...state,
      isLoading: true,
    })),
    setChannels: create.reducer((state, action: PayloadAction<GetChannelsPayload>) => ({
      ...state,
      channels: action.payload.channels,
      folders: action.payload.folders,
      images: action.payload.images,
    })),
    toggleSelected: create.reducer((state, action: PayloadAction<Api.long>) => {
      if (state.selected.has(action.payload)) {
        state.selected.delete(action.payload);
      } else {
        state.selected.add(action.payload);
      }
    }),
    resetChannels: create.reducer(() => initialState),
  }),
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectImages: imagesSelector,
    selectSelected: selectedSelector,
    selectChannels: channelsSelector,
    selectFolders: foldersSelector,
    selectChannelsState: createSelector(
      [selectedSelector, channelsSelector, foldersSelector, imagesSelector],
      (selected, channels, folders, images) => ({ selected, channels, folders, images }),
    ),
    selectFoldersChannels: createSelector(
      [foldersSelector, channelsSelector],
      (folders: ChannelsSliceState['folders'], channels: ChannelsSliceState['channels']) => folders.reduce(
        (acc: Record<number, Dialog[]>, curr: Api.DialogFilter) => {
          const fChannels = (curr.includePeers as Api.InputPeerChannel[])
            .filter((p: Api.InputPeerChannel) => !!p.channelId)
            .map((p: Api.InputPeerChannel) => channels.find(
              (c: Dialog) => c.entity?.id.equals(p.channelId),
            )!)
            .filter(Boolean);
          return {
            ...acc,
            [curr.id]: fChannels,
          };
        },
        {},
      ),
    ),
    selectSelectedChannels: createSelector(
      [selectedSelector, channelsSelector],
      (selected: ChannelsSliceState['selected'], channels: ChannelsSliceState['channels']) => Array
        .from(selected)
        .map((id: Api.long) => channels.find((c: Dialog) => c.entity?.id.equals(id)))
        .filter(Boolean) as Dialog[],
    ),
  },
});

export const {
  getChannels, setChannels, toggleSelected,
  resetChannels,
} = channelsSlice.actions;
export const {
  selectChannels, selectFolders, selectFoldersChannels,
  selectIsLoading, selectSelected, selectSelectedChannels,
  selectImages, selectChannelsState,
} = channelsSlice.selectors;

export const channelsListenerMiddleware = createListenerMiddleware();
channelsListenerMiddleware.startListening({
  actionCreator: getChannels,
  effect: async (_, listenerApi) => {
    try {
      listenerApi.dispatch(setLoading(true));

      const { client } = (listenerApi.getState() as any).client as ClientSliceState;
      const [dialogs, foldersList] = await Promise.all([
        client.getDialogs({}),
        client.invoke(new Api.messages.GetDialogFilters()),
      ]);

      const channels = dialogs.filter((d: Dialog) => d.isChannel && !d.isGroup);

      const photoBuffers = await Promise.all(channels.map((c: Dialog) => {
        const buffer = ((c.entity as Api.Channel)?.photo as Api.ChatPhoto)?.strippedThumb;
        // @ts-ignore
        return Promise.resolve(buffer ? strippedPhotoToJpg(buffer) : undefined);
      }));
      const urls = await Promise.all(photoBuffers.map(
        (p) => (p ? buildBase64WithType(JSON.stringify(p)) : Promise.resolve(undefined)),
      ));
      const images = channels.reduce(
        (acc: ChannelsSliceState['images'], curr: Dialog, idx: number) => {
          const url = urls[idx];
          if (!url || !curr.entity?.id) return acc;
          return {
            ...acc,
            [curr.entity.id.toString()]: url,
          };
        },
        {},
      );

      const folders = foldersList.filters
        .filter((f: Api.TypeDialogFilter) => f.className !== 'DialogFilterDefault') as Api.DialogFilter[];

      listenerApi.dispatch(setChannels({ channels, folders, images }));
    } catch (err: any) {
      listenerApi.dispatch(setError(err?.message));
    } finally {
      listenerApi.dispatch(setLoading(false));
    }
  },
});

import { channelsListenerMiddleware, channelsSlice } from '@/store/features/channels/channels-slice';
import { clientSlice, listenerMiddleware } from '@/store/features/client/client-slice';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const rootReducer = combineSlices(clientSlice, channelsSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
    .prepend(listenerMiddleware.middleware)
    .prepend(channelsListenerMiddleware.middleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

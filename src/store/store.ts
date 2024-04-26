import { clientSlice } from '@/store/features/client/client-slice';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(clientSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

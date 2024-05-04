import storageKeys from '@/app/constants/storage-keys';
import LocalStorageService from '@/app/services/storage.service';
import createAppSlice from '@/store/create-app-slice';
import {
  createListenerMiddleware, isAnyOf, ListenerEffectAPI, PayloadAction, ThunkDispatch, UnknownAction,
} from '@reduxjs/toolkit';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export interface ClientSliceState {
  client: TelegramClient;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

interface ApiPayload {
  id: number;
  hash: string;
}

const getClient = () => new TelegramClient(
  new StringSession(LocalStorageService.get<string>(storageKeys.SessionId) || ''),
  parseInt(LocalStorageService.get<string>(storageKeys.ApiId) || '0', 10) || 10000000,
  LocalStorageService.get<string>(storageKeys.ApiHash) || '111eb4dc492d4ae475d575c00bf0aa11',
  {},
);

const initialState: ClientSliceState = {
  client: getClient(),
  isAuth: false,
  isLoading: false,
  error: '',
};

export const clientSlice = createAppSlice({
  name: 'client',
  initialState,
  reducers: (create) => ({
    init: create.reducer((state) => ({ ...state })),
    updateApi: create.reducer((state, action: PayloadAction<ApiPayload>) => ({
      ...state,
      client: new TelegramClient(
        new StringSession(''),
        action.payload.id,
        action.payload.hash,
        { connectionRetries: 3 },
      ),
    })),
    updateSession: create.reducer((state, action: PayloadAction<string>) => ({
      ...state,
      client: new TelegramClient(
        new StringSession(action.payload),
        state.client.apiId,
        state.client.apiHash,
        { connectionRetries: 3 },
      ),
    })),
    updateClient: create.reducer((state, action: PayloadAction<TelegramClient>) => {
      action.payload.session.save();
      return {
        ...state,
        client: action.payload,
      };
    }),
    resetClient: create.reducer((state) => ({
      ...state,
      client: getClient(),
    })),
    setIsAuth: create.reducer((state, action: PayloadAction<boolean>) => ({
      ...state,
      isAuth: action.payload,
    })),
    setError: create.reducer((state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    })),
    clearError: create.reducer((state) => ({
      ...state,
      error: '',
    })),
    setLoading: create.reducer((state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    })),
  }),
  selectors: {
    selectClient: (client) => client.client,
    selectIsAuth: (client) => client.isAuth,
    selectIsLoading: (client) => client.isLoading,
    selectError: (client) => client.error,
  },
});

export const {
  init, updateApi, updateSession, updateClient,
  setError, clearError, setLoading, setIsAuth,
  resetClient,
} = clientSlice.actions;
export const {
  selectClient, selectError, selectIsLoading,
  selectIsAuth,
} = clientSlice.selectors;

export const listenerMiddleware = createListenerMiddleware();

const clientConnect = async (
  _: unknown,
  listenerApi: ListenerEffectAPI<unknown, ThunkDispatch<unknown, unknown, UnknownAction>, unknown>,
) => {
  try {
    const state = listenerApi.getState() as any;
    const tgClient = (state.client as ClientSliceState).client;
    listenerApi.dispatch(setLoading(true));

    await tgClient.connect();
    const isAuth = await tgClient.isUserAuthorized();

    listenerApi.dispatch(setIsAuth(isAuth));
  } catch (err: any) {
    listenerApi.dispatch(setError(err?.message));
  } finally {
    listenerApi.dispatch(setLoading(false));
  }
};
const clientDisconnect = async (
  _: unknown,
  listenerApi: ListenerEffectAPI<unknown, ThunkDispatch<unknown, unknown, UnknownAction>, unknown>,
) => {
  const originalState = listenerApi.getOriginalState() as any;
  await (originalState.client as ClientSliceState).client.disconnect();
};
listenerMiddleware.startListening({
  matcher: isAnyOf(updateApi, updateClient),
  effect: async (action, listenerApi) => {
    const { id, hash } = action.payload as ApiPayload;
    LocalStorageService.set<string>(storageKeys.ApiHash, hash);
    LocalStorageService.set<number>(storageKeys.ApiId, id);
    await clientDisconnect(action, listenerApi);
    await clientConnect(action, listenerApi);
  },
});
listenerMiddleware.startListening({
  actionCreator: updateSession,
  effect: async (action, listenerApi) => {
    LocalStorageService.set<string>(storageKeys.SessionId, action.payload as string);
    await clientDisconnect(action, listenerApi);
    await clientConnect(action, listenerApi);
  },
});
listenerMiddleware.startListening({
  actionCreator: resetClient,
  effect: async (action, listenerApi) => {
    LocalStorageService.delete(storageKeys.ApiHash);
    LocalStorageService.delete(storageKeys.ApiId);
    LocalStorageService.delete(storageKeys.SessionId);
    await clientDisconnect(action, listenerApi);
    await clientConnect(action, listenerApi);
  },
});
listenerMiddleware.startListening({
  actionCreator: init,
  effect: clientConnect,
});

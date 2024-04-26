import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export interface ClientSliceState {
  client: TelegramClient;
}

interface ApiPayload {
  id: number;
  hash: string;
}

const initialState: ClientSliceState = {
  client: new TelegramClient(
    new StringSession(''),
    10000000,
    '111eb4dc492d4ae475d575c00bf0aa11',
    {},
  ),
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: (create) => ({
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
    update: create.reducer((state, action: PayloadAction<TelegramClient>) => ({
      ...state,
      client: action.payload,
    })),
  }),
  selectors: {
    selectClient: (client) => client.client,
  },
});

export const { updateApi, updateSession, update } = clientSlice.actions;
export const { selectClient } = clientSlice.selectors;

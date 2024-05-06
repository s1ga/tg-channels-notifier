import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export const initialApiId = 10000000;
export const initialApiHash = '111eb4dc492d4ae475d575c00bf0aa11';
export const initialTelegramClient = new TelegramClient(
  new StringSession(''),
  initialApiId,
  initialApiHash,
  {},
);

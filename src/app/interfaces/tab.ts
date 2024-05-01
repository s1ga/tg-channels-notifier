import { ReactElement } from 'react';

export interface Tab {
  id: number;
  name: string;
  content: ReactElement;
}

'use client';

import useRegisterModal from '@/app/hooks/register-modal';
import { selectClient } from '@/store/features/client/client-slice';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';

export default function Home() {
  const displayRegisterModal = useRegisterModal();
  const client = useAppSelector(selectClient);

  console.log(client);

  return (
    <main>
      <Button onClick={displayRegisterModal} variant="outlined">
        Connect your Telegram
      </Button>
    </main>
  );
}

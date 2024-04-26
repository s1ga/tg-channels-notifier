'use client';

import useRegisterModal from '@/app/hooks/register-modal';
import { Button } from '@mui/material';

export default function Home() {
  const displayRegisterModal = useRegisterModal();

  return (
    <main>
      <Button onClick={displayRegisterModal} variant="outlined">
        Connect your Telegram
      </Button>
    </main>
  );
}

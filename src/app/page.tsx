'use client';

import useLogoutModal from '@/app/hooks/logout-modal';
import useOverviewModal from '@/app/hooks/overview-modal';
import useRegisterModal from '@/app/hooks/register-modal';
import { init, selectIsAuth } from '@/store/features/client/client-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  const displayRegisterModal = useRegisterModal();
  const displayOverviewModal = useOverviewModal();
  const displayLogoutModal = useLogoutModal();
  const displayForceLogoutModal = useLogoutModal(true);

  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <main>
      {isAuth
        && <>
          <Button onClick={displayOverviewModal} variant="outlined">Create notifier</Button>
          <Button onClick={displayLogoutModal} variant="outlined">Logout</Button>
          <Button onClick={displayForceLogoutModal} variant="outlined">Force logout</Button>
        </>
      }
      {!isAuth
       && <Button onClick={displayRegisterModal} variant="outlined">
        Connect your Telegram
      </Button>
      }
    </main>
  );
}

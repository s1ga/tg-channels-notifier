import { lazy } from 'react';
import Modals from '@/app/enums/modals';

const MODALS = {
  [Modals.Register]: lazy(() => import('@/app/components/register-modal/index')),
  [Modals.Overview]: lazy(() => import('@/app/components/overview-modal/index')),
};

export default MODALS;

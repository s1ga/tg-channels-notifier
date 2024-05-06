import dynamic from 'next/dynamic';
import Modals from '@/app/enums/modals';

const MODALS = {
  [Modals.Register]: dynamic(() => import('@/app/components/register-modal/index')),
  [Modals.Overview]: dynamic(() => import('@/app/components/overview-modal/index')),
  [Modals.Logout]: dynamic(() => import('@/app/components/logout-modal')),
};

export default MODALS;

import OverviewSteps from '@/app/enums/overview-steps';
import { ModalStep } from '@/app/interfaces/modal-step';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const overviewSteps: ModalStep<OverviewSteps>[] = [
  {
    id: OverviewSteps.Name,
    name: 'Create name for your notifier bot',
  },
  {
    id: OverviewSteps.Channels,
    name: 'Select channels you want to track',
  },
  {
    id: OverviewSteps.Finish,
    name: 'Finish',
  },
];

export const overviewStepsModals: Record<OverviewSteps, ComponentType> = {
  [OverviewSteps.Name]: dynamic(() => import('@/app/components/overview-modal/step1')),
  [OverviewSteps.Channels]: dynamic(() => import('@/app/components/overview-modal/step2')),
  [OverviewSteps.Finish]: dynamic(() => import('@/app/components/overview-modal/step3')),
};

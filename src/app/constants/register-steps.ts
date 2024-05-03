import RegisterSteps from '@/app/enums/register-steps';
import { RegisterStep } from '@/app/interfaces/register-step';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const registerSteps: RegisterStep[] = [
  {
    id: RegisterSteps.Application,
    name: 'Create Telegram application',
  },
  {
    id: RegisterSteps.Api,
    name: 'Fill your API data',
  },
  {
    id: RegisterSteps.Data,
    name: 'Fill your Telegram data',
  },
  {
    id: RegisterSteps.Code,
    name: 'Fill a code that was sent to your phone number',
  },
  {
    id: RegisterSteps.Finish,
    name: 'Finish',
  },
];

export const registerStepsModals: Record<RegisterSteps, ComponentType> = {
  [RegisterSteps.Application]: dynamic(() => import('@/app/components/register-modal/step1')),
  [RegisterSteps.Api]: dynamic(() => import('@/app/components/register-modal/step2')),
  [RegisterSteps.Data]: dynamic(() => import('@/app/components/register-modal/step3')),
  [RegisterSteps.Code]: dynamic(() => import('@/app/components/register-modal/step4')),
  [RegisterSteps.Finish]: dynamic(() => import('@/app/components/register-modal/step5')),
};

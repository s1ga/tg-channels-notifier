import { RegisterStep } from '@/app/interfaces/register-step';
import { MouseEventHandler } from 'react';

export interface StepperProps {
  step: RegisterStep['id'];
  maxStep: number;
  handleNext: MouseEventHandler<HTMLButtonElement>;
  handleBack: MouseEventHandler<HTMLButtonElement>;
}

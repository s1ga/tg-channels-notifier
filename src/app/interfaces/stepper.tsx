import { MouseEventHandler } from 'react';

export interface StepperProps {
  step: number;
  maxStep: number;
  handleNext: MouseEventHandler<HTMLButtonElement>;
  handleBack: MouseEventHandler<HTMLButtonElement>;
}

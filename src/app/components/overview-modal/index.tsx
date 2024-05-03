import Stepper from '@/app/components/stepper';
import { overviewSteps, overviewStepsModals } from '@/app/constants/overview-steps';
import OverviewSteps from '@/app/enums/overview-steps';
import { ModalStep } from '@/app/interfaces/modal-step';
import { OverviewModalProps } from '@/app/interfaces/overview-modal-props';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';

export default function OverviewModal({ onClose }: OverviewModalProps) {
  const [step, setStep] = useState<ModalStep<OverviewSteps>['id']>(overviewSteps[0].id);

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleNext = () => {
    if (step === overviewSteps.length - 1) {
      onClose();
      return;
    }

    setStep((state: number) => state + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      onClose();
      return;
    }
    setStep((state: number) => state - 1);
  };

  const CurrentComponent = useMemo(() => overviewStepsModals[step], [step]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      onClose={onClose}
    >
      <DialogTitle>Create notifier</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }} component="form" onSubmit={handleForm}>
          <Box sx={{ p: 2, width: '100%', marginLeft: -2 }}>
            <CurrentComponent />
          </Box>

          <Stepper
            step={step}
            maxStep={overviewSteps.length - 1}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

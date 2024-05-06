import Stepper from '@/app/components/stepper';
import { overviewSteps, overviewStepsModals } from '@/app/constants/overview-steps';
import OverviewSteps from '@/app/enums/overview-steps';
import { ModalStep } from '@/app/interfaces/modal-step';
import { OverviewModalProps } from '@/app/interfaces/overview-modal-props';
import { selectSelectedChannels } from '@/store/features/channels/channels-slice';
import { selectIsAuth, setError } from '@/store/features/client/client-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

export default function OverviewModal({ onClose }: OverviewModalProps) {
  const [step, setStep] = useState<ModalStep<OverviewSteps>['id']>(overviewSteps[0].id);
  const botNameRef = useRef<string>('');
  const currentTask = useRef<CallableFunction | null>(null);
  const selectedChannels = useAppSelector(selectSelectedChannels);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === OverviewSteps.Name) {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name')!.toString();
      botNameRef.current = name;
    } else if (step === OverviewSteps.Channels) {
      if (!selectedChannels.length) {
        dispatch(setError('Select channels!'));
        return;
      }
      // TODO: handle bot creation
      console.log({
        name: botNameRef.current,
        selectedChannels,
      });
    }

    if (currentTask.current) {
      currentTask.current();
      currentTask.current = null;
    }
  };

  const handleNext = () => {
    currentTask.current = () => {
      if (step === overviewSteps.length - 1) {
        onClose();
        return;
      }

      setStep((state: number) => state + 1);
    };
  };

  const handleBack = () => {
    if (step === 0) {
      onClose();
      return;
    }
    setStep((state: number) => state - 1);
  };

  const CurrentComponent = useMemo(() => overviewStepsModals[step], [step]);

  useEffect(() => {
    if (!isAuth) onClose();
  }, [isAuth, onClose]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      onClose={onClose}
    >
      <DialogTitle>{overviewSteps[step].name}</DialogTitle>
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

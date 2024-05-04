import Stepper from '@/app/components/stepper';
import { registerSteps, registerStepsModals } from '@/app/constants/register-steps';
import RegisterSteps from '@/app/enums/register-steps';
import { ModalStep } from '@/app/interfaces/modal-step';
import { RegisterModalProps } from '@/app/interfaces/register-modal-props';
import promisify from '@/app/utils/promisify';
import { selectClient, setError, updateApi, updateSession } from '@/store/features/client/client-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FormEvent, useMemo, useRef, useState } from 'react';

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const [step, setStep] = useState<ModalStep<RegisterSteps>['id']>(registerSteps[0].id);
  const telegramData = useRef<{ phone: string, password: string } | null>(null);
  const currentTask = useRef<CallableFunction | null>(null);
  const dispatch = useAppDispatch();
  const client = useAppSelector(selectClient);

  // TODO: check for different errors
  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    switch (step) {
      case RegisterSteps.Api:
        submitApi(formData);
        break;
      case RegisterSteps.Data:
        await submitTelegramData(formData);
        break;
      case RegisterSteps.Code:
        await submitCode(formData);
        break;
      default:
        break;
    }

    if (currentTask.current) {
      currentTask.current!();
      currentTask.current = null;
    }
  };

  const handleNext = () => {
    currentTask.current = () => {
      if (step === registerSteps.length - 1) {
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

  const handlePassword = () => new Promise<string>((res, rej) => {
    if (!telegramData.current?.password) rej(new Error('You had to enter 2FA password'));
    res(telegramData.current!.password);
  });

  const submitApi = (formData: FormData) => {
    const id = parseInt(formData.get('id')?.toString() || '', 10);
    const hash = formData.get('hash')?.toString() || '';
    dispatch(updateApi({ id, hash }));
  };

  const submitTelegramData = async (formData: FormData) => {
    const phone = formData.get('phone')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    telegramData.current = { phone, password };

    const { apiHash, apiId } = client;
    await client.sendCode(
      { apiHash, apiId },
      phone,
    );
  };

  const submitCode = async (formData: FormData) => {
    const code = formData.get('code')?.toString() || '';
    await client.start({
      phoneNumber: telegramData.current!.phone,
      phoneCode: () => promisify(code),
      password: handlePassword,
      onError: (err: Error) => {
        dispatch(setError(err.message));
      },
    });
    const session = client.session.save() as unknown as string;
    dispatch(updateSession(session));
  };

  const CurrentComponent = useMemo(() => registerStepsModals[step], [step]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      onClose={onClose}
    >
      <DialogTitle>{registerSteps[step].name}</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }} component="form" onSubmit={handleForm}>
          <Box sx={{ p: 2, width: '100%', marginLeft: -2 }}>
            <CurrentComponent />
          </Box>
          <Stepper
            step={step}
            maxStep={registerSteps.length - 1}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

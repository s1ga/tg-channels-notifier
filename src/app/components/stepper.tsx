import { StepperProps } from '@/app/interfaces/stepper';
import { Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function Stepper({ step, maxStep, handleNext, handleBack }: StepperProps) {
  const NextButton = <Button
    type="submit"
    size="medium"
    onClick={handleNext}
  >
    {step === maxStep ? 'Close' : 'Next' }
    {step !== maxStep && <KeyboardArrowRight />}
  </Button>;

  const BackButton = <Button
    size="medium"
    onClick={handleBack}
    disabled={step === maxStep}
  >
    {
      step === 0
        ? 'Close'
        : <><KeyboardArrowLeft /> Back</>
    }
  </Button>;

  return (
    <MobileStepper
      variant="progress"
      position="static"
      steps={maxStep + 1}
      activeStep={step}
      nextButton={NextButton}
      backButton={BackButton}
    />
  );
}

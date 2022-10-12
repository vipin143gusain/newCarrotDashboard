import * as done from '@/public/static/images/loaders/done.json';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormProvider, useForm } from 'react-hook-form';
import Lottie from 'react-lottie';

import { EastTwoTone, KeyboardBackspaceTwoTone } from '@mui/icons-material';
const useStyles = makeStyles(() => ({
  button: {
    marginRight: 5,
  }
}));

function getSteps(allSteps) {
  return allSteps;
}


function getStepContent(step:number, stepData:any) {
  for (let i = 0; i < stepData.length; i++) {
    if (i == step) {
      switch (step) {
        case step:
          return stepData[step].renderForm;
        default:
          return 'unknown step';
      }
    }
  }
}

interface MultiPartFormProps {
  activeStep: number;
  stepData: any;
  handleNextBtn?: any;
  handleSkipBtn?: any;
  handleBackBtn?: any;
  defaultValues?: any;
  allSteps?: any;
  onChange?:any;
  handleFileChange?:any;
  isFormComplete?:boolean
}

const MultiPartForm = (props: MultiPartFormProps) => {
  const {
    activeStep,
    stepData,
    handleNextBtn,
    allSteps,
    handleBackBtn,
    defaultValues,isFormComplete
  } = props;

  const classes = useStyles();

  const methods = useForm(defaultValues);

  const steps = getSteps(allSteps);




  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = { optional: null, error: null };
          const stepProps = { completed: false };

          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {isFormComplete ? (
        <>
        
         <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: done
          }}
          height={300}
          width={300}
       
        />
        <Typography variant="h3" align="center">
         Congrats ! You have successfully completed
        </Typography>
        </>
        
      ) : ( 
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNextBtn)}>
              {getStepContent(activeStep, stepData)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBackBtn}
                startIcon={<KeyboardBackspaceTwoTone />}
              >
                Back
              </Button>
             
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              endIcon={<EastTwoTone />}
                type="submit"
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default MultiPartForm;

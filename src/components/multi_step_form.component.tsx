import * as done from '@/public/static/images/loaders/done.json';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormProvider, useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import * as loaderIcon from '@/public/static/images/loaders/carrot-loader-2x.json';
import { getModalState } from '@/store/slices/modal_watcher';



import { EastTwoTone, KeyboardBackspaceTwoTone } from '@mui/icons-material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  isFormComplete?:boolean,
  isSubmitting?:boolean
}

const MultiPartForm = (props: MultiPartFormProps) => {
  const {
    isSubmitting,
    activeStep,
    stepData,
    handleNextBtn,
    allSteps,
    handleBackBtn,
    defaultValues,
    isFormComplete,
    categoryListData,
    subCategoryListData,
  } = props;

  const classes = useStyles();

  const methods = useForm({defaultValues:defaultValues.defaultValues,shouldUnregister: true});
  const {setValue } = methods;

  const steps = getSteps(allSteps);
  const modalState = useSelector(getModalState);


  // console.log({defaultValues,value:methods.getValues()})

  useEffect(()=>{

    Object.keys(defaultValues.defaultValues).map(objKey=>{
      setValue(objKey,defaultValues.defaultValues[objKey])
    })



  },[modalState,defaultValues])
 


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
        
      ) :isSubmitting?(
        <>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loaderIcon
          }}
          height={150}
          width={150}
          // isStopped={this.state.isStopped}
          // isPaused={this.state.isPaused}
        />
        </>
      ): ( 
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
                {/* active step {activeStep}
                steps.length {steps.length} */}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default MultiPartForm;

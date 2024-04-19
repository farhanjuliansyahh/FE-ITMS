import * as React from 'react';
import { Edit, Delete, CalendarMonthOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function EventBerjalan() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const boxStyle = {
    border: '1px solid #E0E0E0', // Border style definition
    padding: '20px', // Example padding
    width: '100%',
    borderRadius:'12px'
  };

  const theme = useTheme();

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px', // Adjust the gap between elements as needed
    paddingBottom: '24px',
  });

  const FlexTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom:0
  });
  
  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
  });
  
  const BoxAvatar = styled(Avatar)({
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: '#F5F8FF',
    color: '#1C2D5A',
    width: 48,
    height: 48,
    '& svg': {
      fontSize: '2rem',
    },
  }); 

  const CalendarIcon = styled(CalendarMonthOutlined)({
    fontSize: '1rem',
    color: '#1C2D5A',
  });

  const CurrentEventLabel = styled('div')({
    backgroundColor: '#EAF8FF', 
    color: '#2196F3',
    padding: '8px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize:'16px'
  });

  const CountdownLabel = styled('div')({
    backgroundColor: '#FFEDED', 
    color: '#F44336',
    padding: '8px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize:'16px'
  });

  const editButtonStyle = {
    border: '1px solid #000',
    color: '#1C2D5A',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px'
  }

  const deleteButtonStyle = {
    border: '1px solid #D32F2F',
    color: '#D32F2F',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px'
  }

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap:'16px'
  });
  
  const editButton = (
    <Button sx={editButtonStyle} endIcon={<Edit />}>
      Edit
    </Button>
  );

  const mulaiTahapSelanjutnyaButtonStyle = {
    border: '1px solid #D32F2F',
    backgroundColor: '#1C2D5A',
    color: '#FFFFFF',
    borderRadius: '12px',
    fontSize:'14px',
    padding: '8px 16px',
  }

  const mulaiTahapSelanjutnyaButton = (
    <Button sx={mulaiTahapSelanjutnyaButtonStyle} endIcon={<ArrowForwardOutlined />}>
      Mulai Tahap Selanjutnya
    </Button>
  );

  
  const deleteButton = (
    <Button sx={deleteButtonStyle} endIcon={<Delete />}>
      Hapus
    </Button>
  );

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px',
  });
  
  const dividerStyle = {
    margin: '0 auto', 
  };

  return (
    <Box sx={boxStyle}>
      <FlexContainer>
        <BoxContainer>
          <FlexTitle style={{paddingBottom:'8px'}}>
            <Typography style={{fontSize:'24px', fontWeight:'bold'}}>TRIAL EVENT_ E1-D3_BISNIS</Typography>
          </FlexTitle>

          <FlexTitle>
            <CalendarIcon style={{color:'#828282'}}/>
            <Typography style={{fontSize:'14px', color:'#828282'}}>22 Januari 2024 - 22 Maret 2024</Typography>
          </FlexTitle>
        </BoxContainer>

        <div style={{ flex: '1' }}> </div>
        <ButtonsContainer>
          <CountdownLabel>53 Hari Lagi</CountdownLabel>
          {mulaiTahapSelanjutnyaButton}
        </ButtonsContainer>
      </FlexContainer>

      <DividerContainer>
        <Divider orientation="horizontal" flexItem sx={dividerStyle} /> 
      </DividerContainer>

      {/* <Grid container spacing={2} style={{paddingBottom:'24px'}}>
        <Grid item xs={12} md={3}>
          <Typography>Talent Source</Typography>
          <Typography style={{fontWeight:'bold'}}>Trial</Typography>
          
        </Grid>
        <FlexTitle>
            <CalendarMonthOutlined style={{size:'16px', color:'#828282'}}/>
            <Typography style={{fontSize:'14px', color:'#828282'}}>22 Januari 2024 - 22 Maret 2024</Typography>
        </FlexTitle>
      </Grid> */}

      
      <BoxContainer>
          <FlexTitle style={{paddingBottom:'8px', justifyContent: 'center'}}>
            <CurrentEventLabel>Talent Source</CurrentEventLabel>
          </FlexTitle>

          <FlexTitle style={{paddingBottom:'24px', justifyContent: 'center'}}>
            <CalendarIcon style={{color:'#828282'}}/>
            <Typography style={{color:'#828282'}}>22 Januari 2024 - 22 Maret 2024</Typography>
          </FlexTitle>
      </BoxContainer>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 5, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

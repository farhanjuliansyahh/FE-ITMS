import * as React from 'react';
// import Box from '@mui/material/Box';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function HorizontalLinearStepper() {
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

  const CalendarIcon = styled(EventIcon)({
    fontSize: '1rem',
    color: '#1C2D5A',
  });

  const StatusLabel = styled('div')({
    backgroundColor: '#EAF8FF', // Adjust the background color of the status label
    color: '#2196F3',
    padding: '4px 8px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize:'12px'
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
    <Button sx={editButtonStyle} endIcon={<EditIcon />}>
      Edit
    </Button>
  );
  
  const deleteButton = (
    <Button sx={deleteButtonStyle} endIcon={<DeleteIcon />}>
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
        <BoxAvatar variant="rounded">
          <EmojiEventsOutlinedIcon />
        </BoxAvatar>

        <BoxContainer> 
          {/* <FlexTitle style={{paddingBottom:'8px'}}>
            <Typography style={{fontSize:'16px', fontWeight:'bold'}}>TRIAL EVENT_ E1-D3_BISNIS</Typography>
            <StatusLabel>Berlangsung</StatusLabel>
          </FlexTitle> */}
          <FlexTitle style={{ paddingBottom: '8px' }}>
          {/* Wrap the Typography with Link */}
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none', // Remove underline
              color: 'inherit', // Inherit color from parent
            }}
          >
            <Link to="/talent/detail-event" style={{ color: 'inherit' }}>
              TRIAL EVENT_ E1-D3_BISNIS
            </Link>
          </Typography>
            <StatusLabel>Berlangsung</StatusLabel>
          </FlexTitle>

          <FlexTitle>
            <CalendarIcon style={{color:'#828282'}}/>
            <Typography style={{color:'#828282'}}>22 Januari 2024 - 22 Maret 2024</Typography>
          </FlexTitle>
        </BoxContainer>

        <div style={{ flex: '1' }}> </div>
        <ButtonsContainer>
          {editButton}
          {deleteButton}
        </ButtonsContainer>
      </FlexContainer>

      <DividerContainer>
        <Divider orientation="horizontal" flexItem sx={dividerStyle} /> 
      </DividerContainer>

      <Grid container spacing={2} style={{paddingBottom:'24px'}}>
        <Grid item xs={12} md={3}>
          <Typography>Deskripsi</Typography>
          <Typography style={{fontWeight:'bold'}}>Trial</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography>Tipe</Typography>
          <Typography style={{fontWeight:'bold'}}>Committee Talent III</Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Job Family</Typography>
          <Typography style={{fontWeight:'bold'}}>Bisnis</Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Batas Akhir Event</Typography>
          <Typography style={{fontWeight:'bold'}}>22 Januari 2024</Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Hitung Mundur</Typography>
          <Typography style={{fontWeight:'bold', color:'#F44336'}}>53 hari lagi</Typography>
        </Grid>
      </Grid>

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

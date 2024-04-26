import React, { useState } from 'react';
import { ArrowBackOutlined, ArrowForwardOutlined, CalendarMonthOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from '../../ui-component/cards/MainCard';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import ButtonPrimary from '../button/ButtonPrimary';

import TalentSource from '../../ui-component/event-section/talent-source';
import TalentProfile from '../../ui-component/event-section/talent-profile';
import TalentQualification from '../../ui-component/event-section/talent-qualification';
import TalentDays from '../../ui-component/event-section/talent-days';
import TalentPool from '../../ui-component/event-section/talent-pool';
import MatrixNineBox from '../../ui-component/submenu/matrixninebox';
import KonfirmasiNextEvent from '../../ui-component/modal/konfirmasi-next-event';
import KonfirmasiTalentPool from '../../ui-component/modal/konfirmasi-talent-pool';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function TimelineDetailEvent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [talentPoolDialogOpen, setTalentPoolDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const boxStyle = {
    padding: '20px', 
    width: '100%',
    borderRadius:'12px'
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px', 
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

  const CalendarIcon = styled(CalendarMonthOutlined)({
    fontSize: '1rem',
    color: '#1C2D5A',
  });

  const CurrentEventLabel = styled('div')({
    backgroundColor: '#EAF8FF', 
    color: '#2196F3',
    padding: '8px 16px',
    borderRadius: '24px',
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

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px',
  });
  
  const dividerStyle = {
    margin: '0 auto', 
  };


  const handleNext = () => {
    if (activeStep < 5) {
      setDialogOpen(true); // Open KonfirmasiNextEvent dialog
    } else if (activeStep === 5) {
      setTalentPoolDialogOpen(true); // Open KonfirmasiTalentPool dialog
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmation = (date) => {
    if (activeStep < 5) {
    // Close the dialog and proceed to the next step
      setDialogOpen(false);
      setSelectedDate(date); // Store the selected date
      setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to the next step
    } else if (activeStep === 5) {
      setTalentPoolDialogOpen(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  };

  const currentStepLabel = activeStep >= 5 ? steps[5] : steps[activeStep];

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <MainCard sx={{marginTop : 5}}>
            <Box>
              <TalentSource/>
            </Box>
          </MainCard>
        );
      case 1:
        return (
          <MainCard sx={{marginTop : 5}}>
            <Box>
              <TalentProfile/>
            </Box>
          </MainCard>
        );
      case 2:
        return (
          <MainCard sx={{marginTop : 5}}>
            <Box>
              <TalentQualification/>
            </Box>
          </MainCard>
        );
      case 3:
        return (
          <MainCard sx={{marginTop : 5}}>
            <Box>
              <TalentDays/>
            </Box>
          </MainCard>
        );
      case 4:
        return (
          <MainCard sx={{marginTop : 5}}>
            <Box>
              <MatrixNineBox/>
            </Box>
          </MainCard>
        );
      default:
        return (
          <MainCard sx={{marginTop : 5}}>
            <Box>
              <TalentPool/>
            </Box>
          </MainCard>
        );
    }
  };

  return (
    <MainCard>
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
          
          <CountdownLabel>53 Hari Lagi</CountdownLabel>

          <ButtonPrimary 
            Color="#ffffff" 
            icon={ArrowBackOutlined} 
            LabelName={'Lihat Tahap Sebelumnya'}
            onClick={handleBack}
            disabled={activeStep === 0} 
          />

          <ButtonPrimary 
            Color="#ffffff"
            backgroundColor={activeStep === steps.length ? "#E0E0E0" : "#1C2D5A"}
            icon={activeStep >= steps.length - 1 ? CheckCircleOutlined : ArrowForwardOutlined}
            LabelName={activeStep >= steps.length - 1 ? "Selesaikan Event" : "Mulai Tahap Selanjutnya"}
            onClick={handleNext}
            disabled={activeStep === steps.length}
          />
          
        </FlexContainer>

        <DividerContainer>
          <Divider orientation="horizontal" flexItem sx={dividerStyle} /> 
        </DividerContainer>
        
        <BoxContainer>
            <FlexTitle style={{paddingBottom:'8px', justifyContent: 'center'}}>
              <CurrentEventLabel>{currentStepLabel}</CurrentEventLabel>
            </FlexTitle>

            <FlexTitle style={{paddingBottom:'24px', justifyContent: 'center'}}>
              <CalendarIcon style={{color:'#828282'}}/>
              <Typography style={{color:'#828282'}}>22 Januari 2024 - 01 Februari 2024</Typography>
            </FlexTitle>
        </BoxContainer>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        
        {renderStepContent(activeStep)}

        <KonfirmasiNextEvent
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          handleConfirmation={handleConfirmation}
          currentstep={activeStep}
        />

        <KonfirmasiTalentPool
          open={talentPoolDialogOpen}
          handleClose={() => setTalentPoolDialogOpen(false)}
          handleConfirmation={handleConfirmation}
        />

      </Box>
    </MainCard>

    
  );
}

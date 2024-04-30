import React, { useEffect,useState } from 'react';
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
import KonfirmasiNextEvent from '../../ui-component/modal/konfirmasi-next-event';
import KonfirmasiTalentPool from '../../ui-component/modal/konfirmasi-talent-pool';
import TalentCluster from '../../ui-component/event-section/talent-cluster';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function TimelineDetailEvent({ eventid, nama_event, deskripsi, tipekomite, rumpun, tanggal_mulai, tanggal_selesai, eventstatus_id }) {
  //console.log(nama_event);
  const [activeStep, setActiveStep] = React.useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [talentPoolDialogOpen, setTalentPoolDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [DaysLeft, setDaysLeft] = useState('');

  useEffect(() => {
    setActiveStep(eventstatus_id-2)
  }, [eventstatus_id]);

  console.log(activeStep);

  const boxStyle = {
    padding: '0px', 
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
          <MainCard sx={{marginTop : '24px'}}>
            <Box>
              <TalentSource/>
            </Box>
          </MainCard>
        );
      case 1:
        return (
          <MainCard sx={{marginTop : '24px'}}>
            <Box>
              <TalentProfile/>
            </Box>
          </MainCard>
        );
      case 2:
        return (
          <MainCard sx={{marginTop : '24px'}}>
            <Box>
              <TalentQualification/>
            </Box>
          </MainCard>
        );
      case 3:
        return (
          <MainCard sx={{marginTop : '24px'}}>
            <Box>
              <TalentDays/>
            </Box>
          </MainCard>
        );
      case 4:
        return (
          <MainCard sx={{marginTop : '24px'}}>
            <Box>
              <TalentCluster />
            </Box>
          </MainCard>
        );
      default:
        return (
          <MainCard sx={{marginTop : '24px'}}>
            <Box>
              <TalentPool/>
            </Box>
          </MainCard>
        );
    }
  };

  useEffect(() => {
    // Convert 'tanggal_selesai' from ISO 8601 format to a Date object
    const endDate = new Date(tanggal_selesai);
    // Get the current date
    const currentDate = new Date();
    // Calculate the difference in milliseconds between the current date and the 'tanggal_selesai'
    const timeDifference = endDate.getTime() - currentDate.getTime();
    // Convert the difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    // Set the number of days left
    setDaysLeft(daysDifference);
  }, [tanggal_selesai]);

  return (
 
      <Box sx={boxStyle}>
        <Box sx={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px'}}>
        <FlexContainer>
          <BoxContainer>
            <FlexTitle style={{paddingBottom:'8px'}}>
              <Typography style={{fontSize:'24px', fontWeight:'bold'}}>{nama_event}</Typography>
            </FlexTitle>

            <FlexTitle>
              <CalendarIcon style={{color:'#828282'}}/>
              <Typography style={{fontSize:'14px', color:'#828282'}}>{tanggal_mulai &&
            new Date(tanggal_mulai).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })} - {tanggal_selesai &&
              new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}</Typography>
            </FlexTitle>
          </BoxContainer>

          <div style={{ flex: '1' }}> </div>
          
          <CountdownLabel>{DaysLeft !== null ? `${DaysLeft} hari` : ''}</CountdownLabel>

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
              <Typography style={{color:'#828282'}}> {tanggal_mulai &&
            new Date(tanggal_mulai).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })} - {tanggal_selesai &&
            new Date(tanggal_selesai).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}</Typography>
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
        </Box>
        
        {renderStepContent(activeStep)}

        <KonfirmasiNextEvent
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          handleConfirmation={handleConfirmation}
          currentstep={activeStep}
          status = {eventstatus_id}
          eventid = {eventid}
        />

        <KonfirmasiTalentPool
          open={talentPoolDialogOpen}
          handleClose={() => setTalentPoolDialogOpen(false)}
          handleConfirmation={handleConfirmation}
        />

      </Box>
 

    
  );
}

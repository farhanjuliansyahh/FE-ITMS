import React, { useEffect, useState } from 'react';
import { ArrowBackOutlined, ArrowForwardOutlined, CalendarMonthOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from '../../ui-component/cards/MainCard';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import ButtonPrimary from '../button/ButtonPrimary';
import ButtonSecondary from '../button/ButtonOptional';

import TalentSource from '../../ui-component/event-section/talent-source';
import TalentProfile from '../../ui-component/event-section/talent-profile';
import TalentQualification from '../../ui-component/event-section/talent-qualification';
import TalentDays from '../../ui-component/event-section/talent-days';
import TalentPool from '../../ui-component/event-section/talent-pool';
import KonfirmasiNextEvent from '../../ui-component/modal/konfirmasi-next-event';
import KonfirmasiTalentPool from '../../ui-component/modal/konfirmasi-talent-pool';
import TalentCluster from '../../ui-component/event-section/talent-cluster';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function TimelineDetailEvent({
  eventid,
  nama_event,
  deskripsi,
  kodekomite,
  tipekomite,
  rumpun,
  tanggal_mulai,
  tanggal_selesai,
  eventstatus_id,
  handleActiveStepChange
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [talentPoolDialogOpen, setTalentPoolDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [DaysLeft, setDaysLeft] = useState('');
  const [deadline, setDeadline] = useState([]);
  const [DaysLeftStep, setDaysLeftStep] = useState('');
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);


  useEffect(() => {
    setActiveStep(eventstatus_id - 2);
  }, [eventstatus_id]);

  const geteventdeadline = () => {
    return fetch(`http://localhost:4000/geteventdeadline?eventtalentid=${eventid}`) // endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDeadline(data); // Return the parsed JSON data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

  useEffect(() => {
    geteventdeadline();
    const endDate = new Date(tanggal_selesai);
    const currentDate = new Date();
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDaysLeft(daysDifference);
  }, [tanggal_selesai]);

  function calculateDaysLeft(startDate, endDate) {
    const end = new Date(endDate);
    const start = new Date(startDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    return daysDifference;
  }

  useEffect(() => {
    if (deadline.length > 0 && eventstatus_id >= 2 && eventstatus_id <= 7) {
      const startdateProperty = `startdate_${eventstatus_id - 1}`;
      const deadlineProperty = `deadline_${eventstatus_id - 1}`;

      const startdate = deadline[0][startdateProperty];
      const deadlineDate = new Date(deadline[0][deadlineProperty]);

      const daysLeftStep = calculateDaysLeft(startdate, deadlineDate);

      deadlineDate.setDate(deadlineDate.getDate() + 1);

      setDaysLeftStep(daysLeftStep);
      setStartdate(startdate);
      setEnddate(deadlineDate);
    }
  }, [deadline, eventstatus_id]);

  const boxStyle = {
    padding: '0px',
    width: '100%',
    borderRadius: '12px'
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  const FlexTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: 0
  });

  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
  });

  const CalendarIcon = styled(CalendarMonthOutlined)({
    fontSize: '1rem',
    color: '#1C2D5A'
  });

  const CurrentEventLabel = styled('div')({
    backgroundColor: '#EAF8FF',
    color: '#2196F3',
    padding: '8px 16px',
    borderRadius: '24px',
    fontWeight: 600,
    fontSize: '16px'
  });

  const CountdownLabel = styled('div')({
    backgroundColor: '#FFEDED',
    color: '#F44336',
    padding: '8px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '16px'
  });

  const CountdownStep = styled('div')({
    backgroundColor: '#FFEDED',
    color: '#F44336',
    padding: '4px 12px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '12px'
  });

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px'
  });

  const dividerStyle = {
    margin: '0 auto'
  };

  const handleNext = () => {
    if (activeStep < 5) {
      setDialogOpen(true);
    } else if (activeStep === 5) {
      setTalentPoolDialogOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmation = (date) => {
    if (activeStep < 5) {
      setDialogOpen(false);
      setSelectedDate(date);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleActiveStepChange();
    } else if (activeStep === 5) {
      setTalentPoolDialogOpen(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleActiveStepChange();
    }
  };

  const currentStepLabel = activeStep >= 5 ? steps[5] : steps[activeStep];

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <MainCard sx={{ marginTop: '24px' }}>
            <Box>
              <TalentSource eventid={eventid} />
            </Box>
          </MainCard>
        );
      case 1:
        return (
          <MainCard sx={{ marginTop: '24px' }}>
            <Box>
              <TalentProfile eventid={eventid} />
            </Box>
          </MainCard>
        );
      case 2:
        return (
          <MainCard sx={{ marginTop: '24px' }}>
            <Box>
              <TalentQualification eventid={eventid} kodekomite={kodekomite} />
            </Box>
          </MainCard>
        );
      case 3:
        return (
          <MainCard sx={{ marginTop: '24px' }}>
            <Box>
              <TalentDays eventid={eventid} />
            </Box>
          </MainCard>
        );
      case 4:
        return (
          <MainCard sx={{ marginTop: '24px' }}>
            <Box>
              <TalentCluster eventid={eventid} />
            </Box>
          </MainCard>
        );
      default:
        return (
          <MainCard sx={{ marginTop: '24px' }}>
            <Box>
              <TalentPool eventid={eventid} />
            </Box>
          </MainCard>
        );
    }
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px' }}>
        <FlexContainer>
          <BoxContainer>
            <FlexTitle style={{ paddingBottom: '8px' }}>
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{nama_event}</Typography>
            </FlexTitle>

            <FlexTitle>
              <CalendarIcon style={{ color: '#828282' }} />
              <Typography style={{ fontSize: '14px', color: '#828282' }}>
                {tanggal_mulai &&
                  new Date(tanggal_mulai).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}{' '}
                -{' '}
                {tanggal_selesai &&
                  new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
              </Typography>
            </FlexTitle>
          </BoxContainer>

          <div style={{ flex: '1' }}> </div>

          {eventstatus_id !== 8 && <CountdownLabel>{DaysLeft !== null ? `${DaysLeft} hari lagi` : ''}</CountdownLabel>}


          <ButtonSecondary
            Color="#1C2D5A"
            icon={ArrowBackOutlined}
            LabelName={'Lihat Tahap Sebelumnya'}
            onClick={handleBack}
            disabled={activeStep === 0}
          />

          {activeStep === eventstatus_id - 2 ? (
            <ButtonPrimary
              Color="#ffffff"
              backgroundColor={activeStep === steps.length ? '#E0E0E0' : '#1C2D5A'}
              icon={activeStep >= steps.length - 1 ? CheckCircleOutlined : ArrowForwardOutlined}
              LabelName={activeStep >= steps.length - 1 ? 'Selesaikan Event' : 'Mulai Tahap Selanjutnya'}
              onClick={handleNext}
              disabled={activeStep === steps.length}
            />
          ) : (
            <ButtonPrimary
              Color="#ffffff"
              backgroundColor="#1C2D5A"
              icon={ArrowForwardOutlined}
              LabelName="Lihat Tahap Selanjutnya"
              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
              disabled={activeStep >= steps.length - 1}
            />
          )}
        </FlexContainer>

        <DividerContainer>
          <Divider orientation="horizontal" flexItem sx={dividerStyle} />
        </DividerContainer>

        <BoxContainer>
          <FlexTitle style={{ paddingBottom: '8px', justifyContent: 'center' }}>
            <CurrentEventLabel>{currentStepLabel}</CurrentEventLabel>
          </FlexTitle>

          <FlexTitle style={{ paddingBottom: '24px', justifyContent: 'center' }}>
            <CalendarIcon style={{ color: '#828282' }} />
            <Typography style={{ color: '#828282' }}>
              {deadline.length > 0 && eventstatus_id >= 2 && eventstatus_id <= 7 && (
                <>
                  {new Date(deadline[0][`startdate_${activeStep + 1}`]).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })} -
                  {(() => {
                    const endDate = new Date(deadline[0][`deadline_${activeStep + 1}`]);
                    endDate.setDate(endDate.getDate() + 1); // Add one day
                    return endDate.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                  })()}
                </>
              )}
            </Typography>
          </FlexTitle>
        </BoxContainer>

        <Stepper activeStep={eventstatus_id - 2} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>

                {index < eventstatus_id - 2 &&
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                    <CountdownStep style={{ backgroundColor: '#F5FFF5', color: '#66BB6A' }}>Selesai</CountdownStep>
                  </Box>
                }

                {index === eventstatus_id - 2 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                    {DaysLeftStep !== null ? (
                      DaysLeftStep > 0 ? (
                        <CountdownStep>{`${DaysLeftStep} hari lagi`}</CountdownStep>
                      ) : DaysLeftStep === 0 ? (
                        <CountdownStep>Hari ini</CountdownStep>
                      ) : (
                        <CountdownStep style={{ backgroundColor: '#F5FFF5', color: '#66BB6A' }}>Selesai</CountdownStep>
                      )
                    ) : (
                      ''
                    )}
                  </Box>
                )}
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
        status={eventstatus_id}
        eventid={eventid}
        refresh={geteventdeadline}
        eventStartDate={tanggal_mulai} // Tambahkan properti eventStartDate
      />

      <KonfirmasiTalentPool
        open={talentPoolDialogOpen}
        handleClose={() => setTalentPoolDialogOpen(false)}
        handleConfirmation={handleConfirmation}
        eventid={eventid}
      />
    </Box>
  );
}

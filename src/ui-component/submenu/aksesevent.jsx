import * as React from 'react';

import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EventIcon from '@mui/icons-material/Event';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

const EventLabel = styled('div')({
  backgroundColor: '#FFF6E9',
  color: '#FFA726',
  padding: '4px 8px',
  borderRadius: '16px',
  fontWeight: 400,
  fontSize: '12px'
});

export default function AksesEvent({
  id,
  nama_event,
  deskripsi,
  tipe_komite_talent,
  kode_rumpun,
  nama_rumpun_jabatan,
  kuota,
  tanggal_selesai,
  tanggal_mulai,
  // status_event,
  status,
  ButtonName,
  pathDetailEvent,
  showHitungMundur
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [daysLeft, setDaysLeft] = React.useState(null);

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
    border: '1px solid #E0E0E0',
    padding: '20px',
    width: '100%',
    borderRadius: '12px'
  };

  const theme = useTheme();

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

  const BoxAvatar = styled(Avatar)({
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: '#F5F8FF',
    color: '#1C2D5A',
    width: 48,
    height: 48,
    '& svg': {
      fontSize: '2rem'
    }
  });

  const [open, setOpen] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenHapus = () => {
    setOpenHapus(true);
  };
  const handleCloseHapus = () => {
    setOpenHapus(false);
  };

  const CalendarIcon = styled(EventIcon)({
    fontSize: '1rem',
    color: '#1C2D5A'
  });

  const akseseventButtonStyle = {
    backgroundColor: '#EF4123',
    color: '#fff',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
    ':hover': {
      backgroundColor: '#AB1D05',
      color: '#fff'
    }
  };

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  });

  const akseseventButton = (
    <Link to={pathDetailEvent} style={{ textDecoration: 'none' }}>
      <Button sx={akseseventButtonStyle} endIcon={<ArrowForwardRoundedIcon />}>
        {ButtonName}
      </Button>
    </Link>
  );

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px'
  });

  const dividerStyle = {
    margin: '0 auto'
  };

  let statusberjalan;
  if (status === 1) {
    statusberjalan = 'Belum Mulai';
  } else if (status >= 2 && status <= 7) {
    statusberjalan = 'Berlangsung';
  } else if (status === 8) {
    statusberjalan = 'Selesai';
  } else {
    // Handle other status values if needed
    statusberjalan = 'Unknown Status';
  }

  const statusColors = {
    1: { backgroundColor: '#FFEDED', color: '#F44336' }, // Belum Mulai
    2: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    3: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung (you can add more statuses if needed)
    4: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    5: { backgroundColor: '#EAF8FF', color: '#2196F3' },
    6: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    7: { backgroundColor: '#EAF8FF', color: '#2196F3' },
    8: { backgroundColor: '#F5FFF5', color: '#66BB6A' } // Selesai
  };

  const { backgroundColor, color } = statusColors[status] || {};

  const StatusLabel = styled('div')(({ backgroundColor, color }) => ({
    backgroundColor: backgroundColor,
    color: color,
    padding: '4px 8px',
    borderRadius: '16px',
    fontWeight: 400,
    fontSize: '12px'
  }));

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
      <FlexContainer>
        <BoxAvatar variant="rounded">
          <EmojiEventsOutlinedIcon />
        </BoxAvatar>

        <BoxContainer>
          <FlexTitle style={{ paddingBottom: '8px' }}>
            <Typography
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              {nama_event}
            </Typography>
            <StatusLabel backgroundColor={backgroundColor} color={color}>
              {statusberjalan}
            </StatusLabel>

            <Typography
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'inherit'
              }}
            ></Typography>
            {/* <EventLabel>{status_event} </EventLabel> */}
          </FlexTitle>

          <FlexTitle>
            <CalendarIcon style={{ color: '#828282' }} />
            <Typography style={{ color: '#828282' }}>
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
        <ButtonsContainer>{akseseventButton}</ButtonsContainer>
      </FlexContainer>

      <DividerContainer>
        <Divider orientation="horizontal" flexItem sx={dividerStyle} />
      </DividerContainer>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography>deskripsi</Typography>
          <Typography style={{ fontWeight: 'bold' }}>{deskripsi}</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography>Tipe Komite</Typography>
          <Typography style={{ fontWeight: 'bold' }}>{tipe_komite_talent}</Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Job Family</Typography>
          <Typography style={{ fontWeight: 'bold' }}>{nama_rumpun_jabatan}</Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Batas Akhir Event</Typography>
          <Typography style={{ fontWeight: 'bold' }}>
            {tanggal_selesai &&
              new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
          </Typography>
        </Grid>

        {showHitungMundur && (
          <Grid item xs={12} md={2}>
            <Typography>Hitung Mundur</Typography>
            <Typography style={{ fontWeight: 'bold', color: '#F44336' }}>
              {daysLeft !== null && daysLeft > 0
                ? `${daysLeft} hari lagi`
                : daysLeft === 0
                  ? 'Hari Ini'
                  : `Terlewat ${Math.abs(daysLeft)} hari`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

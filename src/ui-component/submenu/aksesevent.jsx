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
  fontWeight: 600,
  fontSize:'12px'
});

export default function AksesEvent( {namaEvent, pathDetailEvent, ButtonName } ) {
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
    borderRadius:'12px'
  };

  const theme = useTheme();

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
    color: '#1C2D5A',
  });

  const StatusLabel = styled('div')({
    backgroundColor: '#EAF8FF', 
    color: '#2196F3',
    padding: '4px 8px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize:'12px'
  });

  const akseseventButtonStyle = {
    backgroundColor: '#EF4123',
    color: '#fff',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
    ':hover':{
      backgroundColor: '#AB1D05',
      color: '#fff',
    }
  }

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap:'16px'
  });

  const akseseventButton = (
    <Link to={pathDetailEvent} style={{ textDecoration: 'none' }}>
      <Button 
        sx={akseseventButtonStyle} 
        endIcon={<ArrowForwardRoundedIcon />}
      >
        {ButtonName}
      </Button>
    </Link>
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
          <FlexTitle style={{ paddingBottom: '8px' }}>
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none', 
              color: 'inherit', 
            }}
          >
              TRIAL EVENT_ E1-D3_BISNIS
          </Typography >
            <StatusLabel>Berjalan</StatusLabel>
            
            <Typography
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none', 
              color: 'inherit', 
            }}
          >
          </Typography >
          <EventLabel >{namaEvent} </EventLabel>
          </FlexTitle>

          <FlexTitle>
            <CalendarIcon style={{color:'#828282'}}/>
            <Typography style={{color:'#828282'}}>22 Januari 2024 - 22 Maret 2024</Typography>
          </FlexTitle>
        </BoxContainer>

        <div style={{ flex: '1' }}> </div>
        <ButtonsContainer>
          {akseseventButton}
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
    </Box>
  );
}

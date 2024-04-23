import * as React from 'react';
import { CalendarMonthOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function TimelineDetailEvent() {

  const boxStyle = {
    border: '1px solid #E0E0E0', // Border style definition
    padding: '20px', // Example padding
    width: '100%',
    borderRadius:'12px'
  };

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

  const mulaiTahapSelanjutnyaButton = (
    <Button variant="contained" 
    sx={{backgroundColor:'#1a2b5a', borderRadius:'15px'}} 
    endIcon={<ArrowForwardOutlined />}>
      Mulai Tahap Selanjutnya
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
        
        <CountdownLabel>53 Hari Lagi</CountdownLabel>
        {mulaiTahapSelanjutnyaButton}
        
      </FlexContainer>

      <DividerContainer>
        <Divider orientation="horizontal" flexItem sx={dividerStyle} /> 
      </DividerContainer>
      
      <BoxContainer>
          <FlexTitle style={{paddingBottom:'8px', justifyContent: 'center'}}>
            <CurrentEventLabel>Talent Source</CurrentEventLabel>
          </FlexTitle>

          <FlexTitle style={{paddingBottom:'24px', justifyContent: 'center'}}>
            <CalendarIcon style={{color:'#828282'}}/>
            <Typography style={{color:'#828282'}}>22 Januari 2024 - 01 Februari 2024</Typography>
          </FlexTitle>
      </BoxContainer>

      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

import * as React from 'react';
import { Box } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';

// ==============================|| DETAIL EVENT PAGE ||============================== //

export default function DetailEvent() {
  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard sx={{marginBottom : 3}}>
        <Box>
          <TimelineDetailEvent />
        </Box>
      </MainCard>
      
    </>
  );
};
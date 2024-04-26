import * as React from 'react';
import { Box } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
import TalentProfile from '../../../ui-component/event-section/talent-profile';
import TalentQualification from '../../../ui-component/event-section/talent-qualification';
import TalentSource from '../../../ui-component/event-section/talent-source';
import TalentDays from '../../../ui-component/event-section/talent-days';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';


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
{/* 
      <MainCard sx={{marginBottom : 3}}>
        <Box>
        <TalentSource/>
        </Box>
      </MainCard>

       
      <MainCard sx={{marginBottom : 3}}>
        <Box>
        <TalentProfile/>
        </Box>
      </MainCard>

      <MainCard sx={{marginBottom : 3}}>
        <Box>
        <TalentQualification />
        </Box>
      </MainCard>

      <MainCard >
        <Box>
        <TalentDays />
        </Box>
      </MainCard>

      <MainCard>
        <Box>
        <MatrixNineBox />
        </Box>
      </MainCard> */}
      
    </>
  );
};
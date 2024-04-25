import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Container } from '@mui/system';
import MainCard from '../../../ui-component/cards/MainCard';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
// import AddEventModal from '../../../ui-component/modal/TambahEvent';
// import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
// import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
// import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
// import SearchResetButton from '../../../ui-component/button/SearchResetButton';
// import SearchIcon from '@mui/icons-material/Search';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import TalentSourceTable from '../../../ui-component/tables/talentsource';
// import KomiteUnitListButton from '../../../ui-component/button/KomiteUnitListButton';
import TalentProfile from '../../../ui-component/event-section/talent-profile';


import TalentQualification from '../../../ui-component/event-section/talentqualification';
import TalentSource from '../../../ui-component/event-section/talent-source';


// ==============================|| DAFTAR EVENT PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DetailEvent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);


  // const handleButtonClick = () => {
  //   // Logic for button click
  //   console.log('Button clicked!');
  // };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard sx={{marginBottom : 3}}>
        <Box>
          <TimelineDetailEvent />
        </Box>
      </MainCard>

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

      <MainCard >
        <Box>
        <TalentQualification />
        </Box>
      </MainCard>
      
    </>
  );
};

export default DetailEvent;
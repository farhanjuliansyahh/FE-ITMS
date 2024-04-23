import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
// import SendIcon from '@mui/icons-material/Send'; // Import SendIcon

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

import PropTypes from 'prop-types';
// import { gridSpacing } from 'store/constant';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Header from '../../../ui-component/header/header';
// import MainLayout from 'layout/MainLayout';
import { Container } from '@mui/system';
import MainCard from '../../../ui-component/cards/MainCard';
import { DownloadDone, RotateRight } from '@mui/icons-material';
import notFoundImage from '../../../assets/images/ilustration/notfound.png';
// import SecondCard from 'ui-component/cards/SecondCard';
// import SearchSection from 'layout/MainLayout/Header/SearchSection';
import SearchSection2 from '../../../ui-component/searchsection';
import EventBerjalan from '../../../ui-component/submenu/eventberjalan';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
import AddEventModal from '../../../ui-component/modal/TambahEvent';
import Matrix from '../../../ui-component/submenu/matrix';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';

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

const DaftarEvent = () => {
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
      
      <MainCard title="Daftar Event"  secondary={
        <Stack direction="row" spacing={2}>
          <SearchSection2 /> 

          <Button variant="contained" 
          sx={{backgroundColor:'#1a2b5a', borderRadius:'15px'}} 
          endIcon={<AddCircleOutlineIcon />}
          onClick={handleOpen}>
            Tambah Event
          </Button>
        </Stack>
      }>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h5"></Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<RotateRight />} iconPosition="start" label="Berjalan" {...a11yProps(0)} />
            <Tab icon={<DownloadDone />} iconPosition="start" label="Selesai" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft:24, paddingRight:24, paddingBottom:24 }}>
            
            <EventBerjalan />
            
            <img src={notFoundImage} alt="Deskripsi gambar" />
            <Typography variant='h4' marginTop={2}> Tidak Ada Data </Typography>
          </Box>

        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {/* Ini harusnya tempat untuk menyimpan histori event yang selesai,
              tapi dipakai untuk Detail Event dulu ya */}
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>         
            <TimelineDetailEvent />
          </Box>
          
        </CustomTabPanel>
        <AddEventModal open={open} handleClose={handleClose} />


      </MainCard>
    </>
  );
};

export default DaftarEvent;
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
import EventTalentSource from '../../../ui-component/submenu/event-talentsource';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
import AddEventModal from '../../../ui-component/modal/TambahEvent';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';
import KonfirmasiEvent from '../../../ui-component/modal/konfirmasi-next-event';
import AksesEvent from '../../../ui-component/submenu/aksesevent';
import BasicPagination from '../../../ui-component/button/pagination';


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


const fetchDataFromDatabase = () => {
  return fetch('http://localhost:4000/getallevent') // Replace with your actual endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data; // Return the parsed JSON data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error to handle it elsewhere
    });
};


const EventKomiteTalent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [eventData, setEventData] = useState([]);
  
  useEffect(() => {
    fetchDataFromDatabase()
      .then(data => {
        setEventData(data.event);
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


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

          {/* <Button variant="contained" 
          sx={{backgroundColor:'#1a2b5a', borderRadius:'15px'}} 
          endIcon={<AddCircleOutlineIcon />}
          onClick={handleOpen}>
            Tambah Event
          </Button> */}
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
          {/* <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft:24, paddingRight:24, paddingBottom:24 }}>
            
            <AksesEvent />
      
          </Box> */}
{/*          
            <img src={notFoundImage} alt="Deskripsi gambar" />
            <Typography variant='h4' marginTop={2}> Tidak Ada Data </Typography> */}
        
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : eventData.length > 0 ? (
          eventData.map(event => (
            <EventTalentSource 
            key={event.id}
            id={event.id}
            nama_event={event.nama_event}
            deskripsi={event.deskripsi}
            tipe_komite_talent={event.tipekomite.tipe_komite_talent}
            nama_rumpun_jabatan={event.rumpun.nama_rumpun_jabatan}
            tanggal_mulai={event.tanggal_mulai}
            tanggal_selesai={event.tanggal_selesai}
            status={event.evenstatus_id} />
          ))
        ) : (
          <>
            <img src={notFoundImage} alt="Deskripsi gambar" />
            <Typography variant='h4' marginTop={2}> Tidak Ada Data </Typography>
          </>
        )}


        <BasicPagination />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {/* Ini harusnya tempat untuk menyimpan histori event yang selesai,
              tapi dipakai untuk Detail Event dulu ya */}
          <Container style={{width:'100%', align:'center', paddingLeft:0, paddingRight:0}}>         
            <MatrixNineBox />
            {/* <AksesEvent /> */}
          </Container>
          
        </CustomTabPanel>
        <AddEventModal open={open} handleClose={handleClose} />


      </MainCard>
    </>
  );
};

export default EventKomiteTalent;
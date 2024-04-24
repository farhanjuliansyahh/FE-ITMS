import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Container } from '@mui/system';
import MainCard from '../../../ui-component/cards/MainCard';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
import AddEventModal from '../../../ui-component/modal/TambahEvent';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TalentSourceTable from '../../../ui-component/tables/talentsource';
import KomiteUnitListButton from '../../../ui-component/button/KomiteUnitListButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TalentQualification from '../../../ui-component/event-section/talentqualification';
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
      
      <MainCard>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom : 2 }}>
          <TimelineDetailEvent />
        </Box>
        

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<PersonOffOutlinedIcon />} iconPosition="start" label="Belum Terdaftar" {...a11yProps(0)} />
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Terdaftar" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Container style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center"  style={{marginBottom: '15px'}}>
            <Typography variant="h2" style={{display: 'inline',fontFamily: 'Roboto',fontWeight: '600' }} gutterBottom>
              Tabel Karyawan
            </Typography>
            <KomiteUnitListButton />
            <Box sx={{ flexGrow: 1 }} /> {/* This will push the following elements to the right */}
            <Stack direction="row" spacing={1}>
              
              <Button variant="contained" sx={{ 
                backgroundColor: '#1a2b5a', 
                borderRadius: '15px' ,
                height: '48px', /* Adjust height as needed */
                minWidth: '171px', /* Adjust width as needed */
                paddingLeft: '24px',
                fontFamily: 'Roboto',
                fontSize: '14',
               }} endIcon={<AddCircleOutlineIcon />}>
                Tambah Talent
              </Button>
            </Stack>
          </Stack>
          
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ marginRight: '80px' }}>
                <EventDetailSearchSection PlaceHolder={'Nama'} />
            </div>
            <div style={{ marginRight: '80px' }}>
                <EventDetailSearchSection PlaceHolder={'NIPPOS'} />
            </div>
            <div style={{ marginRight: '80px' }}>
                <EventDetailSearchSection PlaceHolder={'Job Level'} />
            </div>
            <div style={{ marginRight: '100px' }}>
                <EventDetailSearchSection PlaceHolder={'Komite Unit'} />
            </div>
            <div style={{ marginRight: '15px' }}>
                <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
            </div>
            <div style={{ marginRight: '0px' }}>
                <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
            </div>
          </div>
          <TalentSourceTable/>
          </Container>

        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Container style={{width:'100%', align:'center', paddingLeft:0, paddingRight:0}}>         
            <TimelineDetailEvent />
          </Container>
          
        </CustomTabPanel>
        <AddEventModal open={open} handleClose={handleClose} />

       

      </MainCard>
      <TalentQualification />
    </>
  );
};

export default DetailEvent;
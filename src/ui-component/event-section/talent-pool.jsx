import * as React from 'react';
import { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
// import SendIcon from '@mui/icons-material/Send'; // Import SendIcon

// material-ui
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
// import { gridSpacing } from 'store/constant';
// import GroupsIcon from '@mui/icons-material/Groups';
// import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
// import Header from '../../../ui-component/header/header';
// import MainLayout from 'layout/MainLayout';
import { Container } from '@mui/system';
import MainCard from '../cards/MainCard';
// import { DownloadDone, RotateRight } from '@mui/icons-material';
// import notFoundImage from '../../../assets/images/ilustration/notfound.png';
// import SecondCard from 'ui-component/cards/SecondCard';
// import SearchSection from 'layout/MainLayout/Header/SearchSection';
// import SearchSection2 from '../../../ui-component/searchsection';
// import EventBerjalan from '../../../ui-component/submenu/eventberjalan';
import TimelineDetailEvent from '../submenu/timelinedetailevent';
import AddEventModal from '../modal/TambahEvent';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import EventDetailSearchSection from '../button/EventDetailSearchSection';
import SearchResetButton from '../button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TalentPoolTable from '../tables/talentpool';
// import KomiteUnitListButton from '../button/KomiteUnitListButton';
// import { CloudDownload, Download, DownloadDoneRounded, FileDownload, FileDownloadDone, FontDownload } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary';
import LabelInfo from '../../ui-component/label/label-info';







import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TalentSourceTable from '../tables/talentsource';



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

const TalentPool = (eventid) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [poolrow, setpool] = useState([])

  const eventidactive = eventid
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/gettablebpjdays?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(datapool => {
        // Update state with API data
        setpool(datapool.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(()=>{
    console.log(filterNama);
  },[filterNama])

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

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px', // Adjust the gap between elements as needed
    paddingBottom: '24px',
  });



  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard>
        
      
        <Box paddingTop={3} paddingLeft={3} paddingRight={3} paddingBottom={3}>

          <FlexContainer>
            <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                Tabel Karyawan
            </Typography>
           
            <LabelInfo/>
        
            <div style={{ flex: '1' }}> </div>

            <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'}/>
          </FlexContainer>
          
         
          <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
            <div style={{ marginRight: '12px', width:'100%'  }}>
                  <EventDetailSearchSection filter={filterNama} setFilter={setFilterNama} PlaceHolder={'Nama'} />
            </div>
            <div style={{ marginRight: '12px', width:'100%' }}>
                <EventDetailSearchSection filter={filterNippos} setFilter={setFilterNippos} PlaceHolder={'NIPPOS'} />
            </div>
            <div style={{ marginRight: '12px', width:'100%' }}>
                <EventDetailSearchSection filter={filterJob} setFilter={setFilterJob} PlaceHolder={'Job Level'} />
            </div>
            <div style={{ marginRight: '24px', width:'100%' }}>
                <EventDetailSearchSection filter={filterStatus} setFilter={setFilterStatus} PlaceHolder={'Status'} />
            </div>
            <div style={{ marginRight: '12px' }}>
                <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
            </div>
            <div style={{ marginRight: '0px' }}>
                <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
            </div>
          </div>
         
          <TalentPoolTable filter={{nama:filterNama, nippos:filterNippos, job:filterJob, status:filterStatus}} rows={poolrow}/>
          </Box>

    
        <AddEventModal open={open} handleClose={handleClose} />


      </MainCard>
    </>
  );
};

export default TalentPool;
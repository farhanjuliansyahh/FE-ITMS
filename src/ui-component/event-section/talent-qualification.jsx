import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import EventDetailSearchSection from '../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary';
import TalentQualificationTable from '../../ui-component/tables/talentqualification';

// ==============================|| DETAIL TALENT QUALIFICATION PAGE ||============================== //

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

const TalentQualification = ({eventid}) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKomite, setFilterKomite] = useState('');
  const [qualRow, setqualRow] = useState([])

  const eventidactive = eventid

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(()=>{
    console.log(filterNama);
  },[filterNama])

  const fetchupdateskor = (eventid) => {
    return fetch('http://localhost:4000/updateskor', {
        method: 'POST', // Specify the HTTP method (POST, GET, etc.)
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })// Return the parsed JSON data
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
        });
};

const comparenilai = (eventid) => {
   return fetch('http://localhost:4000/comparenilai', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
          'Content-Type': 'application/json', // Specify the content type
      },    })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })// Return the parsed JSON data
      .catch(error => {
          console.error('Error fetching data:', error);
          throw error; // Rethrow the error to handle it elsewhere
      });
};

useEffect(() => {
  // Fetch data from API
  fetch(`http://localhost:4000/getqualification?eventtalentid=${eventidactive}`)
    .then(response => response.json())
    .then(dataqual => {
      // Update state with API data
      setqualRow(dataqual.map((row, index) => ({ ...row, id: index + 1 })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

console.log("qualrow:", qualRow);

  useEffect(() => {
    fetchupdateskor()
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    comparenilai()
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    comparenilai()
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
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

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Terkualifikasi" {...a11yProps(0)} />
            <Tab icon={<GppBadOutlinedIcon />} iconPosition="start" label="Tidak Terkualifikasi" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

            <FlexContainer>
              <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                  Tabel Karyawan
              </Typography>
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
                  <EventDetailSearchSection filter={filterKomite} setFilter={setFilterKomite} PlaceHolder={'Komite Unit'} />
              </div>
              <div style={{ marginRight: '12px' }}>
                  <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
              </div>
              <div style={{ marginRight: '0px' }}>
                  <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
              </div>
            </div>

            <TalentQualificationTable 
              rows = {qualRow}
            />

          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>

          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

            <FlexContainer>
              <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                  Tabel Karyawan
              </Typography>
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
                  <EventDetailSearchSection filter={filterKomite} setFilter={setFilterKomite} PlaceHolder={'Komite Unit'} />
              </div>
              <div style={{ marginRight: '12px' }}>
                  <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
              </div>
              <div style={{ marginRight: '0px' }}>
                  <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
              </div>
            </div>

            <TalentQualificationTable 
              rows = {qualRow}
            />

            </Box>
          
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default TalentQualification;
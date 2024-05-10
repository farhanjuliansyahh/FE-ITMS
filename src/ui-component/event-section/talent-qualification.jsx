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

const TalentQualification = ({eventid, kodekomite}) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKomite, setFilterKomite] = useState('');
  const [qualRow, setqualRow] = useState([])
  const [quallolosRow, setquallolosRow] = useState([])
  const [kkm , setkkm] = useState([])

  const eventidactive = parseInt(eventid)
  const tipekomite = kodekomite

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
   return fetch(`http://localhost:4000/comparenilai?eventtalentid=${eventidactive}`, {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
          'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({
        komite_talent : tipekomite
      }),    })
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

const fetchnilaiminimal = (eventid) => {
  return fetch('http://localhost:4000/getkkm', {
     method: 'GET', // Specify the HTTP method (POST, GET, etc.)
     headers: {
         'Content-Type': 'application/json', // Specify the content type
     }
    })
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
  fetch(`http://localhost:4000/getquallolos?eventtalentid=${eventidactive}`, {
    method: 'GET', // GET method is used by default
    // Optionally, you can include headers or other configurations here
  })
  .then(response => response.json())
  .then(dataqual => {
    // Update state with API data
    setquallolosRow(dataqual.map((row, index) => ({ ...row, id: index + 1 })));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);



useEffect(() => {
  fetchupdateskor()
  .catch(error => {
    console.error('Error fetching data:', error);
    setLoading(false);
  });
}, []);

useEffect(() => {
  // Fetch data from API
  fetch(`http://localhost:4000/getqualificationtidak?eventtalentid=${eventidactive}`)
    .then(response => response.json())
    .then(dataqual => {
      // Update state with API data
      setqualRow(dataqual.map((row, index) => ({ ...row, id: index + 1 })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
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
      // Fetch data when component mounts
      fetchnilaiminimal()
        .then(data => {
          setkkm(data); // Set the fetched data to the kkm state variable
        })
        .catch(error => {
          // Handle error
            console.error('Error fetching data:', error);
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
  
  const komiteToPenilaianMap = {
    1: { comp: 1, pms: 5, akhlak: 6, laminimal: 7 },
    2: { comp: 2, pms: 5, akhlak: 6, laminimal: 7 },
    3: { comp: 4, pms: 5, akhlak: 6, laminimal: 7 }
};

const getMinimalScore = (kodekomite, id_kriteria_penilaian) => {
  const filteredData = kkm.filter(item => item.id_komite_talent === kodekomite && item.id_kriteria_penilaian === id_kriteria_penilaian);
  if (filteredData.length > 0) {
      return filteredData[0].skor_minimal;
  }
  return null; // Return null if no match found
};

    const minimalScores = komiteToPenilaianMap[kodekomite];
    const compminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.comp);
    const pmsminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.pms);
    const akhlakminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.akhlak);
    const laminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.laminimal);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';
    
    console.log("tab", value);
    // Determine which dataset to use based on the active tab
    if (value === 0) {
      dataToDownload = quallolosRow;
      filename = `Talent_Qualification_Lulus_${eventid}.csv`;
    } else if (value === 1) {
      dataToDownload = qualRow;
      filename = `Talent_Qualification_TidakLulus_${eventid}.csv`;
    }
  
    // Create a CSV header with column names
    const headers = Object.keys(dataToDownload[0]);
    const idIndex = headers.indexOf('id');
    if (idIndex !== -1) {
      headers.splice(idIndex, 1); // Remove 'id' from headers
      headers.unshift('id'); // Insert 'id' at the beginning
    }
    const headerRow = headers.join(',');
  
    // Convert data to CSV format
    const csvContent = "data:text/csv;charset=utf-8," + headerRow + '\n' +
      dataToDownload.map(row => headers.map(header => row[header]).join(',')).join('\n');
  
    // Create a temporary anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
  
    // Trigger the download
    link.click();
  
    // Clean up
    document.body.removeChild(link);
  };
  
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
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>
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
            minimumCompeten5cyQualified = {compminimal}
            minimumPmsQualified = {pmsminimal}
            minimumAkhlakQualified = {akhlakminimal}
            minimumLearningAgilityQualified = {laminimal} 
              rows = {quallolosRow}
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
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>
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
            minimumCompeten5cyQualified = {compminimal}
            minimumPmsQualified = {pmsminimal}
            minimumAkhlakQualified = {akhlakminimal}
            minimumLearningAgilityQualified = {laminimal}
              rows = {qualRow}
            />

            </Box>
          
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default TalentQualification;
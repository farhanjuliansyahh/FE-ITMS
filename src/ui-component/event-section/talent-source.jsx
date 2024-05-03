import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../cards/MainCard';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import EventDetailSearchSection from '../button/EventDetailSearchSection';
import SearchResetButton from '../button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KomiteUnitListButton from '../button/KomiteUnitListButton';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TalentSourceTable from '../tables/talentsource';
import AdminSearchSectionGroup from '../button/AdminSearchButtonGroup';

// ==============================|| DETAIL TALENT SOURCE PAGE ||============================== //

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

const TalentSource = ({eventid}) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKomite, setFilterKomite] = useState('');
  const [rowstrue, setRowstrue] = useState([]);
  const [rowsfalse, setRowsfalse] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };
  console.log("selected row", selectedRows);

  const eventidactive = eventid

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getkandidatfalse?eventtalentid=${eventid}`)
      .then(response => response.json())
      .then(datafalse => {
        // Update state with API data
        setRowsfalse(datafalse.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getkandidattrue?eventtalentid=${eventid}`)
      .then(response => response.json())
      .then(datatrue => {
        // Update state with API data
        setRowstrue(datatrue.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';
    
    console.log("tab", value);
    // Determine which dataset to use based on the active tab
    if (value === 0) {
      dataToDownload = rowsfalse;
      filename = `Talent_Source_TidakTerdaftar_${eventid}.csv`;
    } else if (value === 1) {
      dataToDownload = rowstrue;
      filename = `Talent_Source_Terdaftar_${eventid}.csv`;
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


  const handleTambahTalent = () => {
    // Find the rows corresponding to the selected IDs
    const selectedNippos = selectedRows.map(id => {
      const selectedRow = rowsfalse.find(row => row.id === id);
      return selectedRow ? selectedRow.Nippos : null; // Return Nippos if row found, null otherwise
    });
  
    // Remove null values (in case some IDs didn't match any rows)
    const validNippos = selectedNippos.filter(nippos => nippos !== null);
    console.log("validnippos",validNippos);
  
    // Send update API request to change something in the database
    fetch(`http://localhost:4000/updatestatussource?eventtalentid=${eventid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nippos: validNippos
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add talent');
      }
      // Reset selectedRows state to clear selected checkboxes
      setSelectedRows([]);
      // Refetch data after successful addition
      return Promise.all([
        fetch(`http://localhost:4000/getkandidatfalse?eventtalentid=${eventid}`),
        fetch(`http://localhost:4000/getkandidattrue?eventtalentid=${eventid}`)
      ]);
    })
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([datafalse, datatrue]) => {
      setRowsfalse(datafalse.map((row, index) => ({ ...row, id: index + 1 })));
      setRowstrue(datatrue.map((row, index) => ({ ...row, id: index + 1 })));
    })
    .catch(error => {
      console.error('Error adding talent:', error);
    });
  };


  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard>
        
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<PersonOffOutlinedIcon />} iconPosition="start" label="Belum Terdaftar" {...a11yProps(0)} />
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Terdaftar" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

            <FlexContainer>
              <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                  Tabel Karyawan
              </Typography>
              <KomiteUnitListButton eventid={eventidactive} />

              <div style={{ flex: '1' }}> </div>


            <ButtonPrimary Color="#ffffff" icon={AddCircleOutlineIcon} LabelName={'Tambah Talent'} onClick={handleTambahTalent}/>
            <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>
          </FlexContainer>
          
         
          {/* <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
            <AdminSearchSectionGroup/>
          </div> */}

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
         
            <TalentSourceTable checkboxSelection={true} 
            filter={{nama:filterNama, nippos:filterNippos, job:filterJob, komite:filterKomite}} 
            rows={rowsfalse}
            selectedRows={selectedRows} onSelectedRowsChange={handleSelectedRowsChange} />
            {/* // onCheckboxChange={handleCheckboxChange}/> */}
          </Box>

        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

            <FlexContainer>
              <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                  Tabel Karyawan
              </Typography>
              <KomiteUnitListButton eventid={eventidactive} />

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

            <TalentSourceTable checkboxSelection={false} filter={{nama:filterNama, nippos:filterNippos, job:filterJob, komite:filterKomite}} rows ={rowstrue}/>
          </Box>
          
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default TalentSource;
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AddCircleOutline, GppGoodOutlined, PersonOffOutlined, RestartAlt, RestartAltOutlined, Search } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';

import MainCard from '../cards/MainCard';
import EventDetailSearchSection from '../button/EventDetailSearchSection';
import SearchResetButton from '../button/SearchResetButton';
import KomiteUnitListButton from '../button/KomiteUnitListButton';
import ButtonPrimary from '../button/ButtonPrimary';
import ButtonErrorOutlined from '../button/ButtonErrorOutlined';
import TalentSourceTable from '../tables/talentsource';
import CustomSearch from '../searchsection/custom-search';

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
  // console.log("selected row", selectedRows);

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

  // BELUM TERDAFTAR
  const listNamaFalse = [...new Set(rowsfalse.map(row => row.Nama))]
  const listNipposFalse = [...new Set(rowsfalse.map(row => row.Nippos))];
  const listJobLevelFalse = [...new Set(rowsfalse.map(row => row['Job Level']))];
  const listKomiteUnitFalse = [...new Set(rowsfalse.map(row => row['Komite Unit']))];

  const [selectedNamaFalse, setSelectedNamaFalse] = useState(null);
  const [selectedNipposFalse, setSelectedNipposFalse] = useState(null);
  const [selectedJobLevelFalse, setSelectedJobLevelFalse] = useState(null);
  const [selectedKomiteUnitFalse, setSelectedKomiteUnitFalse] = useState(null);
  
  const resetNamaInputFalse = () => {
    setSelectedNamaFalse('');
  };

  const resetNipposInputFalse = () => {
    setSelectedNipposFalse('');
  };

  const resetJobLevelInputFalse = () => {
    setSelectedJobLevelFalse('');
  };

  const resetKomiteUnitInputFalse = () => {
    setSelectedKomiteUnitFalse('');
  };

  const handleResetSearchFalse = () => {
    resetNamaInputFalse();
    resetNipposInputFalse();
    resetJobLevelInputFalse();
    resetKomiteUnitInputFalse();
  };

  // TERDAFTAR
  const listNamaTrue = [...new Set(rowstrue.map(row => row.Nama))]
  const listNipposTrue = [...new Set(rowstrue.map(row => row.Nippos))];
  const listJobLevelTrue = [...new Set(rowstrue.map(row => row['Job Level']))];
  const listKomiteUnitTrue = [...new Set(rowstrue.map(row => row['Komite Unit']))];

  const [selectedNamaTrue, setSelectedNamaTrue] = useState(null);
  const [selectedNipposTrue, setSelectedNipposTrue] = useState(null);
  const [selectedJobLevelTrue, setSelectedJobLevelTrue] = useState(null);
  const [selectedKomiteUnitTrue, setSelectedKomiteUnitTrue] = useState(null);

  const resetNamaInputTrue = () => {
    setSelectedNamaTrue('');
  };

  const resetNipposInputTrue = () => {
    setSelectedNipposTrue('');
  };

  const resetJobLevelInputTrue = () => {
    setSelectedJobLevelTrue('');
  };

  const resetKomiteUnitInputTrue = () => {
    setSelectedKomiteUnitTrue('');
  };

  const handleResetSearchTrue = () => {
    resetNamaInputTrue();
    resetNipposInputTrue();
    resetJobLevelInputTrue();
    resetKomiteUnitInputTrue();
  };

  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<PersonOffOutlined />} iconPosition="start" label="Belum Terdaftar" {...a11yProps(0)} />
            <Tab icon={<GppGoodOutlined />} iconPosition="start" label="Terdaftar" {...a11yProps(1)} />
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

              <ButtonPrimary Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Talent'} onClick={handleTambahTalent}/>
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>
            </FlexContainer>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNamaFalse} label={'Nama'} onSearch={setSelectedNamaFalse} value={selectedNamaFalse} resetInput={resetNamaInputFalse} />
                <CustomSearch field={listNipposFalse} label={'Nippos'} onSearch={setSelectedNipposFalse} value={selectedNipposFalse} resetInput={resetNipposInputFalse} />
                <CustomSearch field={listJobLevelFalse} label={'Job Level'} onSearch={setSelectedJobLevelFalse} value={selectedJobLevelFalse} resetInput={resetJobLevelInputFalse} />
                <CustomSearch field={listKomiteUnitFalse} label={'Komite Unit'} onSearch={setSelectedKomiteUnitFalse} value={selectedKomiteUnitFalse} resetInput={resetKomiteUnitInputFalse} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchFalse} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>

            <TalentSourceTable 
                checkboxSelection={true} 
                filter={{nama:filterNama, nippos:filterNippos, job:filterJob, komite:filterKomite}} 
                rows={rowsfalse}
                selectedRows={selectedRows} 
                onSelectedRowsChange={handleSelectedRowsChange} 
                searchNama={selectedNamaFalse} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
                searchNippos={selectedNipposFalse}
                searchJobLevel={selectedJobLevelFalse}
                searchKomiteUnit={selectedKomiteUnitFalse}
            />
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNamaTrue} label={'Nama'} onSearch={setSelectedNamaTrue} value={selectedNamaTrue} resetInput={resetNamaInputTrue} />
                <CustomSearch field={listNipposTrue} label={'Nippos'} onSearch={setSelectedNipposTrue} value={selectedNipposTrue} resetInput={resetNipposInputTrue} />
                <CustomSearch field={listJobLevelTrue} label={'Job Level'} onSearch={setSelectedJobLevelTrue} value={selectedJobLevelTrue} resetInput={resetJobLevelInputTrue} />
                <CustomSearch field={listKomiteUnitTrue} label={'Komite Unit'} onSearch={setSelectedKomiteUnitTrue} value={selectedKomiteUnitTrue} resetInput={resetKomiteUnitInputTrue} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>

            <TalentSourceTable 
                checkboxSelection={false} 
                filter={{nama:filterNama, nippos:filterNippos, job:filterJob, komite:filterKomite}} 
                rows ={rowstrue}
                searchNama={selectedNamaTrue} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
                searchNippos={selectedNipposTrue}
                searchJobLevel={selectedJobLevelTrue}
                searchKomiteUnit={selectedKomiteUnitTrue}
            />
          </Box>
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default TalentSource;
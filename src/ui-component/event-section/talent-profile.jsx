import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import EventDetailSearchSection from '../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { RestartAltOutlined } from '@mui/icons-material';

import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary';
import AdminSearchSectionGroup from '../../ui-component/button/AdminSearchButtonGroup';
import TalentProfileTable from '../../ui-component/tables/talentprofile';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import KonfirmasiSubmitTalentProfile from '../../ui-component/modal/konfirmasi-submit-talent-profile';
import ButtonOptional from '../../ui-component/button/ButtonOptional';
import CustomSearch from '../../ui-component/searchsection/custom-search';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined';

// ==============================|| DETAIL TALENT PROFILE PAGE ||============================== //

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

const TalentProfile = ({eventid}) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [rowslengkap, setrowslengkap] = useState([]);
  const [rowsbelum, setrowsbelum] = useState([]);
  const [filterKomite, setFilterKomite] = useState('');
  const [openSubmit, setOpenSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const activeEvent = eventid;
  const handleOpenSubmit = () => {
    setOpenSubmit(true);
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
  };

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getbelumlengkap?eventtalentid=${eventid}`)
      .then(response => response.json())
      .then(databelum => {
        // Update state with API data
        setrowsbelum(databelum.map((row, index) => ({ ...row, id: index + 1 })));
        if (databelum.length === 0) {
          // Value is null, disable button
          setIsDisabled(true);
        } else {
          // Value is not null, enable button
          setIsDisabled(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("belum lengkap",rowsbelum.length);

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getlengkap?eventtalentid=${eventid}`)
      .then(response => response.json())
      .then(datalengkap => {
        // Update state with API data
        setrowslengkap(datalengkap.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';
    
    console.log("tab", value);
    // Determine which dataset to use based on the active tab
    if (value === 0) {
      dataToDownload = rowsbelum;
      filename = `Talent_Profile_TidakLengkap_${eventid}.csv`;
    } else if (value === 1) {
      dataToDownload = rowslengkap;
      filename = `Talent_Source_Lengkap_${eventid}.csv`;
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

  
  // BELUM LENGKAP
  const listNamaFalse = [...new Set(rowsbelum.map(row => row.Nama))]
  const listNipposFalse = [...new Set(rowsbelum.map(row => row.Nippos))];
  const listJobLevelFalse = [...new Set(rowsbelum.map(row => row['Job Level']))];
  const listKomiteUnitFalse = [...new Set(rowsbelum.map(row => row['Komite Unit']))];

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

  // LENGKAP
  const listNamaTrue = [...new Set(rowslengkap.map(row => row.Nama))]
  const listNipposTrue = [...new Set(rowslengkap.map(row => row.Nippos))];
  const listJobLevelTrue = [...new Set(rowslengkap.map(row => row['Job Level']))];
  const listKomiteUnitTrue = [...new Set(rowslengkap.map(row => row['Komite Unit']))];

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
            <Tab icon={<PersonOffOutlinedIcon />} iconPosition="start" label="Belum Lengkap" {...a11yProps(0)} />
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Lengkap" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

          <FlexContainer>
            <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                Tabel Karyawan
            </Typography>
            <div style={{ flex: '1' }}> </div>
            <ButtonOptional icon={DoneAllOutlinedIcon} LabelName={'Submit Semua'} onClick={handleOpenSubmit} disabled={isDisabled}/>
            <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>
          </FlexContainer>
               
          {/* <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
            <AdminSearchSectionGroup/>
          </div> */}

            {/* <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
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
            </div> */}
         
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNamaFalse} label={'Nama'} onSearch={setSelectedNamaFalse} value={selectedNamaFalse} resetInput={resetNamaInputFalse} />
                <CustomSearch field={listNipposFalse} label={'Nippos'} onSearch={setSelectedNipposFalse} value={selectedNipposFalse} resetInput={resetNipposInputFalse} />
                <CustomSearch field={listJobLevelFalse} label={'Job Level'} onSearch={setSelectedJobLevelFalse} value={selectedJobLevelFalse} resetInput={resetJobLevelInputFalse} />
                <CustomSearch field={listKomiteUnitFalse} label={'Komite Unit'} onSearch={setSelectedKomiteUnitFalse} value={selectedKomiteUnitFalse} resetInput={resetKomiteUnitInputFalse} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchFalse} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>

            <TalentProfileTable 
              commitmentLetterValue={'Belum Submit'} 
              paktaIntegritasValue={'Belum Submit'}
              filter={{nama:filterNama, nippos:filterNippos, job:filterJob, komite:filterKomite}}
              rows={rowsbelum}
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

            <TalentProfileTable 
              commitmentLetterValue={'Sudah Submit'} 
              paktaIntegritasValue={'Sudah Submit'}
              filter={{nama:filterNama, nippos:filterNippos, job:filterJob, komite:filterKomite}}
              rows={rowslengkap}
              searchNama={selectedNamaTrue} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
              searchNippos={selectedNipposTrue}
              searchJobLevel={selectedJobLevelTrue}
              searchKomiteUnit={selectedKomiteUnitTrue}
            />
          </Box>          
        </CustomTabPanel>

        <KonfirmasiSubmitTalentProfile
          activeEvent= {activeEvent}
          open={openSubmit}
          handleClose={() => setOpenSubmit(false)}
        />

      </MainCard>
    </>
  );
};

export default TalentProfile;
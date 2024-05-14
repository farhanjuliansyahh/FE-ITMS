import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../cards/MainCard';
import AddEventModal from '../modal/TambahEvent';
import TalentPoolTable from '../tables/talentpool';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary';
import LabelInfo from '../../ui-component/label/label-info';
import { RestartAltOutlined } from '@mui/icons-material';
import CustomSearch from '../searchsection/custom-search';
import ButtonErrorOutlined from '../button/ButtonErrorOutlined';


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

const TalentPool = ({eventid}) => {
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
    fetch(`http://localhost:4000/gettalentpool?eventtalentid=${eventidactive}`)
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

  // TALENT POOL
  const listNamaTrue = [...new Set(poolrow.map(row => row.Nama))]
  const listNipposTrue = [...new Set(poolrow.map(row => row.Nippos))];
  const listJobLevelTrue = [...new Set(poolrow.map(row => row['Job Level']))];
  const listStatusTrue = [...new Set(poolrow.map(row => row['Status']))];

  const [selectedNamaTrue, setSelectedNamaTrue] = useState(null);
  const [selectedNipposTrue, setSelectedNipposTrue] = useState(null);
  const [selectedJobLevelTrue, setSelectedJobLevelTrue] = useState(null);
  const [selectedStatusTrue, setSelectedStatusTrue] = useState(null);

  const resetNamaInputTrue = () => {
    setSelectedNamaTrue('');
  };

  const resetNipposInputTrue = () => {
    setSelectedNipposTrue('');
  };

  const resetJobLevelInputTrue = () => {
    setSelectedJobLevelTrue('');
  };

  const resetStatusInputTrue = () => {
    setSelectedStatusTrue('');
  };

  const handleResetSearchTrue = () => {
    resetNamaInputTrue();
    resetNipposInputTrue();
    resetJobLevelInputTrue();
    resetStatusInputTrue();
  };
  const poolLength = poolrow.length


  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard>
        
      
        <Box paddingTop={3} paddingLeft={3} paddingRight={3} paddingBottom={3}>

          <FlexContainer>
            <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                Tabel Karyawan
            </Typography>
           
            <LabelInfo length={poolLength}/>
        
            <div style={{ flex: '1' }}> </div>

            <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'}/>
          </FlexContainer>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNamaTrue} label={'Nama'} onSearch={setSelectedNamaTrue} value={selectedNamaTrue} resetInput={resetNamaInputTrue} />
                <CustomSearch field={listNipposTrue} label={'Nippos'} onSearch={setSelectedNipposTrue} value={selectedNipposTrue} resetInput={resetNipposInputTrue} />
                <CustomSearch field={listJobLevelTrue} label={'Job Level'} onSearch={setSelectedJobLevelTrue} value={selectedJobLevelTrue} resetInput={resetJobLevelInputTrue} />
                <CustomSearch field={listStatusTrue} label={'Status'} onSearch={setSelectedStatusTrue} value={selectedStatusTrue} resetInput={resetStatusInputTrue} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>
         
          <TalentPoolTable 
              filter={{nama:filterNama, nippos:filterNippos, job:filterJob, status:filterStatus}} 
              rows={poolrow}
              searchNama={selectedNamaTrue} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
              searchNippos={selectedNipposTrue}
              searchJobLevel={selectedJobLevelTrue}
              searchStatus={selectedStatusTrue}
            />
          </Box>

    
        <AddEventModal open={open} handleClose={handleClose} />


      </MainCard>
    </>
  );
};

export default TalentPool;
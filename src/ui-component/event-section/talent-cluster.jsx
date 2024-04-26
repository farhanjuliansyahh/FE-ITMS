import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard';
import EventDetailSearchSection from '../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary';
import MatrixNineBox from '../../ui-component/submenu/matrixninebox';
import TalentClusterTable from '../../ui-component/tables/talentcluster';
// ==============================|| TALENT CLUSTER PAGE ||============================== //

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

const TalentCluster = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKategoriMatrix, setFilterKategoriMatrix] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(()=>{
    console.log(filterNama);
  },[filterNama])

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
    gap: '16px', 
    paddingBottom: '24px',
  });

  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard>

        <MatrixNineBox/>

        <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>

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
                <EventDetailSearchSection filter={filterKategoriMatrix} setFilter={setFilterKategoriMatrix} PlaceHolder={'Kategori Matrix'} />
            </div>
            <div style={{ marginRight: '12px' }}>
                <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
            </div>
            <div style={{ marginRight: '0px' }}>
                <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
            </div>
          </div>
         
          <TalentClusterTable filter={{nama:filterNama, nippos:filterNippos, job:filterJob, KategoriMatrix:filterKategoriMatrix}}/>
          </Box>

      </MainCard>
    </>
  );
};

export default TalentCluster;
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../cards/MainCard.jsx';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import EventDetailSearchSection from '../button/EventDetailSearchSection.jsx';
import SearchResetButton from '../button/SearchResetButton.jsx';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KomiteUnitListButton from '../button/KomiteUnitListButton.jsx';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary.jsx';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TalentSourceTable from '../tables/talentsource.jsx';
import AdminSearchSectionGroup from '../button/AdminSearchButtonGroup.jsx';
import KomiteUnitTable from '../../ui-component/tables/komiteunittable.jsx';
import KonfirmasiTalentSource from '../../ui-component/modal/konfirmasi-talentsource.jsx';
// ==============================|| DETAIL TALENT SOURCE PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const [openSource, setOpenSource] = useState(false);

const handleOpenSource = () => {
    if (checked) {
        setOpenSource(true);
    }
};

const handleCloseSource = () => {
    setOpenSource(false);
};

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

const TalentKomiteUnit = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKomite, setFilterKomite] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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
        
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<PersonOffOutlinedIcon />} iconPosition="start" label="Belum Terdaftar" {...a11yProps(0)} />
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Terdaftar" {...a11yProps(1)} />
          </Tabs>
        </Box> */}

        <CustomTabPanel value={value} index={0}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

            <FlexContainer>
              <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                  Tabel Karyawan
              </Typography>
              <KomiteUnitListButton />

              <div style={{ flex: '1' }}> </div>


            <ButtonPrimary Color="#ffffff" icon={AddCircleOutlineIcon} LabelName={'Tambah Karyawan'} onClick={handleOpen}/>
    
                
            {/* <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'}/> */}
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
    
              <div style={{ marginRight: '12px' }}>
                  <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
              </div>
              <div style={{ marginRight: '0px' }}>
                  <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
              </div>
            </div>
         
            <KomiteUnitTable checkboxSelection={true}/>
            </Box>

            <KonfirmasiTalentSource open={open} handleClose={handleClose}/>

        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default TalentKomiteUnit;
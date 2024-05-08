import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { DownloadDone, RotateRight } from '@mui/icons-material';
import notFoundImage from '../../../assets/images/ilustration/notfound.png';

import MainCard from '../../../ui-component/cards/MainCard';
import SearchSection2 from '../../../ui-component/searchsection';  
import AksesEvent from '../../../ui-component/submenu/aksesevent';
import BasicPagination from '../../../ui-component/button/pagination';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';

// ==============================|| EVENT KETUA KOMITE TALENT PAGE ||============================== //

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

const EventKetuaKomiteTalent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard title="Daftar Event"  secondary={
          <Stack direction="row" spacing={2}>
            <SearchSection2 /> 
          </Stack>
        }>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h5"></Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<RotateRight />} iconPosition="start" label="Berjalan" {...a11yProps(0)} />
            <Tab icon={<DownloadDone />} iconPosition="start" label="Selesai" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0} style={{paddingLeft:24, paddingRight:24, paddingBottom:24}}>     
            <AksesEvent ButtonName={'Detail Event'} namaEvent={'Talent Source'} pathDetailEvent={'./talent-cluster'}/>
            <Box style={{paddingTop:'24px'}}> 
              <BasicPagination />
            </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px',}}>
            <img src={notFoundImage} alt="Deskripsi gambar" />
            <Typography variant='h4' marginTop={3}> Tidak Ada Data </Typography>
          </Box>          
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default EventKetuaKomiteTalent;
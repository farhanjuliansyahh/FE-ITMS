import * as React from 'react';
import { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Typography, Container } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import HorizontalLinearStepper from '../../../ui-component/submenu/eventberjalan';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TalentSource from '../../../ui-component/tables/talentsource';
// import AddEventModal from '../../../ui-component/modal/TambahEvent';

const DetailEvent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MainCard>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h5"></Typography>
        </Box>

        <Container style={{ padding : 0}}>
          <HorizontalLinearStepper />
          <Box sx={{ border: '1px solid #E0E0E0', padding: '20px',  borderRadius:'12px', mt: 2 }}>
            <Typography variant="h2" style={{marginBottom: '15px'}} gutterBottom>Tabel Karyawan</Typography>
            <Box>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                 <div style={{ marginRight: '80px' }}>
                     <EventDetailSearchSection PlaceHolder={'Nama'} />
                 </div>
                 <div style={{ marginRight: '80px' }}>
                     <EventDetailSearchSection PlaceHolder={'NIPPOS'} />
                 </div>
                 <div style={{ marginRight: '80px' }}>
                     <EventDetailSearchSection PlaceHolder={'Job Level'} />
                 </div>
                 <div style={{ marginRight: '100px' }}>
                     <EventDetailSearchSection PlaceHolder={'Komite Unit'} />
                 </div>
                 <div style={{ marginRight: '15px' }}>
                     <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
                 </div>
                 <div style={{ marginRight: '0px' }}>
                     <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
                 </div>
               </div>
            </Box>
            <TalentSource/>
          </Box>
        </Container>
      </MainCard>
    </>
  );
};

export default DetailEvent;


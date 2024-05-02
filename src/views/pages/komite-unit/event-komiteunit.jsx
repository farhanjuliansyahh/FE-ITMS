import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Typography, Stack, Container } from '@mui/material';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RotateRight from '@mui/icons-material/RotateRight';
import DownloadDone from '@mui/icons-material/DownloadDone';
import MainCard from '../../../ui-component/cards/MainCard';
import SearchSection2 from '../../../ui-component/searchsection';
import AksesEvent from '../../../ui-component/submenu/aksesevent';
import BasicPagination from '../../../ui-component/button/pagination';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';
import AddEventModal from '../../../ui-component/modal/TambahEvent';

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

const EventKomiteTalent = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MainCard title="Daftar Event" secondary={
        <Stack direction="row" spacing={2}>
          <SearchSection2 />
        </Stack>
      }>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<RotateRight />} iconPosition="start" label="Berjalan" {...a11yProps(0)} />
            <Tab icon={<DownloadDone />} iconPosition="start" label="Selesai" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <AksesEvent ButtonName={'Akses Event'} namaEvent={'Event Komite Unit'} pathDetailEvent={'./daftar-eventkomiteunit'} />
          <BasicPagination />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
        </CustomTabPanel>

        <AddEventModal open={open} handleClose={handleClose} />
      </MainCard>
    </>
  );
};

export default EventKomiteTalent;

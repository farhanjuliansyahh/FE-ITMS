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
import notFoundImage from '../../../assets/images/ilustration/notfound.png';

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
  const [komiteunitevent, setkomiteunitevent] = useState([])

  const fetcheventkomiteunit = () => {
    const nippos= "971332058" //ganti sama hasil fetchingan nippos yang login 
    return fetch(`http://localhost:4000/getkomiteunitevent?eventtalentid=${nippos}`) // Replace with your actual endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data; // Return the parsed JSON data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

useEffect(() => {
    fetcheventkomiteunit()
      .then(data => {
        setkomiteunitevent(data.event);
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MainCard title="Daftar Event" secondary={
        <Stack direction="row" spacing={0}>
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
  <Box sx={{paddingRight: '24px', paddingLeft: '24px', paddingBottom: '24px'}}>
    {komiteunitevent
      .filter(event => event.evenstatus_id !== 8) // Filter events with status not equal to 8
      .map((event, index) => (
        <Box key={index} sx={{paddingBottom: '24px'}}>
          <AksesEvent
            ButtonName={'Akses Event'}
            namaEvent={event.nama_event}
            key={event.id}
            id={event.id}
            nama_event={event.nama_event}
            deskripsi={event.deskripsi}
            tipe_komite_talent={event.tipekomite.tipe_komite_talent}
            kode_rumpun={event.kode_rumpun_jabatan}
            nama_rumpun_jabatan={event.rumpun.nama_rumpun_jabatan}
            kuota={event.kuota}
            tanggal_mulai={event.tanggal_mulai}
            tanggal_selesai={event.tanggal_selesai}
            status={event.evenstatus_id}
            pathDetailEvent={`./daftar-eventkomiteunit/${event.id}`}
          />
        </Box>
      ))}
    <BasicPagination />
  </Box>
</CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
  <Box sx={{paddingRight: '24px', paddingLeft: '24px', paddingBottom: '24px'}}>
    {komiteunitevent
      .filter(event => event.evenstatus_id === 8) // Filter events with status equal to 8
      .map((event, index) => (
        <Box key={index} sx={{paddingBottom: '24px'}}>
          <AksesEvent
            ButtonName={'Akses Event'}
            namaEvent={event.nama_event}
            key={event.id}
            id={event.id}
            nama_event={event.nama_event}
            deskripsi={event.deskripsi}
            tipe_komite_talent={event.tipekomite.tipe_komite_talent}
            kode_rumpun={event.kode_rumpun_jabatan}
            nama_rumpun_jabatan={event.rumpun.nama_rumpun_jabatan}
            kuota={event.kuota}
            tanggal_mulai={event.tanggal_mulai}
            tanggal_selesai={event.tanggal_selesai}
            status={event.evenstatus_id}
          />
        </Box>
      ))}
    <BasicPagination />
  </Box>
</CustomTabPanel>

        <AddEventModal open={open} handleClose={handleClose} />
      </MainCard>
    </>
  );
};

export default EventKomiteTalent;

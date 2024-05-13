import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { DownloadDone, RotateRight } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard';
import SearchSection2 from '../../../ui-component/searchsection';
import AksesEvent from '../../../ui-component/submenu/aksesevent';
import BasicPagination from '../../../ui-component/button/pagination';
import notFoundImage from '../../../assets/images/ilustration/notfound.png';
import CustomSearch from '../../../ui-component/searchsection/custom-search';

// ==============================|| DAFTAR EVENT KOMITE UNIT ||============================== //

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

const DaftarEventKomiteUnit = () => {
  const [value, setValue] = useState(0);
  const [komiteunitevent, setkomiteunitevent] = useState([])
  const nippos = sessionStorage.getItem('nippos');

  const fetcheventkomiteunit = () => {
    return fetch(`http://localhost:4000/getkomiteunitevent?nippos=${nippos}`) // Replace with your actual endpoint 
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

  const uniqueNamaEvents = [...new Set(komiteunitevent.map(event => event.nama_event))];
  const [selectedNamaEvent, setSelectedNamaEvent] = useState(null);

  const filteredEvents = komiteunitevent.filter((event) => {
    const namaMatch = !selectedNamaEvent || (event.nama_event && event.nama_event.toLowerCase().includes(selectedNamaEvent.toLowerCase())); // Add null check
    return (!selectedNamaEvent || namaMatch);
  });

  return (
    <>
      <MainCard title="Daftar Event" secondary={
        <Stack direction="row" spacing={0}>
          <CustomSearch 
            field={uniqueNamaEvents} 
            label={' Cari Nama Event'} 
            onSearch={setSelectedNamaEvent} 
            value={selectedNamaEvent} 
          />
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
            {filteredEvents
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
                  <BasicPagination />
                </Box>
                
              ))}
              {filteredEvents.filter(event => event.status !== 8).length === 0 && (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px' }}>
                  <img src={notFoundImage} alt="Deskripsi gambar" />
                  <Typography variant='h4' marginTop={3}>Tidak Ada Data</Typography>
                </Box>
              )}
            
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box sx={{paddingRight: '24px', paddingLeft: '24px', paddingBottom: '24px'}}>
            {filteredEvents
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
                  <BasicPagination />
                </Box>
              ))}
              {filteredEvents.filter(event => event.status !== 8).length === 0 && (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px' }}>
                  <img src={notFoundImage} alt="Deskripsi gambar" />
                  <Typography variant='h4' marginTop={3}>Tidak Ada Data</Typography>
                </Box>
              )}

          </Box>
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default DaftarEventKomiteUnit;

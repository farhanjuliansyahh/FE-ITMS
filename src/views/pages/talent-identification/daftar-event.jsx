import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AddCircleOutline, DownloadDone, RotateRight } from '@mui/icons-material';
import notFoundImage from '../../../assets/images/ilustration/notfound.png';

import MainCard from '../../../ui-component/cards/MainCard';
import SearchSection2 from '../../../ui-component/searchsection';
import EventBerjalan from '../../../ui-component/submenu/eventberjalan';
import AddEventModal from '../../../ui-component/modal/TambahEvent';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import CustomSearch from '../../../ui-component/searchsection/custom-search';

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

const fetchDataFromDatabase = () => {
  return fetch('http://localhost:4000/getallevent') // endpoint
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

const DaftarEvent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [eventData, setEventData] = useState([]);
  
  useEffect(() => {
    fetchDataFromDatabase()
      .then(data => {
        setEventData(data.event);
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
  // console.log("asdasd", eventData);

  const uniqueNamaEvents = [...new Set(eventData.map(event => event.nama_event))];
  const [selectedNamaEvent, setSelectedNamaEvent] = useState(null);

  const filteredEvents = eventData.filter((event) => {
    const namaMatch = !selectedNamaEvent || (event.nama_event && event.nama_event.toLowerCase().includes(selectedNamaEvent.toLowerCase())); // Add null check
    return (!selectedNamaEvent || namaMatch);
  });

  return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard title="Daftar Event"  secondary={
        <Stack direction="row" spacing={2} >
          <CustomSearch 
              field={uniqueNamaEvents} 
              label={'Cari Nama Event'} 
              onSearch={setSelectedNamaEvent} 
              value={selectedNamaEvent}  />
          <ButtonPrimary Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Event'} onClick={handleOpen}/>
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

        <CustomTabPanel value={value} index={0} style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box>
              {filteredEvents
                .filter(event => event.evenstatus_id !== 8) // Filter events excluding status 8
                .map(event => (
                  <EventBerjalan 
                    key={event.id}
                    id={event.id}
                    nama_event={event.nama_event}
                    deskripsi={event.deskripsi}
                    ketua = {event.nippos_ketua_komite}
                    tipe_komite_talent={event.tipekomite.tipe_komite_talent}
                    kode_rumpun={event.kode_rumpun_jabatan}
                    nama_rumpun_jabatan={event.rumpun.nama_rumpun_jabatan}
                    kuota={event.kuota}
                    tanggal_mulai={event.tanggal_mulai}
                    tanggal_selesai={event.tanggal_selesai}
                    status={event.evenstatus_id}
                  />
                ))}
              {filteredEvents.filter(event => event.status !== 8).length === 0 && (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px' }}>
                  <img src={notFoundImage} alt="Deskripsi gambar" />
                  <Typography variant='h4' marginTop={3}>Tidak Ada Data</Typography>
                </Box>
              )}
            </Box>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box>
              {filteredEvents
                .filter(event => event.evenstatus_id === 8) // Filter events with status 8
                .map(event => (
                  <EventBerjalan 
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
                ))}
              {filteredEvents.filter(event => event.status === 8).length === 0 && (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px' }}>
                  <img src={notFoundImage} alt="Deskripsi gambar" />
                  <Typography variant='h4' marginTop={3}>Tidak Ada Data</Typography>
                </Box>
              )}
            </Box>
          )}
        </CustomTabPanel>

        <AddEventModal open={open} handleClose={handleClose} />
      </MainCard>
    </>
  );
};

export default DaftarEvent;
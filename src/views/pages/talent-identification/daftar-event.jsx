import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Pagination, Stack, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import { AddCircleOutline, DownloadDone, ExpandMore, RotateRight } from '@mui/icons-material';
import notFoundImage from '../../../../public/assets/images/ilustration/notfound.png';
import LinearProgress from '@mui/material/LinearProgress';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import EventBerjalan from '../../../ui-component/submenu/eventberjalan';
import AddEventModal from '../../../ui-component/modal/TambahEvent';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import AlertBerhasil from '../../../ui-component/modal/alert-berhasil';
import IlustrasiBerhasil from '../../../../public/assets/images/ilustration/berhasil.png';

// ==============================|| DAFTAR EVENT PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const DaftarEvent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [eventData, setEventData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deadline, setDeadline] = useState([])

    // Save all the changes of questions using Simpan Button and show Success Modal
    const [openAlertBerhasil, setOpenAlertBerhasil] = useState(false);
    const handleCloseAlertBerhasil = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlertBerhasil(false);
    };

  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    if (refresh){
      fetchDataFromDatabase()
      .then((data) => {
        setEventData(data.event);
        setLoading(false); // Move this line to the end of the .then block
        // setOpenSnackbar(true); // Show snackbar on event added
        // setOpenAlertBerhasil(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
      setrefresh(false);
      setPageTab0(1);
    }
    
  }, [refresh]);

  const fetchDataFromDatabase = () => {
    return fetch('http://localhost:4000/getallevent') // endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data; // Return the parsed JSON data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };





  useEffect(() => {
    fetchDataFromDatabase()
      .then((data) => {
        setEventData(data.event);
        setLoading(false); // Move this line to the end of the .then block
        // setOpenSnackbar(true); // Show snackbar on event added
        // setOpenAlertBerhasil(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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

  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
  });

  const handleEventAdded = () => {
    fetchEventData(); // Re-fetch the data when a new event is added
  };

  const uniqueNamaEvents = [...new Set(eventData.map((event) => event.nama_event))];
  const [selectedNamaEvent, setSelectedNamaEvent] = useState('');

  const filteredEvents = eventData.filter((event) => {
    const namaMatch = !selectedNamaEvent || (event.nama_event && event.nama_event.toLowerCase().includes(selectedNamaEvent.toLowerCase())); // Add null check
    return !selectedNamaEvent || namaMatch;
  });

  const [pageTab0, setPageTab0] = useState(1);
  const [itemsPerPageTab0, setItemsPerPageTab0] = useState(5);

  const handleChangePageTab0 = (event, newPage) => {
    setPageTab0(newPage);
  };

  const handleItemsPerPageChangeTab0 = (newItemsPerPage) => {
    setItemsPerPageTab0(newItemsPerPage);
    setPageTab0(1);
  };

  const startIndexTab0 = (pageTab0 - 1) * itemsPerPageTab0;
  const endIndexTab0 = startIndexTab0 + itemsPerPageTab0;
  const filteredEventsTab0 = filteredEvents.filter((event) => event.evenstatus_id !== 8);
  const paginatedEventsTab0 = filteredEventsTab0.slice(startIndexTab0, endIndexTab0);

  const [pageTab1, setPageTab1] = useState(1);
  const [itemsPerPageTab1, setItemsPerPageTab1] = useState(5);

  const handleChangePageTab1 = (event, newPage) => {
    setPageTab1(newPage);
  };

  const handleItemsPerPageChangeTab1 = (newItemsPerPage) => {
    setItemsPerPageTab1(newItemsPerPage);
    setPageTab1(1);
  };

  const startIndexTab1 = (pageTab1 - 1) * itemsPerPageTab1;
  const endIndexTab1 = startIndexTab1 + itemsPerPageTab1;
  const filteredEventsTab1 = filteredEvents.filter((event) => event.evenstatus_id === 8);
  const paginatedEventsTab1 = filteredEventsTab1.slice(startIndexTab1, endIndexTab1);


  return (
    <>
      {/* <MainLayout /> */}

      <MainCard
        title="Daftar Event"
        secondary={
          <Stack direction="row" spacing={2}>
            <CustomSearch field={uniqueNamaEvents} label={'Cari Nama Event'} onSearch={setSelectedNamaEvent} value={selectedNamaEvent} />
            <ButtonPrimary Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Event'} onClick={handleOpen} />
          </Stack>
        }
      >
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
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          ) : (
            <Box>
              {paginatedEventsTab0.map((event) => (
                <EventBerjalan
                  key={event.id}
                  id={event.id}
                  nama_event={event.nama_event}
                  deskripsi={event.deskripsi}
                  ketua={event.nippos_ketua_komite}
                  tipe_komite_talent={event.tipekomite.tipe_komite_talent}
                  kode_rumpun={event.kode_rumpun_jabatan}
                  nama_rumpun_jabatan={event.rumpun.nama_rumpun_jabatan}
                  kuota={event.kuota}
                  tanggal_mulai={event.tanggal_mulai}
                  tanggal_selesai={event.tanggal_selesai}
                  status={event.evenstatus_id}
                  showHitungMundur={true}
                  jobleve={event.jobleve}
                  setrefresh={setrefresh}
                />
              ))}
              {paginatedEventsTab0.length === 0 ? (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    marginBottom: '24px'
                  }}
                >
                  <img src={notFoundImage} alt="Deskripsi gambar" />
                  <Typography variant="h4" marginTop={3}>
                    Tidak Ada Data
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2} direction="row" sx={{ marginTop: '24px' }}>
                  <Pagination
                    count={Math.ceil(filteredEventsTab0.length / itemsPerPageTab0)}
                    page={pageTab0}
                    onChange={handleChangePageTab0}
                    color="primary"
                  />
                  <div style={{ flex: '1' }}></div>
                  <FilterButton itemsPerPage={itemsPerPageTab0} setItemsPerPage={handleItemsPerPageChangeTab0} />
                </Stack>
              )}
            </Box>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1} style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box>
              {paginatedEventsTab1.map((event) => (
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
                  tanggal_mulai_real={event.deadline && event.deadline[0] ? event.deadline[0].startdate_1 : null}
                  tanggal_selesai_real={event.deadline && event.deadline[0] ? event.deadline[0].eventselesai : null}              
                  status={event.evenstatus_id}
                  statusHitungMundur={false}
                  jobleve={event.jobleve}
                  setrefresh={setrefresh}
                />
              ))}
              {paginatedEventsTab1.length === 0 ? (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    marginBottom: '24px'
                  }}
                >
                  <img src={notFoundImage} alt="Deskripsi gambar" />
                  <Typography variant="h4" marginTop={3}>
                    Tidak Ada Data
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2} direction="row" sx={{ marginTop: '24px' }}>
                  <Pagination
                    count={Math.ceil(filteredEventsTab1.length / itemsPerPageTab1)}
                    page={pageTab1}
                    onChange={handleChangePageTab1}
                    color="primary"
                  />
                  <div style={{ flex: '1' }}></div>
                  <FilterButton itemsPerPage={itemsPerPageTab1} setItemsPerPage={handleItemsPerPageChangeTab1} />
                </Stack>
              )}
            </Box>
          )}
        </CustomTabPanel>

        <AddEventModal open={open} handleClose={handleClose} onEventAdded={handleEventAdded} setrefresh={setrefresh}/>
        {/* {open && 
        } */}

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Event successfully created!
        </MuiAlert>
      </Snackbar>

        <AlertBerhasil
          open={openAlertBerhasil}
          handleClose={handleCloseAlertBerhasil}
          Logo={IlustrasiBerhasil}
          Keterangan={'Berhasil'}
        />

      </MainCard>


    </>
  );
};

export default DaftarEvent;

function FilterButton({ itemsPerPage, setItemsPerPage }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (value) => {
    setItemsPerPage(value);
    handleClose();
  };

  return (
    <div>
      <ButtonPrimary
        Color={'#1F1F1F'}
        backgroundColor={'#FFFFFF'}
        icon={ExpandMore}
        LabelName={`${itemsPerPage} rows`}
        padding={'6px 16px'}
        onClick={handleClick}
        hoverColor={'#1F1F1F'}
        hoverBackgroundColor={'#F5F5F5'}
      />
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleItemClick(3)}>3</MenuItem>
        <MenuItem onClick={() => handleItemClick(5)}>5</MenuItem>
        <MenuItem onClick={() => handleItemClick(10)}>10</MenuItem>
      </Menu>
    </div>
  );
}

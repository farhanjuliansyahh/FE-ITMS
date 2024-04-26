import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard';
import EventDetailSearchSection from '../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CorporateFareOutlined, PersonOutlined, AddCircleOutlineOutlined } from '@mui/icons-material';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonPrimary from '../button/ButtonPrimary';
import { IconFileDownload } from '@tabler/icons-react';

import TalentDaysBPJTable from '../tables/talentdaysbpj';
import TalentDaysKaryawanTable from '../tables/talentdayskaryawan';

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

const TalentDays = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterLokasi, setFilterLokasi] = useState('');
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');

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

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<CorporateFareOutlined />} iconPosition="start" label="BPJ" {...a11yProps(0)} />
            <Tab icon={<PersonOutlined />} iconPosition="start" label="Daftar Karyawan" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
            <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

                <Grid>
                    <Typography variant="h2" style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: '600', marginTop: '16px', marginBottom: '16px'}} gutterBottom>
                        Detail BPJ
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <DatePicker
                                disableFuture
                                views={['year', 'month', 'day']}
                                InputLabelProps={{ shrink: true }}
                                label="Tanggal"
                                fullWidth // Set fullWidth to occupy the entire width of its container
                                />
                            </DemoItem>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <EventDetailSearchSection filter={filterLokasi} setFilter={setFilterLokasi} PlaceHolder={'Lokasi'} />
                        </Grid>
                    </Grid>
                </Grid>

                <Stack direction="row" spacing={2} alignItems="center" style={{marginTop: '16px', marginBottom: '15px'}}>
                    <Typography variant="h2" style={{ display: 'inline', fontFamily: 'Roboto', fontWeight: '600' }} gutterBottom>
                    Tabel BPJ Karyawan
                    </Typography>
                    <Button
                        onClick={handleOpen}
                        variant="contained"
                        style={{
                        color: '#2196F3',
                        borderRadius: '15px',
                        borderColor: '#EAF8FF',
                        backgroundColor: '#EAF8FF',
                        boxShadow: 'none',
                        }}
                    >
                        6 Anggota BPJ
                    </Button>
                    <div style={{ flex: '1' }}> </div>
                    <Button variant="contained" 
                        sx={{backgroundColor:'#1C2D5A', borderRadius:'12px', padding: '14px 24px'}} 
                        endIcon={<AddCircleOutlineOutlined />}
                        onClick={handleOpen}>
                            Tambah BPJ
                    </Button>
                </Stack>
          
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                        <EventDetailSearchSection filter={filterNama} setFilter={setFilterNama} PlaceHolder={'Nama'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterNippos} setFilter={setFilterNippos} PlaceHolder={'NIPPOS'} />
                    </div>
                    <div style={{ marginRight: '12px' }}>
                        <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
                    </div>
                    <div style={{ marginRight: '0px' }}>
                        <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
                    </div>
                </div>
         
                <TalentDaysBPJTable />
            </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>

            <FlexContainer>
              <Stack direction="row" spacing={2} alignItems="center" style={{marginTop: '16px'}}>
                <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                    Tabel Karyawan
                </Typography>
                <Button
                    variant="contained"
                    style={{
                    color: '#2196F3',
                    borderRadius: '15px',
                    borderColor: '#EAF8FF',
                    backgroundColor: '#EAF8FF',
                    boxShadow: 'none',
                    }}
                >
                    13/15 Nilai Karyawan Sudah Diisi
                </Button>
              </Stack>

              <div style={{ flex: '1' }}> </div>
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'}/>

            </FlexContainer>

            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
              <div style={{ marginRight: '12px', width:'100%'  }}>
                    <EventDetailSearchSection PlaceHolder={'Nama'} />
              </div>
              <div style={{ marginRight: '12px', width:'100%' }}>
                  <EventDetailSearchSection PlaceHolder={'NIPPOS'} />
              </div>
              <div style={{ marginRight: '12px', width:'100%' }}>
                  <EventDetailSearchSection PlaceHolder={'Job Level'} />
              </div>
              <div style={{ marginRight: '24px', width:'100%' }}>
                  <EventDetailSearchSection PlaceHolder={'Komite Unit'} />
              </div>
              <div style={{ marginRight: '12px' }}>
                  <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
              </div>
              <div style={{ marginRight: '0px' }}>
                  <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
              </div>
            </div>
          
            <TalentDaysKaryawanTable />

          </Box>          
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default TalentDays;
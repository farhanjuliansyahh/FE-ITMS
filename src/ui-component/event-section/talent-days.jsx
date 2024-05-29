import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography, Stack, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard';
import EventDetailSearchSection from '../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CorporateFareOutlined, PersonOutlined, AddCircleOutlineOutlined, NotificationsNoneOutlined, RestartAltOutlined } from '@mui/icons-material';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonPrimary from '../button/ButtonPrimary';
import { IconFileDownload } from '@tabler/icons-react';

import TalentDaysBPJTable from '../tables/talentdaysbpj';
import TalentDaysKaryawanTable from '../tables/talentdayskaryawan';
import TambahBPJ from '../../ui-component/modal/tambah-anggota-bpj';
import KonfirmasiDetailBPJ from '../../ui-component/modal/konfirmasi-detail-bpj';
import KonfirmasiTambahBPJ from '../../ui-component/modal/konfirmasi-tambah-bpj';
import ButtonOptional from '../../ui-component/button/ButtonOptional';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import KonfirmasiIsiSemuaNilaiTalent from '../../ui-component/modal/konfirmasi-isi-semua-nilai-talent';
import CustomSearch from '../searchsection/custom-search';
import ButtonErrorOutlined from '../button/ButtonErrorOutlined';


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

const TalentDays = ({eventid}) => {
  const [tambahBPJOpen, settambahBPJOpen] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterLokasi, setFilterLokasi] = useState('');
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [daysRow, setdaysRow] = useState([]);
  const [daysBpj, setdaysBpj] = useState([]);
  const [selectedBPJ, setSelectedBPJ] = useState('')
  const [questionList, setQuestionList] = useState([])
  //tambahan
  const [tipe, setTipe] = useState('');
  const [tanggal, setTanggal] = useState(null);
  const [lokasi, setLokasi] = useState('');

  const eventidactive = eventid
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
    settambahBPJOpen(true);
  };

  const handleClose = () => {
    settambahBPJOpen(false);
  };

  const [openDetailBPJ, setDetailBPJOpen] = useState(false);
  const [openKonfirmasiBPJ, setKonfirmasiBPJOpen] = useState(false);

  const handleOpenDetailBPJ = () => {
    setDetailBPJOpen(true);
  };

  const handleCloseDetailBPJ = () => {
    setDetailBPJOpen(false);
  };

  const [openIsiSemuaNilai, setIsiSemuaNilaiOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOpenIsiSemuaNilai = () => {
    setIsiSemuaNilaiOpen(true);
  };

  const handleCloseIsiSemuaNilai = () => {
    setIsiSemuaNilaiOpen(false);
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px', 
    paddingBottom: '24px',
  });
  const LokasiOptions = [
    { id: '1', lokasi: 'Pos Graha Jalan Banda Lantai 8 Ruang La Tulip' },
    { id: '2', lokasi: 'Ruang Investasi Kantor Pos Pusat Jalan Cilaki Bandung' },
    // Add more options as needed
  ];
  useEffect(() => {
    // Define the request body
    const requestBody = {
        // Your request body data here
        eventtalentid: eventidactive,
    };

    // Fetch data from API with request body
    fetch(`http://localhost:4000/createdaysbpj`, {
        method: 'POST', // Specify the HTTP method
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON string
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}, []);


  const fetchkaryawandays = () => {
    // Fetch data from API
    fetch(`http://localhost:4000/gettablekaryawandays?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(datadays => {
        // Update state with API data
        setdaysRow(datadays.map((row, index) => ({ ...row, id: index + 1 })));
         // Check if any element has status === false
      const hasFalseStatus = datadays.some(row => row.Status === "Belum Diisi");
      // Update isDisabled state based on the presence of false status
      setIsDisabled(!hasFalseStatus);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
};

  const fetchbpjdays = () => {
    // Fetch data from API
    fetch(`http://localhost:4000/gettablebpjdays?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(datadays => {
        // Update state with API data
        setdaysBpj(datadays.map((row, index) => ({ ...row, id: index + 1 })));
        // setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
};

const fetchquestionevent = () => {
  // Fetch data from API
  fetch(`http://localhost:4000/getquestionevent?eventtalentid=${eventidactive}`)
    .then(response => response.json())
    .then(data => {
      // Update state with API data
      setQuestionList(data.map((row, index) => ({ ...row, id: index + 1 })));
      setLoading(false); // Set loading to false once data is fetched
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};


useEffect(() => {
  fetchbpjdays(),
  fetchkaryawandays()
  fetchquestionevent()
}, []);

let sudahdipilihcount = 0;
let totalkaryawan = daysRow.length;
const totalbpj = daysBpj.length;
daysRow.forEach(item => {
  if (item["Status"] === "Sudah Diisi") {
      sudahdipilihcount++;
  } 
});

  // BPJ
  const listNamaFalse = [...new Set(daysBpj.map(row => row.Nama))]
  const listNipposFalse = [...new Set(daysBpj.map(row => row.Nippos))];

  const [selectedNamaFalse, setSelectedNamaFalse] = useState(null);
  const [selectedNipposFalse, setSelectedNipposFalse] = useState(null);
  
  const resetNamaInputFalse = () => {
    setSelectedNamaFalse('');
  };

  const resetNipposInputFalse = () => {
    setSelectedNipposFalse('');
  };

  const handleResetSearchFalse = () => {
    resetNamaInputFalse();
    resetNipposInputFalse();
  };

  // DAFTAR KARYAWAN
  const listNamaTrue = [...new Set(daysRow.map(row => row.Nama))]
  const listNipposTrue = [...new Set(daysRow.map(row => row.Nippos))];
  const listJobLevelTrue = [...new Set(daysRow.map(row => row['Job Level']))];
  const listKomiteUnitTrue = [...new Set(daysRow.map(row => row['Komite Unit']))];

  const [selectedNamaTrue, setSelectedNamaTrue] = useState(null);
  const [selectedNipposTrue, setSelectedNipposTrue] = useState(null);
  const [selectedJobLevelTrue, setSelectedJobLevelTrue] = useState(null);
  const [selectedKomiteUnitTrue, setSelectedKomiteUnitTrue] = useState(null);

  const resetNamaInputTrue = () => {
    setSelectedNamaTrue('');
  };

  const resetNipposInputTrue = () => {
    setSelectedNipposTrue('');
  };

  const resetJobLevelInputTrue = () => {
    setSelectedJobLevelTrue('');
  };

  const resetKomiteUnitInputTrue = () => {
    setSelectedKomiteUnitTrue('');
  };

  const handleResetSearchTrue = () => {
    resetNamaInputTrue();
    resetNipposInputTrue();
    resetJobLevelInputTrue();
    resetKomiteUnitInputTrue();
  };

  const filteredRowsTrue = daysRow.filter((row) => {
    const namaMatchTrue = !selectedNamaTrue || (row.Nama && row.Nama.toLowerCase().includes(selectedNamaTrue.toLowerCase())); // Add null check for row.nama
    const nipposMatchTrue = !selectedNipposTrue || (row.Nippos && row.Nippos.toLowerCase().includes(selectedNipposTrue.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatchTrue = !selectedJobLevelTrue || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelTrue.toLowerCase())); // Add null check for row.nippos
    const komiteUnitMatchTrue = !selectedKomiteUnitTrue || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(selectedKomiteUnitTrue.toLowerCase())); // Add null check for row.nippos

    return namaMatchTrue 
        && nipposMatchTrue 
        && jobLevelMatchTrue 
        && komiteUnitMatchTrue;
  });

  const resetRowIndexTrue = (filteredRowsTrue) => {
    return filteredRowsTrue.map((row, index) => ({
      ...row,
      id: index + 1, // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRowsTrue = resetRowIndexTrue(filteredRowsTrue);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';
    
    dataToDownload = resetRowsTrue;
    filename = `Talent_Days_Karyawan_${eventid}.csv`;

    // Create a CSV header with column names
    const headers = Object.keys(dataToDownload[0]);
    const idIndex = headers.indexOf('id');
    if (idIndex !== -1) {
      headers.splice(idIndex, 1); // Remove 'id' from headers
      headers.unshift('id'); // Insert 'id' at the beginning
    }
    const headerRow = headers.join(',');

    // Convert data to CSV format
    const csvContent = "data:text/csv;charset=utf-8," + headerRow + '\n' +
      dataToDownload.map((row) => headers.map((header) => row[header]).join(',')).join('\n');

    // Create a temporary anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const handleOpenSecondModal = (nippos) => {
    setDetailBPJOpen(true);
    setSelectedBPJ(nippos)
};

const handleOpenSecondModalKonfirmasi = (nippos) => {
  setKonfirmasiBPJOpen(true);
  setSelectedBPJ(nippos)
};
const isFormValid = () => tipe && tanggal && lokasi;
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
                    
                    <Stack direction="row" spacing={2} alignItems="center" style={{marginTop: '16px', marginBottom: '15px'}}>
                        <Typography variant="h2" style={{ display: 'inline', fontFamily: 'Roboto', fontWeight: '600' }} gutterBottom>
                            Detail BPJ
                        </Typography>
                        <div style={{ flex: '1' }}> </div>
                        <Button variant="contained" 
                            sx={{backgroundColor:'#1C2D5A', borderRadius:'12px', padding: '14px 24px'}} 
                            endIcon={<NotificationsNoneOutlined />}
                            onClick={handleOpenDetailBPJ}
                            disabled={!isFormValid()}>
                                Kirim Notifikasi
                        </Button>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField sx={{ width: '100%' }}
                                select
                                label="Tipe"
                                value={tipe}
                                onChange={(e) => setTipe(e.target.value)}
                            >
                                <MenuItem value="1">Sidang Jabatan</MenuItem>
                                <MenuItem value="2">Wawancara</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <DatePicker
                                disablePast
                                format="DD-MM-YYYY"
                                views={['year', 'month', 'day']}
                                InputLabelProps={{ shrink: true }}
                                label="Tanggal"
                                value={tanggal}
                                onChange={(newValue) => setTanggal(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                fullWidth // Set fullWidth to occupy the entire width of its container
                                />
                            </DemoItem>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField sx={{ width: '100%' }}
                                select
                                label="Lokasi"
                                value={lokasi}
                                onChange={(e) => setLokasi(e.target.value)}
                            >
                                {LokasiOptions.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.lokasi}
                                  </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {/* <Grid item xs={4}>
                            <EventDetailSearchSection filter={filterLokasi} setFilter={setFilterLokasi} PlaceHolder={'Lokasi'} />
                        </Grid> */}
                    </Grid>
                </Grid>

                <Stack direction="row" spacing={2} alignItems="center" style={{marginTop: '16px', marginBottom: '15px'}}>
                    <Typography variant="h2" style={{ display: 'inline', fontFamily: 'Roboto', fontWeight: '600' }} gutterBottom>
                    Tabel BPJ Karyawan
                    </Typography>
                    <Button
                        // onClick={handleOpen}
                        variant="contained"
                        style={{
                        color: '#2196F3',
                        borderRadius: '15px',
                        borderColor: '#EAF8FF',
                        backgroundColor: '#EAF8FF',
                        boxShadow: 'none',
                        }}
                    >
                        {totalbpj} Anggota BPJ
                    </Button>
                    <div style={{ flex: '1' }}> </div>
                    <Button variant="contained" 
                        sx={{backgroundColor:'#1C2D5A', borderRadius:'12px', padding: '14px 24px'}} 
                        endIcon={<AddCircleOutlineOutlined />}
                        onClick={handleOpen}>
                            Tambah BPJ
                    </Button>
                </Stack>
          
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNamaFalse} label={'Nama'} onSearch={setSelectedNamaFalse} value={selectedNamaFalse} resetInput={resetNamaInputFalse} />
                <CustomSearch field={listNipposFalse} label={'Nippos'} onSearch={setSelectedNipposFalse} value={selectedNipposFalse} resetInput={resetNipposInputFalse} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchFalse} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>

                <TalentDaysBPJTable 
                  eventid={eventidactive} 
                  rows={daysBpj} 
                  searchNama={selectedNamaFalse} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
                  searchNippos={selectedNipposFalse}
                  confirm={fetchbpjdays}
                />
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
                    {sudahdipilihcount}/{totalkaryawan} Nilai Karyawan Sudah Diisi
                </Button>
              </Stack>

              <div style={{ flex: '1' }}> </div>
              <ButtonOptional icon={DoneAllOutlinedIcon} LabelName={'Isi Semua Nilai'} onClick={handleOpenIsiSemuaNilai} disabled={isDisabled}/>
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>

            </FlexContainer>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNamaTrue} label={'Nama'} onSearch={setSelectedNamaTrue} value={selectedNamaTrue} resetInput={resetNamaInputTrue} />
                <CustomSearch field={listNipposTrue} label={'Nippos'} onSearch={setSelectedNipposTrue} value={selectedNipposTrue} resetInput={resetNipposInputTrue} />
                <CustomSearch field={listJobLevelTrue} label={'Job Level'} onSearch={setSelectedJobLevelTrue} value={selectedJobLevelTrue} resetInput={resetJobLevelInputTrue} />
                <CustomSearch field={listKomiteUnitTrue} label={'Komite Unit'} onSearch={setSelectedKomiteUnitTrue} value={selectedKomiteUnitTrue} resetInput={resetKomiteUnitInputTrue} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>
          
            <TalentDaysKaryawanTable 
              rows={resetRowsTrue} 
              question = {questionList}
              eventid={eventidactive}
              refetchkaryawan = {fetchkaryawandays}
            />

          </Box>          
        </CustomTabPanel>

        <TambahBPJ 
          open={tambahBPJOpen}
          onClose={handleClose}
          onOpenSecondModal={handleOpenSecondModalKonfirmasi}
          eventid={eventidactive}
          onConfirm={fetchbpjdays}
        />

        <KonfirmasiDetailBPJ
          open={openDetailBPJ}
          handleClose={() => setDetailBPJOpen(false)}
          eventid = {eventidactive}
        />

        <KonfirmasiIsiSemuaNilaiTalent
          open={openIsiSemuaNilai}
          handleClose={() => setIsiSemuaNilaiOpen(false)}
          activeEvent= {eventidactive}
          confirm = {fetchkaryawandays}
        />

      </MainCard>
    </>
  );
};

export default TalentDays;
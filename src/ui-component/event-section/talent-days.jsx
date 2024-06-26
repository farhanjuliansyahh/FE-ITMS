import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography, Stack, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CorporateFareOutlined, DoneAllOutlined, PersonOutlined, AddCircleOutlineOutlined, NotificationsNoneOutlined, RestartAltOutlined } from '@mui/icons-material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconFileDownload } from '@tabler/icons-react';
// ui-component
import ButtonErrorOutlined from '../button/ButtonErrorOutlined.jsx';
import ButtonOptional from '../button/ButtonOptional.jsx';
import ButtonPrimary from '../button/ButtonPrimary.jsx';
import MainCard from '../cards/MainCard.jsx';
import KonfirmasiDetailBPJ from '../modal/konfirmasi-detail-bpj.jsx';
import KonfirmasiIsiSemuaNilaiTalent from '../modal/konfirmasi-isi-semua-nilai-talent.jsx';
import TambahBPJ from '../modal/tambah-anggota-bpj.jsx';
import CustomSearch from '../searchsection/custom-search.jsx';
import TalentDaysBPJTable from '../tables/talentdaysbpj.jsx';
import TalentDaysKaryawanTable from '../tables/talentdayskaryawan.jsx';

import.meta.env.VITE_API_BASE_URL

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

const TalentDays = ({ eventid, eventstatus_id, nama_event }) => {
  const [tambahBPJOpen, settambahBPJOpen] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [daysRow, setdaysRow] = useState([]);
  const [daysBpj, setdaysBpj] = useState([]);
  const [selectedBPJ, setSelectedBPJ] = useState('');
  const [questionList, setQuestionList] = useState([]);

  const [selectedTipe, setSelectedTipe] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLokasi, setSelectedLokasi] = useState('');
  const [disableInputs, setDisableInputs] = useState(false);
  const [infobpj, setinfobpj] = useState([])
  const [eventnotactive, seteventnotactive] = useState(false)
  const url = import.meta.env.VITE_API_BASE_URL

  const eventidactive = eventid;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const [openIsiSemuaNilai, setIsiSemuaNilaiOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOpenIsiSemuaNilai = () => {
    setIsiSemuaNilaiOpen(true);
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  const fetchkaryawandays = () => {
    // Fetch data from API
    fetch(url + `gettablekaryawandays?eventtalentid=${eventidactive}`)
      .then((response) => response.json())
      .then((datadays) => {
        // Update state with API data
        setdaysRow(datadays.map((row, index) => ({ ...row, id: index + 1 })));
        // Check if any element has status === false
        const hasFalseStatus = datadays.some((row) => row.Status === 'Belum Diisi');
        // Update isDisabled state based on the presence of false status
        setIsDisabled(!hasFalseStatus);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchbpjdays = () => {
    // Fetch data from API
    fetch(url + `gettablebpjdays?eventtalentid=${eventidactive}`)
      .then((response) => response.json())
      .then((datadays) => {
        // Update state with API data
        setdaysBpj(datadays.map((row, index) => ({ ...row, id: index + 1 })));
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchinfobpj = () => {
    // Fetch data from API
    fetch(url + `getsijabinfo?eventtalentid=${eventidactive}`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with API data
        setinfobpj(data);
        if (data.jenis_bpj || data.tanggal_bpj || data.lokasi_bpj) {
          setSelectedTipe(data.jenis_bpj || '');
          setSelectedDate(dayjs(data.tanggal_bpj) || '');
          setSelectedLokasi(data.lokasi_bpj || '');
          setDisableInputs(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchquestionevent = () => {
    // Fetch data from API
    fetch(url + `getquestionevent?eventtalentid=${eventidactive}`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with API data
        setQuestionList(data.map((row, index) => ({ ...row, id: index + 1 })));
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchbpjdays();
    fetchkaryawandays();
    fetchquestionevent();
    fetchinfobpj();

    if (eventstatus_id !== 5) {
      seteventnotactive(true);
    } else {
      seteventnotactive(false);
    }
  }, [isLoading, eventstatus_id]);

  let sudahdipilihcount = 0;
  let totalkaryawan = daysRow.length;
  const totalbpj = daysBpj.length;
  daysRow.forEach((item) => {
    if (item['Status'] === 'Sudah Diisi') {
      sudahdipilihcount++;
    }
  });

  // BPJ
  const listNamaFalse = [...new Set(daysBpj.map((row) => row.Nama))];
  const listNipposFalse = [...new Set(daysBpj.map((row) => row.Nippos))];

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
  const listNamaTrue = [...new Set(daysRow.map((row) => row.Nama))];
  const listNipposTrue = [...new Set(daysRow.map((row) => row.Nippos))];
  const listJobLevelTrue = [...new Set(daysRow.map((row) => row['Job Level']))];
  const listKomiteUnitTrue = [...new Set(daysRow.map((row) => row['Komite Unit']))];

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
    const jobLevelMatchTrue =
      !selectedJobLevelTrue || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelTrue.toLowerCase())); // Add null check for row.nippos
    const komiteUnitMatchTrue =
      !selectedKomiteUnitTrue || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(selectedKomiteUnitTrue.toLowerCase())); // Add null check for row.nippos

    return namaMatchTrue && nipposMatchTrue && jobLevelMatchTrue && komiteUnitMatchTrue;
  });

  const resetRowIndexTrue = (filteredRowsTrue) => {
    return filteredRowsTrue.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRowsTrue = resetRowIndexTrue(filteredRowsTrue);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    dataToDownload = resetRowsTrue;
    filename = `${nama_event}_Talent Days_Daftar Karyawan.csv`;

    // Specify the columns to include in the CSV, adding 'No' as the first column
    const includedData = ['No', 'Nama', 'Nippos', 'Posisi', 'Job Level', 'Rumpun Jabatan', 'Nama Kantor', 'Komite Unit', 'Status'];

    // Create a CSV header with the included column names
    const headerNames = ['No', 'Nama', 'NIPPOS', 'Posisi', 'Job Level', 'Rumpun Jabatan', 'Kantor', 'Komite Unit', 'Status'];
    const headerRow = headerNames.join(';');

    // Filter the data to include only the specified columns and add 'No' column
    const filteredData = dataToDownload.map((row, index) => {
      const filteredRow = { No: index + 1 }; // Add 'No' column starting from 1
      includedData.slice(1).forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    // Convert data to CSV format
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headerRow +
      '\n' +
      filteredData.map(row => includedData.map(column => row[column]).join(';')).join('\n');

    // Create a temporary anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const handleOpenSecondModalKonfirmasi = (nippos) => {
    setKonfirmasiBPJOpen(true);
    setSelectedBPJ(nippos);
  };
  const isFormValid = () => selectedTipe && selectedDate && selectedLokasi;
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleCloseKirimNotifikasi = () => {
    setDetailBPJOpen(false);
    setDisableInputs(true);
  };
  const handleCloseBatalKirimNotifikasi = () => {
    setDetailBPJOpen(false);
  };
  //setDisableInputs(true)

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
              <Stack direction="row" spacing={2} alignItems="center" style={{ marginTop: '16px', marginBottom: '15px' }}>
                <Typography variant="h2" style={{ display: 'inline', fontFamily: 'Roboto', fontWeight: '600' }} gutterBottom>
                  Detail BPJ
                </Typography>
                <div style={{ flex: '1' }}> </div>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#1C2D5A', borderRadius: '12px', padding: '14px 24px', boxShadow: 'none' }}
                  endIcon={<NotificationsNoneOutlined />}
                  onClick={handleOpenDetailBPJ}
                  disabled={!isFormValid() || disableInputs}
                >
                  Kirim Notifikasi
                </Button>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    sx={{ width: '100%' }}
                    select
                    label="Tipe"
                    value={selectedTipe}
                    onChange={(event) => setSelectedTipe(event.target.value)}
                    disabled={disableInputs || eventnotactive}
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
                        onChange={(date) => setSelectedDate(date)}
                        value={selectedDate ? dayjs(selectedDate) : null} // Handle null value
                        disabled={disableInputs || eventnotactive}
                        fullWidth // Set fullWidth to occupy the entire width of its container
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    sx={{ width: '100%' }}
                    label="Lokasi"
                    value={selectedLokasi}
                    onChange={(e) => setSelectedLokasi(e.target.value)}
                    disabled={disableInputs || eventnotactive}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} alignItems="center" style={{ marginTop: '16px', marginBottom: '15px' }}>
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
                  boxShadow: 'none'
                }}
              >
                {totalbpj} Anggota BPJ
              </Button>
              <div style={{ flex: '1' }}> </div>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1C2D5A', borderRadius: '12px', padding: '14px 24px', boxShadow: 'none' }}
                endIcon={<AddCircleOutlineOutlined />}
                onClick={handleOpen}
                disabled={eventstatus_id !== 5}
              >
                Tambah BPJ
              </Button>
            </Stack>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch
                  field={listNamaFalse}
                  label={'Nama'}
                  onSearch={setSelectedNamaFalse}
                  value={selectedNamaFalse}
                  resetInput={resetNamaInputFalse}
                />
                <CustomSearch
                  field={listNipposFalse}
                  label={'Nippos'}
                  onSearch={setSelectedNipposFalse}
                  value={selectedNipposFalse}
                  resetInput={resetNipposInputFalse}
                />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchFalse} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <TalentDaysBPJTable
              eventid={eventidactive}
              rows={daysBpj}
              searchNama={selectedNamaFalse} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
              searchNippos={selectedNipposFalse}
              confirm={fetchbpjdays}
              eventstatus_id={eventstatus_id}
              disabled={eventnotactive}
            />
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
            <FlexContainer>
              <Stack direction="row" spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} gutterBottom>
                  Tabel Karyawan
                </Typography>
                <Button
                  variant="contained"
                  style={{
                    color: '#2196F3',
                    borderRadius: '15px',
                    borderColor: '#EAF8FF',
                    backgroundColor: '#EAF8FF',
                    boxShadow: 'none'
                  }}
                >
                  {sudahdipilihcount}/{totalkaryawan} Nilai Karyawan Sudah Diisi
                </Button>
              </Stack>

              <div style={{ flex: '1' }}> </div>
              <ButtonOptional
                icon={DoneAllOutlined}
                LabelName={'Isi Semua Nilai'}
                onClick={handleOpenIsiSemuaNilai}
                disabled={isDisabled}
              />
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
            </FlexContainer>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch
                  field={listNamaTrue}
                  label={'Nama'}
                  onSearch={setSelectedNamaTrue}
                  value={selectedNamaTrue}
                  resetInput={resetNamaInputTrue}
                />
                <CustomSearch
                  field={listNipposTrue}
                  label={'Nippos'}
                  onSearch={setSelectedNipposTrue}
                  value={selectedNipposTrue}
                  resetInput={resetNipposInputTrue}
                />
                <CustomSearch
                  field={listJobLevelTrue}
                  label={'Job Level'}
                  onSearch={setSelectedJobLevelTrue}
                  value={selectedJobLevelTrue}
                  resetInput={resetJobLevelInputTrue}
                />
                <CustomSearch
                  field={listKomiteUnitTrue}
                  label={'Komite Unit'}
                  onSearch={setSelectedKomiteUnitTrue}
                  value={selectedKomiteUnitTrue}
                  resetInput={resetKomiteUnitInputTrue}
                />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <TalentDaysKaryawanTable
              rows={resetRowsTrue}
              question={questionList}
              eventid={eventidactive}
              refetchkaryawan={fetchkaryawandays}
              eventstatus_id={eventstatus_id}
              initialDataLength={daysRow.length}
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
          handleCloseBatalkan={handleCloseBatalKirimNotifikasi}
          handleClose={handleCloseKirimNotifikasi}
          eventid={eventidactive}
          selectedTipe={selectedTipe}
          selectedDate={selectedDate}
          selectedLokasi={selectedLokasi}
        />

        <KonfirmasiIsiSemuaNilaiTalent
          open={openIsiSemuaNilai}
          handleClose={() => setIsiSemuaNilaiOpen(false)}
          activeEvent={eventidactive}
          confirm={fetchkaryawandays}
        />
      </MainCard>
    </>
  );
};

export default TalentDays;

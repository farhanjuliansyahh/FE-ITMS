import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';
import ButtonOptional from '../../../ui-component/button/ButtonOptional';
import MainCard from '../../../ui-component/cards/MainCard';
import PassingGradeTable from '../../../ui-component/tables/PassingGradeTable';
import KuotaTable from '../../../ui-component/tables/KuotaTable';
import DaftarPertanyaanTable from '../../../ui-component/tables/DaftarPertanyaanTable';
import AccordionKomiteTalent from '../../../ui-component/cards/AccordionKomiteTalent';
import DaftarKomiteTalent from '../../../ui-component/submenu/daftar-komitetalent';
import NilaiAssessmentTable from '../../../ui-component/tables/NilaiAssessmentTable';
import UnggahDataNilaiAssessment from '../../../ui-component/modal/unggah-data-nilai-assessment';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import AddQuestionModal from '../../../ui-component/modal/tambah-pertanyaan';
import AlertSimpan from '../../../ui-component/modal/alert-simpan';
import SimpanLogo from '../../../assets/images/ilustration/simpan.png';

import {
  AddCircleOutline,
  AssignmentOutlined,
  AssignmentTurnedInOutlined,
  CancelOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  GroupsOutlined,
  PersonOutlineOutlined,
  QuizOutlined,
  RestartAltOutlined,
  SaveOutlined,
  SimCardDownloadOutlined
} from '@mui/icons-material';

// ==============================|| PARAMETER TALENT PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box>
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

const ParameterTalent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  const [selectedKantor, setSelectedKantor] = useState(null);
  // const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);
  // const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedStatusIDP, setSelectedStatusIDP] = useState(null);
  const [openKonfirmasiModal, setOpenKonfirmasiModal] = useState(false);
  const [updatekkmstate, setUpdatekkmstate] = useState(false);
  const [updatekuotastate, setUpdatekuotastate] = useState(false);
  const [refetchstate, setRefetchstate] = useState(true);

  const handleClickKKM = () => {
    setUpdatekkmstate(true);
  };

  const handleClickKuota = () => {
    setUpdatekuotastate(true);
  };

  const handleBatalkanKKM = () => {
    setRefetchstate(true);
  };

  const [openUnggahData, setopenUnggahData] = useState(false);

  const handleOpen = () => {
    setopenUnggahData(true);
  };

  const handleClose = () => {
    setopenUnggahData(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRefetchstate(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const boxStyle = {
    padding: '20px',
    width: '100%',
    borderRadius: '12px',
    marginTop: '-55px'
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  function createData(
    id,
    nama,
    nippos,
    posisi,
    joblevel,
    rumpunjabatan,
    kantor,
    komiteunit,
    kompbumn,
    komplead,
    kompteknis,
    potensi,
    akhlak,
    learningagility,
    performance
  ) {
    return {
      id,
      nama,
      nippos,
      posisi,
      joblevel,
      rumpunjabatan,
      kantor,
      komiteunit,
      kompbumn,
      komplead,
      kompteknis,
      potensi,
      akhlak,
      learningagility,
      performance
    };
  }

  const rows = [
    createData(
      1,
      'Sri Hartini',
      '998494379',
      'Asisten Manajer Pengembangan Join Operation',
      'E3',
      'Bisnis',
      'KANTOR PUSAT BANDUNG',
      'ABD HAFID'
    ),
    createData(2, 'Muhamad Arsyi', '998494379', 'Asisten Manajer Acquisition Biller', 'D2', 'Bisnis', 'KANTOR PUSAT BANDUNG', 'ABDU SOMAD'),
    createData(3, 'Adinda', '998495379', 'Asisten Manajer Pengelolaan Remittance LN', 'D1', 'SDM', 'KANTOR PUSAT BANDUNG', 'ABDUL JAMIL'),
    createData(
      4,
      'Niken Wijaya',
      '998494389',
      'Asisten Manajer Penjualan dan Kemitraan Pospay',
      'E3',
      'Bisnis',
      'KANTOR PUSAT JAKARTA',
      'ABDUL WAHAB'
    ),
    createData(
      5,
      'Abang',
      '998494379',
      'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding',
      'E2',
      'Bisnis',
      'KANTOR PUSAT JAKARTA',
      'ACEP RUDI SUPRIADI'
    )
  ];

  // create list of Nama, Nippos, Job Level, Rumpun Jabatan
  const listNama = [...new Set(rows.map((row) => row.nama))];
  const listNippos = [...new Set(rows.map((row) => row.nippos))];
  const listJobLevel = [...new Set(rows.map((row) => row.joblevel))];
  const listRumpunJabatan = [...new Set(rows.map((row) => row.rumpunjabatan))];

  const [selectedNama, setSelectedNama] = useState(null);
  const [selectedNippos, setSelectedNippos] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);

  const resetNamaInput = () => {
    setSelectedNama('');
  };

  const resetNipposInput = () => {
    setSelectedNippos('');
  };

  const resetJobLevelInput = () => {
    setSelectedJobLevel('');
  };

  const resetRumpunJabatanInput = () => {
    setSelectedRumpunJabatan('');
  };

  const handleResetSearch = () => {
    setSelectedNama('');
    setSelectedNippos('');
    setSelectedJobLevel('');
    setSelectedRumpunJabatan('');

    // Call resetInput function for each CustomSearch component
    resetNamaInput();
    resetNipposInput();
    resetJobLevelInput();
    resetRumpunJabatanInput();
  };

  //ACTION Index 2
  // Initialize a variable to track the next ID
  let nextId = 1;
  const generateId = () => {
    return nextId++;
  };

  // Ini fetch buat get all question
  const [pertanyaan, setPertanyaan] = useState([]);
  const getQuestions = () => {
    fetch(`http://localhost:4000/getquest`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with API data
        setPertanyaan(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []); // Empty dependency array to run effect only once

  // console.log('pertanyaan: ', pertanyaan);

  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);

  const handleOpenAddQuestionModal = () => {
    setOpenAddQuestionModal(true);
  };

  const handleCloseAddQuestionModal = () => {
    setOpenAddQuestionModal(false);
  };
  const handleAddQuestion = (newQuestionText) => {
    const newQuestion = {
      id: generateId(),
      text: newQuestionText
    };
    console.log('Adding new question:', newQuestion);
    setPertanyaan([...pertanyaan, newQuestion]);
  };

  const updateQuestion = (pertanyaanChange) => {
    return fetch('http://localhost:4000/updatequestion', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        updates: pertanyaanChange
      }) // Convert the bodyData object to a JSON string
    })
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

  const [pertanyaanChange, setPertanyaanChange] = useState([]);

  //Save question automaticcaly per row
  const handleSaveQuestionAutomatic = (id, newText) => {
    const updatedPertanyaan = pertanyaan.map((question) => (question.id === id ? { ...question, text: newText } : question));
    setPertanyaan(updatedPertanyaan);
    setChangesMade(true);

    // Create a new dictionary with id and newText
    const newChange = { id, pertanyaan: newText };

    // Update the pertanyaanChange array with the new dictionary
    setPertanyaanChange((prevChanges) => [...prevChanges, newChange]);
  };

  console.log('diubah: ', pertanyaanChange);

  useEffect(() => {
    // console.log('Rows:', pertanyaan);
  }, [pertanyaan]);

  // Save all the changes of questions using Simpan Button and show Success Modal
  const [openAlertBerhasilSimpan, setOpenAlertBerhasilSimpan] = useState(false);
  const handleCloseAlertBerhasilSimpan = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertBerhasilSimpan(false);
  };
  const [changesMade, setChangesMade] = useState(false);
  const handleSaveAllChanges = () => {
    updateQuestion(pertanyaanChange)
      .then((data) => {
        console.log('API response:', data);
        setChangesMade(false);
        setOpenAlertBerhasilSimpan(true);
        setPertanyaanChange([]); // Clear the changes after successful update
      })
      .catch((error) => {
        console.error('Failed to save changes:', error);
      });
  };

  const handleDownload = () => {
    // Define the URL of the Google Sheets file to download
    const googleSheetUrl =
      'https://docs.google.com/spreadsheets/d/1WOFR8vKbbwaSJoVB_50Z45nEr3XijTei/edit?usp=drive_link&ouid=116933319260090654956&rtpof=true&sd=true';

    // Construct the modified URL with the export parameter for CSV format
    const modifiedUrl = `${googleSheetUrl}/export?format=csv`;

    // Create a new anchor element
    const link = document.createElement('a');

    // Set the href attribute of the anchor element to the modified URL
    link.href = modifiedUrl;

    // Set the download attribute to specify the filename when downloaded
    link.download = 'filename.csv';

    // Set the target attribute to open the link in a new tab
    link.target = '_blank';

    // Programmatically click the anchor element to trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the anchor element from the DOM
    document.body.removeChild(link);
  };

  //fungsi buat reset index:
  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const filteredRows = rows.filter((row) => {
    const namaMatch = !selectedNama || (row.nama && row.nama.toLowerCase().includes(selectedNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !selectedNippos || (row.nippos && row.nippos.toLowerCase().includes(selectedNippos.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatch = !selectedJobLevel || (row.joblevel && row.joblevel.toLowerCase().includes(selectedJobLevel.toLowerCase())); // Add null check for row.nippos
    const rumpunJabatanMatch =
      !selectedRumpunJabatan || (row.rumpunjabatan && row.rumpunjabatan.toLowerCase().includes(selectedRumpunJabatan.toLowerCase())); // Add null check for row.nippos

    return (
      (!selectedNama || namaMatch) &&
      (!selectedNippos || nipposMatch) &&
      (!selectedJobLevel || jobLevelMatch) &&
      (!selectedRumpunJabatan || rumpunJabatanMatch)
    );
  });

  //buat constanta yang isinya hasil filter yang indexnya udah di reset:
  const resetRows = resetRowIndex(filteredRows);

  // console.log('sri: ', resetRows);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    dataToDownload = resetRows;
    filename = `nilai_assessment_karyawan.csv`;

    // Create a CSV header with column names
    const headers = Object.keys(dataToDownload[0]);
    const idIndex = headers.indexOf('id');
    if (idIndex !== -1) {
      headers.splice(idIndex, 1); // Remove 'id' from headers
      headers.unshift('id'); // Insert 'id' at the beginning
    }
    const headerRow = headers.join(',');

    // Convert data to CSV format
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headerRow +
      '\n' +
      dataToDownload.map((row) => headers.map((header) => row[header]).join(',')).join('\n');

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

  return (
    <>
      <MainCard>
        {/* Bagian Tab */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<AssignmentTurnedInOutlined />} iconPosition="start" label="Passing Grade" {...a11yProps(0)} />
            <Tab icon={<PersonOutlineOutlined />} iconPosition="start" label="Kuota" {...a11yProps(1)} />
            <Tab icon={<QuizOutlined />} iconPosition="start" label="Question Event" {...a11yProps(2)} />
            <Tab icon={<GroupsOutlined />} iconPosition="start" label="Komite Talent" {...a11yProps(3)} />
            <Tab icon={<AssignmentOutlined />} iconPosition="start" label="Nilai Assessment" {...a11yProps(4)} />
          </Tabs>
        </Box>

        {/* Passing Grade */}
        <CustomTabPanel value={value} index={0}>
          <Box display="flex" marginTop={2} flexDirection="column" alignItems="center" paddingLeft={'24px'} paddingRight={'24px'}>
            <Grid>
              <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>
                Komite Talent I
              </Typography>
              <PassingGradeTable
                tipekomite={1}
                updatekkmstate={updatekkmstate}
                refetchstate={refetchstate}
                onUpdateKkmStateChange={() => setUpdatekkmstate(false)}
                handlerefetch={() => setRefetchstate(false)}
              />
              <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>
                Komite Talent II
              </Typography>
              <PassingGradeTable
                tipekomite={2}
                updatekkmstate={updatekkmstate}
                refetchstate={refetchstate}
                onUpdateKkmStateChange={() => setUpdatekkmstate(false)}
                handlerefetch={() => setRefetchstate(false)}
              />
              <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>
                Komite Talent III
              </Typography>
              <PassingGradeTable
                tipekomite={3}
                updatekkmstate={updatekkmstate}
                refetchstate={refetchstate}
                onUpdateKkmStateChange={() => setUpdatekkmstate(false)}
                handlerefetch={() => setRefetchstate(false)}
              />
            </Grid>

            <Box display="flex" justifyContent="flex-end" width="100%">
              <Box sx={{ marginRight: '16px' }}>
                <ButtonPrimary Color="#ffffff" icon={SaveOutlined} LabelName={'Simpan'} onClick={handleClickKKM} />
              </Box>
              <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlined} LabelName={'Batalkan'} onClick={handleBatalkanKKM} />
            </Box>
          </Box>
        </CustomTabPanel>

        {/* Kuota */}
        <Box display="flex" marginTop={4} width="100%" paddingLeft={'24px'} paddingRight={'24px'} paddingBottom={'24px'}>
          {/* Left Table */}
          <Box flex={1} marginRight={2}>
            <CustomTabPanel value={value} index={1}>
              <Grid>
                <Typography fontSize={22} fontWeight={600} marginBottom={2}>
                  Komite Unit
                </Typography>
                <KuotaTable
                  header="Kuota Talent Source- (Dalam Satuan Persen)"
                  initialValue={50}
                  bobot={1}
                  refetchstate={refetchstate}
                  handlerefetch={() => setRefetchstate(false)}
                  updatekuotastate={updatekuotastate}
                  onUpdateKuotaStateChange={() => setUpdatekuotastate(false)}
                />
              </Grid>
            </CustomTabPanel>
          </Box>

          {/* Right Table */}
          <Box flex={1} marginLeft={2}>
            <CustomTabPanel value={value} index={1}>
              <Container style={{ textAlign: 'left', paddingLeft: 0, paddingRight: 0 }}>
                <Typography fontSize={22} fontWeight={600} marginBottom={2}>
                  Ketua Komite Talent
                </Typography>
                <KuotaTable
                  header="Kuota Diskresi- (Dalam Satuan Persen)"
                  initialValue={10}
                  bobot={2}
                  refetchstate={refetchstate}
                  handlerefetch={() => setRefetchstate(false)}
                  updatekuotastate={updatekuotastate}
                  onUpdateKuotaStateChange={() => setUpdatekuotastate(false)}
                />
              </Container>

              {/* Buttons */}
              <Box display="flex" justifyContent="flex-end" marginTop={'24px'}>
                <Box sx={{ marginRight: '16px' }}>
                  <ButtonPrimary Color="#ffffff" icon={SaveOutlined} LabelName={'Simpan'} onClick={handleClickKuota} />
                </Box>
                <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlined} LabelName={'Batalkan'} onClick={handleBatalkanKKM} />
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>

        {/* Question Event */}
        <CustomTabPanel value={value} index={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={'-35px'}
            paddingLeft={'24px'}
            paddingRight={'24px'}
            paddingBottom={'24px'}
          >
            {/* Container with Flexbox layout */}
            <Grid>
              {/* Flex container for the title and button */}
              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={0} marginBottom={'16px'}>
                <Typography fontSize={22} fontWeight={600}>
                  Daftar Pertanyaan
                </Typography>
                <ButtonPrimary onClick={handleOpenAddQuestionModal} Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Data'} />
              </Box>

              {/* Table */}
              <DaftarPertanyaanTable pertanyaan={pertanyaan} handleSaveQuestion={handleSaveQuestionAutomatic} />
            </Grid>

            <Box display="flex" justifyContent="flex-end" width="100%">
              <Box sx={{ marginRight: '16px' }}>
                <ButtonPrimary
                  Color="#ffffff"
                  icon={SaveOutlined}
                  LabelName={'Simpan'}
                  onClick={handleSaveAllChanges}
                  disabled={!changesMade}
                />
              </Box>
            </Box>
          </Box>
        </CustomTabPanel>

        {/* Komite Talent */}
        <CustomTabPanel value={value} index={3}>
          <Box display="block" width="100%" flexDirection="column" alignItems="center" padding={'12px 24px'} marginTop={-5}>
            <AccordionKomiteTalent
              title={'Komite Talent 1'}
              subtitle={'Direktur Utama - Faizal Rochmad Djoemadi'}
              icon={GroupsOutlined}
              content={<DaftarKomiteTalent />}
            />
            <AccordionKomiteTalent
              title={'Komite Talent 2'}
              subtitle={'Direktur HCM - Tonggo Marbun'}
              icon={GroupsOutlined}
              content={<DaftarKomiteTalent />}
            />
            <AccordionKomiteTalent
              title={'Komite Talent 3'}
              subtitle={'Senior Vice President HCSBP - Chandra Dewi'}
              icon={GroupsOutlined}
              content={<DaftarKomiteTalent />}
            />
          </Box>
        </CustomTabPanel>

        {/* Nilai Assessment */}
        <CustomTabPanel value={value} index={4}>
          <Box sx={boxStyle}>
            <FlexContainer>
              <Typography style={{ fontSize: '22px', fontWeight: '600' }}>Tabel Karyawan</Typography>
              <div style={{ flex: '1' }}> </div>
              <ButtonPrimary Color="#ffffff" icon={FileUploadOutlined} LabelName={'Unggah Data'} onClick={handleOpen} />
              <ButtonOptional icon={SimCardDownloadOutlined} LabelName={'Unduh Template'} onClick={handleDownload} />
              <ButtonOptional icon={FileDownloadOutlined} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
            </FlexContainer>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
                <CustomSearch
                  field={listNippos}
                  label={'Nippos'}
                  onSearch={setSelectedNippos}
                  value={selectedNippos}
                  resetInput={resetNipposInput}
                />
                <CustomSearch
                  field={listJobLevel}
                  label={'Job Level'}
                  onSearch={setSelectedJobLevel}
                  value={selectedJobLevel}
                  resetInput={resetJobLevelInput}
                />
                <CustomSearch
                  field={listRumpunJabatan}
                  label={'Rumpun Jabatan'}
                  onSearch={setSelectedRumpunJabatan}
                  value={selectedRumpunJabatan}
                  resetInput={resetRumpunJabatanInput}
                />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <NilaiAssessmentTable filteredRows={resetRows} />
          </Box>
        </CustomTabPanel>

        <UnggahDataNilaiAssessment open={openUnggahData} handleClose={() => setopenUnggahData(false)} />
        <AddQuestionModal open={openAddQuestionModal} handleClose={handleCloseAddQuestionModal} handleAddQuestion={handleAddQuestion} />
        <AlertSimpan
          open={openAlertBerhasilSimpan}
          handleClose={handleCloseAlertBerhasilSimpan}
          Severity={'success'}
          Logo={SimpanLogo}
          Keterangan={'Berhasil Simpan'}
        />
      </MainCard>
    </>
  );
};

export default ParameterTalent;

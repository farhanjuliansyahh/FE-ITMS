import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard.jsx';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import { RestartAltOutlined } from '@mui/icons-material';

import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary.jsx';
import TalentProfileTable from '../../ui-component/tables/talentprofile.jsx';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import KonfirmasiSubmitTalentProfile from '../../ui-component/modal/konfirmasi-submit-talent-profile.jsx';
import ButtonOptional from '../../ui-component/button/ButtonOptional.jsx';
import CustomSearch from '../../ui-component/searchsection/custom-search.jsx';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined.jsx';
import.meta.env.VITE_API_BASE_URL

// ==============================|| DETAIL TALENT PROFILE PAGE ||============================== //

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

const TalentProfile = ({ eventid, eventstatus_id }) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [rowslengkap, setrowslengkap] = useState([]);
  const [rowsbelum, setrowsbelum] = useState([]);
  const [filterKomite, setFilterKomite] = useState('');
  const [openSubmit, setOpenSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const url = import.meta.env.VITE_API_BASE_URL

  const activeEvent = eventid;
  const handleOpenSubmit = () => {
    setOpenSubmit(true);
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
  };

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getbelumlengkap?eventtalentid=${eventid}`)
      .then((response) => response.json())
      .then((databelum) => {
        // Update state with API data
        setrowsbelum(databelum.map((row, index) => ({ ...row, id: index + 1 })));
        if (databelum.length === 0 || eventstatus_id !== 3) {
          // Value is null, disable button
          setIsDisabled(true);
        } else {
          // Value is not null, enable button
          setIsDisabled(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [isDisabled]);

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getlengkap?eventtalentid=${eventid}`)
      .then((response) => response.json())
      .then((datalengkap) => {
        // Update state with API data
        setrowslengkap(datalengkap.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const fetchData = () => {
    fetch(url + `getbelumlengkap?eventtalentid=${eventid}`)
      .then((response) => response.json())
      .then((databelum) => {
        setrowsbelum(databelum.map((row, index) => ({ ...row, id: index + 1 })));
        setIsDisabled(databelum.length === 0 );
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetch(url + `getlengkap?eventtalentid=${eventid}`)
      .then((response) => response.json())
      .then((datalengkap) => {
        setrowslengkap(datalengkap.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px', // Adjust the gap between elements as needed
    paddingBottom: '24px'
  });

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';
  
    // Determine which dataset to use based on the active tab
    if (value === 0) {
      dataToDownload = resetRowsFalse;
      filename = `Talent_Profile_TidakLengkap_${eventid}.csv`;
    } else if (value === 1) {
      dataToDownload = resetRowsTrue;
      filename = `Talent_Profile_Lengkap_${eventid}.csv`;
    }
  
    // Specify the columns to include in the CSV, adding 'No' as the first column
    const includedData = ['No', 'Nama', 'Nippos', 'Posisi', 'Job Level', 'Rumpun Jabatan', 'Commitment Letter', 'Pakta Integritas', 'Status Submit', 'Komite Unit'];
  
    // Create a CSV header with the included column names
    const headerNames = ['No', 'Nama', 'NIPPOS', 'Posisi', 'Job Level', 'Rumpun Jabatan', 'Commitment Letter', 'Pakta Integritas', 'Status Submit', 'Komite Unit'];
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

  // BELUM LENGKAP
  const listNamaFalse = [...new Set(rowsbelum.map((row) => row.Nama))];
  const listNipposFalse = [...new Set(rowsbelum.map((row) => row.Nippos))];
  const listJobLevelFalse = [...new Set(rowsbelum.map((row) => row['Job Level']))];
  const listKomiteUnitFalse = [...new Set(rowsbelum.map((row) => row['Komite Unit']))];

  const [selectedNamaFalse, setSelectedNamaFalse] = useState(null);
  const [selectedNipposFalse, setSelectedNipposFalse] = useState(null);
  const [selectedJobLevelFalse, setSelectedJobLevelFalse] = useState(null);
  const [selectedKomiteUnitFalse, setSelectedKomiteUnitFalse] = useState(null);

  const resetNamaInputFalse = () => {
    setSelectedNamaFalse('');
  };

  const resetNipposInputFalse = () => {
    setSelectedNipposFalse('');
  };

  const resetJobLevelInputFalse = () => {
    setSelectedJobLevelFalse('');
  };

  const resetKomiteUnitInputFalse = () => {
    setSelectedKomiteUnitFalse('');
  };

  const handleResetSearchFalse = () => {
    resetNamaInputFalse();
    resetNipposInputFalse();
    resetJobLevelInputFalse();
    resetKomiteUnitInputFalse();
  };

  const filteredRowsFalse = rowsbelum.filter((row) => {
    const namaMatchFalse = !selectedNamaFalse || (row.Nama && row.Nama.toLowerCase().includes(selectedNamaFalse.toLowerCase())); // Add null check for row.nama
    const nipposMatchFalse = !selectedNipposFalse || (row.Nippos && row.Nippos.toLowerCase().includes(selectedNipposFalse.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatchFalse =
      !selectedJobLevelFalse || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelFalse.toLowerCase())); // Add null check for row.nippos
    const komiteUnitMatchFalse =
      !selectedKomiteUnitFalse || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(selectedKomiteUnitFalse.toLowerCase())); // Add null check for row.nippos

    return namaMatchFalse && nipposMatchFalse && jobLevelMatchFalse && komiteUnitMatchFalse;
  });

  const resetRowIndexFalse = (filteredRowsFalse) => {
    return filteredRowsFalse.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRowsFalse = resetRowIndexFalse(filteredRowsFalse);

  // LENGKAP
  const listNamaTrue = [...new Set(rowslengkap.map((row) => row.Nama))];
  const listNipposTrue = [...new Set(rowslengkap.map((row) => row.Nippos))];
  const listJobLevelTrue = [...new Set(rowslengkap.map((row) => row['Job Level']))];
  const listKomiteUnitTrue = [...new Set(rowslengkap.map((row) => row['Komite Unit']))];

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

  const filteredRowsTrue = rowslengkap.filter((row) => {
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

  return (
    <>
      {/* <MainLayout /> */}

      <MainCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<PersonOffOutlinedIcon />} iconPosition="start" label="Belum Lengkap" {...a11yProps(0)} />
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Lengkap" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
            <FlexContainer>
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} gutterBottom>
                Tabel Karyawan
              </Typography>
              <div style={{ flex: '1' }}> </div>
              <ButtonOptional icon={DoneAllOutlinedIcon} LabelName={'Submit Semua'} onClick={handleOpenSubmit} disabled={isDisabled} />
              <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
            </FlexContainer>

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
                <CustomSearch
                  field={listJobLevelFalse}
                  label={'Job Level'}
                  onSearch={setSelectedJobLevelFalse}
                  value={selectedJobLevelFalse}
                  resetInput={resetJobLevelInputFalse}
                />
                <CustomSearch
                  field={listKomiteUnitFalse}
                  label={'Komite Unit'}
                  onSearch={setSelectedKomiteUnitFalse}
                  value={selectedKomiteUnitFalse}
                  resetInput={resetKomiteUnitInputFalse}
                />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchFalse} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <TalentProfileTable
              filter={{ nama: filterNama, nippos: filterNippos, job: filterJob, komite: filterKomite }}
              rows={resetRowsFalse}
              caption={"Seluruh karyawan sudah mengisi commitment letter dan pakta integritas"}
              initialDataLength={rowsbelum.length}
            />
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
            <FlexContainer>
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} gutterBottom>
                Tabel Karyawan
              </Typography>
              <div style={{ flex: '1' }}> </div>
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

            <TalentProfileTable
              commitmentLetterValue={'Sudah Submit'}
              paktaIntegritasValue={'Sudah Submit'}
              filter={{ nama: filterNama, nippos: filterNippos, job: filterJob, komite: filterKomite }}
              rows={resetRowsTrue}
              caption={"Belum ada karyawan yang berstatus lengkap"}
              initialDataLength={rowslengkap.length}
            />
          </Box>
        </CustomTabPanel>

        <KonfirmasiSubmitTalentProfile
          activeEvent={activeEvent}
          open={openSubmit}
          handleClose={() => setOpenSubmit(false)}
          confirm={fetchData}
        />
      </MainCard>
    </>
  );
};

export default TalentProfile;

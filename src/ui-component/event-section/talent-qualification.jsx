import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MainCard from '../../ui-component/cards/MainCard.jsx';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import { RestartAltOutlined } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary.jsx';
import TalentQualificationTable from '../../ui-component/tables/talentqualification.jsx';
import CustomSearch from '../../ui-component/searchsection/custom-search.jsx';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined.jsx';
import { useLocation } from 'react-router-dom';
import.meta.env.VITE_API_BASE_URL

// ==============================|| DETAIL TALENT QUALIFICATION PAGE ||============================== //

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

const TalentQualification = ({ eventid, kodekomite, prevLocation }) => {
  const location = useLocation();
  const [prevLocationname, setPrevLocation] = useState(prevLocation);

  const [value, setValue] = React.useState(0);
  const [qualRow, setqualRow] = useState([]);
  const [quallolosRow, setquallolosRow] = useState([]);
  const [kkm, setkkm] = useState([]);

  const eventidactive = parseInt(eventid);
  const tipekomite = kodekomite;
  const url = import.meta.env.VITE_API_BASE_URL

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = () => {
    fetch(url + `getkkm`)
      .then(response => response.json())
      .then(qualified => {
        setkkm(qualified.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    fetch(url + `getqualificationtidak?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(notqualified => {
        setqualRow(notqualified.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    fetch(url + `getquallolos?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(qualified => {
        setquallolosRow(qualified.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const posttalentqual = () => {
    return fetch(url + 'createqualificationtable', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  useEffect(() => {
    fetchData();

    if (location.pathname  !== prevLocation) {
      posttalentqual().then(() => {
        fetchData();
      });
      setPrevLocation(location.pathname)
    }
  }, [location]);

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px', // Adjust the gap between elements as needed
    paddingBottom: '24px'
  });

  const komiteToPenilaianMap = {
    1: { comp: 1, pms: 5, akhlak: 6, laminimal: 7 },
    2: { comp: 2, pms: 5, akhlak: 6, laminimal: 7 },
    3: { comp: 4, pms: 5, akhlak: 6, laminimal: 7 },
  };

  const getMinimalScore = (kodekomite, id_kriteria_penilaian) => {
    const filteredData = kkm.filter((item) => item.id_komite_talent === kodekomite && item.id_kriteria_penilaian === id_kriteria_penilaian);
    if (filteredData.length > 0) {
      return filteredData[0].skor_minimal;
    }
    return null; // Return null if no match found
  };

  const minimalScores = komiteToPenilaianMap[kodekomite];
  const compminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.comp);
  const pmsminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.pms);
  const akhlakminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.akhlak);
  const laminimal = minimalScores && getMinimalScore(kodekomite, minimalScores.laminimal);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    // Determine which dataset to use based on the active tab
    if (value === 0) {
      dataToDownload = resetRowsTrue;
      filename = `Talent_Qualification_Lulus_${eventid}.csv`;
    } else if (value === 1) {
      dataToDownload = resetRowsFalse;
      filename = `Talent_Qualification_TidakLulus_${eventid}.csv`;
    }

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

  // TIDAK TERKUALIFIKASI
  const listNamaFalse = [...new Set(qualRow.map((row) => row.Nama))];
  const listNipposFalse = [...new Set(qualRow.map((row) => row.Nippos))];
  const listJobLevelFalse = [...new Set(qualRow.map((row) => row['Job Level']))];
  const listKomiteUnitFalse = [...new Set(qualRow.map((row) => row['Komite Unit']))];

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

  const filteredRowsFalse = qualRow.filter((row) => {
    const namaMatchFalse = !selectedNamaFalse || (row.Nama && row.Nama.toLowerCase().includes(selectedNamaFalse.toLowerCase()));
    const nipposMatchFalse = !selectedNipposFalse || (row.Nippos && row.Nippos.toLowerCase().includes(selectedNipposFalse.toLowerCase()));
    const jobLevelMatchFalse = !selectedJobLevelFalse || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelFalse.toLowerCase()));
    const komiteUnitMatchFalse = !selectedKomiteUnitFalse || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(selectedKomiteUnitFalse.toLowerCase()));

    return namaMatchFalse
      && nipposMatchFalse
      && jobLevelMatchFalse
      && komiteUnitMatchFalse;
  });


  const resetRowIndexFalse = (filteredRowsFalse) => {
    return filteredRowsFalse.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRowsFalse = resetRowIndexFalse(filteredRowsFalse);

  // TERKUALIFIKASI
  const listNamaTrue = [...new Set(quallolosRow.map((row) => row.Nama))];
  const listNipposTrue = [...new Set(quallolosRow.map((row) => row.Nippos))];
  const listJobLevelTrue = [...new Set(quallolosRow.map((row) => row['Job Level']))];
  const listKomiteUnitTrue = [...new Set(quallolosRow.map((row) => row['Komite Unit']))];

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

  const filteredRowsTrue = quallolosRow.filter((row) => {
    const namaMatchTrue = !selectedNamaTrue || (row.Nama && row.Nama.toLowerCase().includes(selectedNamaTrue.toLowerCase())); // Add null check for row.nama
    const nipposMatchTrue = !selectedNipposTrue || (row.Nippos && row.Nippos.toLowerCase().includes(selectedNipposTrue.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatchTrue =
      !selectedJobLevelTrue || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelTrue.toLowerCase())); // Add null check for row.nippos
    const komiteUnitMatchTrue =
      !selectedKomiteUnitTrue || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(selectedKomiteUnitTrue.toLowerCase())); // Add null check for row.nippos

    return namaMatchTrue
      && nipposMatchTrue
      && jobLevelMatchTrue
      && komiteUnitMatchTrue;
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
      <MainCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<GppGoodOutlinedIcon />} iconPosition="start" label="Terkualifikasi" {...a11yProps(0)} />
            <Tab icon={<GppBadOutlinedIcon />} iconPosition="start" label="Tidak Terkualifikasi" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
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
                <CustomSearch field={listNamaTrue} label={'Nama'} onSearch={setSelectedNamaTrue} value={selectedNamaTrue} resetInput={resetNamaInputTrue} />
                <CustomSearch field={listNipposTrue} label={'Nippos'} onSearch={setSelectedNipposTrue} value={selectedNipposTrue} resetInput={resetNipposInputTrue} />
                <CustomSearch field={listJobLevelTrue} label={'Job Level'} onSearch={setSelectedJobLevelTrue} value={selectedJobLevelTrue} resetInput={resetJobLevelInputTrue} />
                <CustomSearch field={listKomiteUnitTrue} label={'Komite Unit'} onSearch={setSelectedKomiteUnitTrue} value={selectedKomiteUnitTrue} resetInput={resetKomiteUnitInputTrue} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <TalentQualificationTable
              minimumCompeten5cyQualified={compminimal}
              minimumPmsQualified={pmsminimal}
              minimumAkhlakQualified={akhlakminimal}
              minimumLearningAgilityQualified={laminimal}
              rows={resetRowsTrue}
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
                <CustomSearch field={listNamaFalse} label={'Nama'} onSearch={setSelectedNamaFalse} value={selectedNamaFalse} resetInput={resetNamaInputFalse} />
                <CustomSearch field={listNipposFalse} label={'Nippos'} onSearch={setSelectedNipposFalse} value={selectedNipposFalse} resetInput={resetNipposInputFalse} />
                <CustomSearch field={listJobLevelFalse} label={'Job Level'} onSearch={setSelectedJobLevelFalse} value={selectedJobLevelFalse} resetInput={resetJobLevelInputFalse} />
                <CustomSearch field={listKomiteUnitFalse} label={'Komite Unit'} onSearch={setSelectedKomiteUnitFalse} value={selectedKomiteUnitFalse} resetInput={resetKomiteUnitInputFalse} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearchFalse} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <TalentQualificationTable
              minimumCompeten5cyQualified={compminimal}
              minimumPmsQualified={pmsminimal}
              minimumAkhlakQualified={akhlakminimal}
              minimumLearningAgilityQualified={laminimal}
              rows={resetRowsFalse}
            />
          </Box>
        </CustomTabPanel>
      </MainCard>
    </>
  );
};

export default TalentQualification;
